import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const SECRET_KEY = process.env.ENCRYPTION_KEY || process.env.META_APP_SECRET || "conversio_default_32_byte_secret_key!";

function getMasterKey(): Buffer {
  return crypto.createHash("sha256").update(SECRET_KEY).digest();
}

export interface EncryptedData {
  encryptedText: string;
  iv: string;
  authTag: string;
}

/**
 * Encrypt a plain text secret (e.g. Meta WABA Access Token) using AES-256-GCM.
 */
export function encryptSecret(plainText: string): EncryptedData {
  const iv = crypto.randomBytes(12);
  const key = getMasterKey();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return {
    encryptedText: encrypted,
    iv: iv.toString("hex"),
    authTag,
  };
}

/**
 * Decrypt an AES-256-GCM encrypted secret.
 */
export function decryptSecret(encryptedData: EncryptedData): string {
  const key = getMasterKey();
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(encryptedData.iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));

  let decrypted = decipher.update(encryptedData.encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Helper to safely format encrypted token payload for DB storage.
 */
export function packEncryptedToken(token: string): string {
  if (!token) return token;
  const encrypted = encryptSecret(token);
  return `enc:${encrypted.iv}:${encrypted.authTag}:${encrypted.encryptedText}`;
}

/**
 * Helper to unpack & decrypt stored token from DB storage.
 */
export function unpackEncryptedToken(storedValue: string): string {
  if (!storedValue || !storedValue.startsWith("enc:")) {
    return storedValue; // Return plain token if unencrypted legacy
  }

  try {
    const parts = storedValue.split(":");
    if (parts.length !== 4) return storedValue;

    const [, iv, authTag, encryptedText] = parts;
    return decryptSecret({ iv, authTag, encryptedText });
  } catch (error) {
    console.error("[crypto] Failed to decrypt token:", error);
    return storedValue;
  }
}
