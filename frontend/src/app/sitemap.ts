export default function sitemap() {
  const baseUrl = "https://conversio.ai";

  const routes = [
    "",
    "/home",
    "/playground",
    "/omnichannel",
    "/contact",
    "/book-demo",
    "/cloud/database",
    "/cloud/projects",
    "/cloud/api-explorer",
    "/cloud/ai-vector",
    "/partners/dashboard",
    "/partner",
    "/blog",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" || route === "/home" ? 1.0 : 0.8,
  }));
}
