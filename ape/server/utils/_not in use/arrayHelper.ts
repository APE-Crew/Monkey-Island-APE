// fileversion 0.5.0 | 2021-03-06

export const clone = (e: any) => JSON.parse(JSON.stringify(e));
export const unique = (arr: any) => arr.filter((v: any, i: any, a: any) => a.indexOf(v) === i);
