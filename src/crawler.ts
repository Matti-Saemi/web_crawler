import { CheerioAPI, load }  from 'cheerio';
import fetch from 'node-fetch';

import { StaticAssets } from './types';
import { getAbsoluteUrl } from './helpers/url';

class Crawler {
    private static assetExtentions = ["ico", "css", " css2", "png", "jpg", "js"];

    public static getAllStaticAssetsForPage(baseUrl: string): Promise<StaticAssets> {
        return fetch(baseUrl).then(async res => {
            const html = await res.text();
            const $ = load(html);
    
            return {
                images: Crawler.getAllImages($, baseUrl),
                scripts: Crawler.getAllScripts($, baseUrl),
                others:  Crawler.getAllOtherFiles($, baseUrl),
            }
        });
    }
    
    public static getSiteMap(baseUrl: string): Promise<string[]> {
        return fetch(baseUrl).then(async res => {
            const html = await res.text() 
            const $ = load(html);

            const anchors = $('div').find('a');
            const list: Array<string> = [];
            anchors.each((index, element) => {
                const href = $(element).attr('href');
    
                if(href && 
                    (href.includes(baseUrl) || href.substring(0, 1) === '/')) {
                    list.push(href);
                }
            });
    
            return list
                .filter((link, ind) => 
                    list.indexOf(link) === ind)
                .map(link => {
                    return getAbsoluteUrl(link, baseUrl);
                });
        });
    }

    private static getAllImages($: CheerioAPI, baseUrl: string) {
        const allPath: string[] = [];

        try {
            const ele = $('img');
            ele.each((ind, element) => {
                const src = $(element).attr('src') || $(element).attr('data-src');
                if(src !== undefined) {
                    allPath.push(getAbsoluteUrl(src, baseUrl));
                }
            });
        
        } catch(err) {
        // do nothing
        }

        return allPath;
    }

    private static getAllScripts($: CheerioAPI, baseUrl: string) {
        const allPath: string[] = [];
        try {
            const ele = $('script');
            ele.each((ind, element) => {
                const src = $(element).attr('src');
                if(src !== undefined) {
                    allPath.push(getAbsoluteUrl(src, baseUrl));
                }
            });
        } catch(err) {
            // do nothing
        }
        return allPath;
    }

    private static getAllOtherFiles($: CheerioAPI, baseUrl: string) {
        const links: string[] = [];
        try {
            const ele = $('link');
            ele.each((ind, element) => {
                const src = $(element).attr('href');
                if(src !== undefined 
                    && src !== baseUrl 
                    && src !== (baseUrl + "/")) {
                        if (new RegExp(Crawler.assetExtentions.join("|")).test(src)) {
                            links.push(getAbsoluteUrl(src, baseUrl));
                        }
                }
            });
        } catch(err) {
        // do nothing
        }
        return links;
    }
}

export default Crawler;