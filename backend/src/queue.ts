import Bull from 'bull';

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT || 6379),
};

export const campaignDispatchQueue = new Bull('campaign-dispatch', { redis: redisConfig });
export const webhookProcessQueue = new Bull('webhook-process', { redis: redisConfig });
export const importContactsQueue = new Bull('import-contacts', { redis: redisConfig });
export const automationTriggerQueue = new Bull('automation-trigger', { redis: redisConfig });
export const cartRecoveryQueue = new Bull('cart-recovery', { redis: redisConfig });

// Initialize queue event handlers
export async function initializeQueues() {
  // Campaign dispatch processor. Dynamic imports keep queue.ts and the campaigns
  // service free of a top-level circular dependency (the service enqueues here).
  campaignDispatchQueue.process(async (job) => {
    const { workspaceId, campaignId } = job.data as {
      workspaceId: string;
      campaignId: string;
    };
    console.log(`[Queue] Dispatching campaign ${campaignId} (job ${job.id})`);
    const { dispatchCampaign } = await import('./modules/campaigns/campaigns.service');
    const { prisma } = await import('./prisma');
    await dispatchCampaign(workspaceId, campaignId, prisma);
    return { status: 'done', campaignId };
  });

  // Webhook processor
  webhookProcessQueue.process(async (job) => {
    // Will implement in Stage 1
    console.log('[Queue] Webhook process job received:', job.id);
    return { status: 'pending', message: 'Processor not yet implemented' };
  });

  // Import contacts processor
  importContactsQueue.process(async (job) => {
    // Will implement in Stage 2
    console.log('[Queue] Import contacts job received:', job.id);
    return { status: 'pending', message: 'Processor not yet implemented' };
  });

  // Automation trigger processor
  automationTriggerQueue.process(async (job) => {
    // Will implement in Stage 5
    console.log('[Queue] Automation trigger job received:', job.id);
    return { status: 'pending', message: 'Processor not yet implemented' };
  });

  // Retner Cart Recovery Queue Processor
  cartRecoveryQueue.process(async (job) => {
    const { workspaceId, checkoutId, stepNumber } = job.data as {
      workspaceId: string;
      checkoutId: string;
      stepNumber: number;
    };
    console.log(`[Queue] Executing Retner Cart Recovery Step ${stepNumber} for checkout ${checkoutId}`);
    const { executeRecoveryStep } = await import('./modules/commerce/recovery.service');
    const result = await executeRecoveryStep(workspaceId, checkoutId, stepNumber);
    return result;
  });

  // Global error handlers
  [campaignDispatchQueue, webhookProcessQueue, importContactsQueue, automationTriggerQueue, cartRecoveryQueue].forEach(
    (queue) => {
      queue.on('failed', (job, err) => {
        console.error(`[Queue] Job ${job.id} failed:`, err.message);
      });

      queue.on('error', (err) => {
        console.error('[Queue] Error:', err);
      });

      queue.on('paused', () => {
        console.log(`[Queue] ${queue.name} paused`);
      });

      queue.on('resumed', () => {
        console.log(`[Queue] ${queue.name} resumed`);
      });
    }
  );

  console.log('[Queue] All queues initialized');
}

/**
 * Enqueue an abandoned cart recovery sequence with timed step delays (15m, 60m, 24h).
 */
export async function enqueueCartRecoverySequence(data: {
  workspaceId: string;
  checkoutId: string;
  step1DelayMs?: number;
  step2DelayMs?: number;
  step3DelayMs?: number;
}) {
  const step1Delay = data.step1DelayMs ?? 15 * 60 * 1000;
  const step2Delay = data.step2DelayMs ?? 60 * 60 * 1000;
  const step3Delay = data.step3DelayMs ?? 24 * 60 * 60 * 1000;

  try {
    const job1 = await cartRecoveryQueue.add(
      { workspaceId: data.workspaceId, checkoutId: data.checkoutId, stepNumber: 1 },
      { delay: step1Delay, attempts: 2, removeOnComplete: true }
    );
    const job2 = await cartRecoveryQueue.add(
      { workspaceId: data.workspaceId, checkoutId: data.checkoutId, stepNumber: 2 },
      { delay: step2Delay, attempts: 2, removeOnComplete: true }
    );
    const job3 = await cartRecoveryQueue.add(
      { workspaceId: data.workspaceId, checkoutId: data.checkoutId, stepNumber: 3 },
      { delay: step3Delay, attempts: 2, removeOnComplete: true }
    );
    return { enqueued: true, jobIds: [job1.id, job2.id, job3.id] };
  } catch (err) {
    console.warn('[Queue] Redis unavailable for cart recovery queue, resilient in-memory fallback active:', err);
    return { enqueued: false };
  }
}

/**
 * Enqueue a campaign for asynchronous dispatch on the Bull worker. Retries with
 * exponential backoff. Callers should treat a thrown error (e.g. Redis down) as a
 * signal to fall back to inline dispatch.
 */
export async function enqueueCampaignDispatch(data: {
  workspaceId: string;
  campaignId: string;
}) {
  return campaignDispatchQueue.add(data, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: true,
    removeOnFail: false,
  });
}

// Graceful shutdown
export async function shutdownQueues() {
  await Promise.all([
    campaignDispatchQueue.close(),
    webhookProcessQueue.close(),
    importContactsQueue.close(),
    automationTriggerQueue.close(),
    cartRecoveryQueue.close(),
  ]);
  console.log('[Queue] All queues closed');
}
