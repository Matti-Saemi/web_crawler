import  Crawler from './crawler';
import { ResponseObj } from './types';

export function handler(event: any = {}): Promise<ResponseObj[]> {
    const crawler = new Crawler(event.urlToCrawl);

    return crawler.getSiteMap().then(async siteMapLinks => {
        // loop through each page and get the static assets and links
        return await Promise.all(siteMapLinks.map(async link => {
            return {
                url: link,
                assets: await crawler.getAllStaticAssetsForPage(),
                links: await crawler.getSiteMap()
            }
        }));
    });
}
