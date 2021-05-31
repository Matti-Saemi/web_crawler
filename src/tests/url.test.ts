import { getAbsoluteUrl } from '../helpers/url';

describe('Helper Url', () => {
    test("It should be able to get the absolute path from the based url and path", async () => {
        expect(getAbsoluteUrl('search', 'https://www.google.com'))
            .toEqual('https://www.google.com/search');
    });
});