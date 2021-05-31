import { handler } from './handler';

const urlToCrawl = 'https://www.google.com';

handler({urlToCrawl: urlToCrawl}).then(res => {
    console.log(JSON.stringify(res, null, 2));
});