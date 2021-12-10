const getFileResourceHeader = (type: string) => {
    let contentType = "";
    switch (type) {
        case "jpg":
            contentType = "image/jpeg"
            break;
        case "jpeg":
            contentType = "image/jpeg"
            break;
        case "jpe":
            contentType = "image/jpeg"
            break;
        case "gif":
            contentType = "image/gif"
            break;
        case "ico":
            contentType = "image/x-icon"
            break;
        case "png":
            contentType = "image/png"
            break;
        case "tif":
            contentType = "image/tif"
            break;
        case "png":
            contentType = "image/png"
            break;
        case "mp4":
            contentType = "video/mpeg4"
            break;
        case "mp3":
            contentType = "audio/mp3"
            break;
        case "js":
            contentType = "application/javascript"
            break;
        case "pdf":
            contentType = "application/pdf"
            break;
        case "ogg":
            contentType = "application/ogg"
            break;
        default:
            contentType = "text/html"
            break;
    }
    return contentType;
}

export {
    getFileResourceHeader
};