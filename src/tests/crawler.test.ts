import  Crawler from '../crawler';
import { ResponseObj } from '../types';

describe('Helper Url', () => {
    let crawler: Crawler;

    beforeAll(async () => {
        crawler = new Crawler("https://www.google.com");
    }) 

    test("It should get `/services` path from `https://www.google.com` site map", async () => {
        crawler.getSiteMap().then(siteMapLinks => {
            expect(siteMapLinks).toContain("https://www.google.com/services/");
        });
    });

    test("It should get assets from `https://www.google.com`", async () => {
        crawler.getAllStaticAssetsForPage().then(assets => {
            expect(assets.images.length).toBeTruthy();
        });
    });
});