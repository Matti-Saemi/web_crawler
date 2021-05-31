export interface StaticAssets {
    images: string[],
    scripts: string[],
    others: string[]
}

export interface ResponseObj {
    url: string,
    assets: StaticAssets,
    links: string[]
}
