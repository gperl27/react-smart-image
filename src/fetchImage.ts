export const fetchImage = (url: string) => new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    return image.decode().then(() => resolve(url)).catch(reject)
});