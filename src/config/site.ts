import tenantData from "../../tenant.json";
const TENANT_NAME = tenantData.tenantName;
export const siteConfig = {
  get apiBaseUrl() {
    return (
      process.env.NEXT_PUBLIC_API_URL ||
      `https://${TENANT_NAME}.nepdora.baliyoventures.com`
    );
  },
  get mediaBaseUrl() {
    return (
      process.env.NEXT_PUBLIC_MEDIA_URL ||
      `https://builder-api.nepdora.com/media/workspaces/${TENANT_NAME}/public`
    );
  },
  get builderBaseUrl() {
    return (
      process.env.NEXT_PUBLIC_BUILDER_URL || `https://builder-api.nepdora.com`
    );
  },
  get endpoints() {
    const apibuilder = this.builderBaseUrl;
    return {
      fetchImage: (path: string) =>
        `${this.mediaBaseUrl}/${path.startsWith("/") ? path.slice(1) : path}`,
      listImages: () => `${apibuilder}/api/builder/images-map/${TENANT_NAME}/`,
      updateImageMap: () =>
        `${apibuilder}/api/builder/update-image-map/${TENANT_NAME}/`,
      uploadImage: () =>
        `${apibuilder}/api/builder/upload-image/${TENANT_NAME}/`,
    };
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
