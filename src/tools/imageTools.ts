const getImageHeight = (url:string) => {
    return new Promise<number>(resolve => {
        const img:HTMLImageElement = new Image();
        img.src = url;
        img.onload = () => {
            resolve(img.height);
        }
        img.onerror = () => {
            resolve(0);
        }
    })
}

export default {
    getImageHeight,
}