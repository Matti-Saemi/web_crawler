import { CheerioAPI, load }  from 'cheerio';
import fetch from 'node-fetch';

import { StaticAssets } from './types';
import { getAbsoluteUrl } from './helpers/url';

class Crawler {
    private static assetExtentions = ["ico", "css", " css2", "png", "jpg", "js"];
    private baseUrl!: string;

    public constructor(url: string) {
        this.baseUrl = url;
    }

    public getAllStaticAssetsForPage(): Promise<StaticAssets> {
        return fetch(this.baseUrl).then(async res => {
            const html = await res.text();
            const $ = load(html);
    
            return {
                images: this.getAllImages($),
                scripts: this.getAllScripts($),
                others:  this.getAllOtherFiles($),
            }
        });
    }
    
    public getSiteMap(): Promise<string[]> {
        return fetch(this.baseUrl).then(async res => {
            const html = await res.text() 
            const $ = load(html);

            const anchors = $('div').find('a');
            const list: Array<string> = [];
            anchors.each((index, element) => {
                const href = $(element).attr('href');
    
                if(href && 
                    (href.includes(this.baseUrl) || href.substring(0, 1) === '/')) {
                    list.push(href);
                }
            });
    
            return list
                .filter((link, ind) => 
                    list.indexOf(link) === ind)
                .map(link => {
                    return getAbsoluteUrl(link, this.baseUrl);
                });
        });
    }

    private getAllImages($: CheerioAPI) {
        const allPath: string[] = [];

        try {
            const ele = $('img');
            ele.each((ind, element) => {
                const src = $(element).attr('src') || $(element).attr('data-src');
                if(src !== undefined) {
                    allPath.push(getAbsoluteUrl(src, this.baseUrl));
                }
            });
        
        } catch(err) {
        // do nothing
        }

        return allPath;
    }

    private getAllScripts($: CheerioAPI) {
        const allPath: string[] = [];
        try {
            const ele = $('script');
            ele.each((ind, element) => {
                const src = $(element).attr('src');
                if(src !== undefined) {
                    allPath.push(getAbsoluteUrl(src, this.baseUrl));
                }
            });
        } catch(err) {
            // do nothing
        }
        return allPath;
    }

    private getAllOtherFiles($: CheerioAPI) {
        const links: string[] = [];
        try {
            const ele = $('link');
            ele.each((ind, element) => {
                const src = $(element).attr('href');
                if(src !== undefined 
                    && src !== this.baseUrl 
                    && src !== (this.baseUrl + "/")) {
                        if (new RegExp(Crawler.assetExtentions.join("|")).test(src)) {
                            links.push(getAbsoluteUrl(src, this.baseUrl));
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