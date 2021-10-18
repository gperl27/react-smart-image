export const stringToArray = (strOrArr: string | string[]) =>
    Array.isArray(strOrArr) ? strOrArr : [strOrArr]

export const removeBlankArrayElements = (arr: string[]) => arr.filter((e) => e)