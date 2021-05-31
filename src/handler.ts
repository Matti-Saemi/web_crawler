import  Crawler from './crawler';
import { ResponseObj } from './types';

export function handler(event: any = {}): Promise<ResponseObj[]> {
    return Crawler.getSiteMap(event.urlToCrawl).then(async siteMapLinks => {
        // loop through each page and get the static assets and links
        return await Promise.all(siteMapLinks.map(async link => {
            return {
                url: link,
                assets: await Crawler.getAllStaticAssetsForPage(link),
                links: await Crawler.getSiteMap(link)
            }
        }));
    });
}
