export const getAbsoluteUrl = (url: string, baseUrl: string) => {
    return new URL(url, baseUrl).href;
}