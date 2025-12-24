export const siteConfig = {
  name: "Nepdora",
  description: "Nepdora Preview System",
  tenantName: "brainstorm-global-education",
  get apiBaseUrl() {
    return process.env.NEXT_PUBLIC_API_URL || `https://${this.tenantName}.nepdora.baliyoventures.com`;
  },
  get mediaBaseUrl() {
    return process.env.NEXT_PUBLIC_MEDIA_URL || `https://nepdora.baliyoventures.com/media/workspaces/${this.tenantName}/public`;
  },
};

export const getApiBaseUrl = (): string => {
  return siteConfig.apiBaseUrl;
};

export const getImageUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  const baseUrl = siteConfig.mediaBaseUrl;
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};