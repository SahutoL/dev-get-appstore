export const extractAppIdFromUrl = (url: string): string => {
  const match = url.match(/id(\d+)/);
  return match ? match[1] : "";
};
