import  Crawler from '../crawler';
import { ResponseObj } from '../types';

describe('Helper Url', () => {
    test("It should get `/services` path from `https://www.google.com` site map", async () => {
        Crawler.getSiteMap("https://www.google.com").then(siteMapLinks => {
            expect(siteMapLinks).toContain("https://www.google.com/services/");
        });
    });

    test("It should get assets from `https://www.google.com`", async () => {
        Crawler.getAllStaticAssetsForPage("https://www.google.com").then(assets => {
            expect(assets.images.length).toBeTruthy();
        });
    });
});