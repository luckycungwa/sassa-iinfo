export function canonicalUrl(path: string = ""): string {
  const baseUrl = process.env.APP_URL || "https://sassaiinfo.co.za";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
