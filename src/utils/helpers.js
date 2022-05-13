export const base64ToBlob = async (base64) => {
    const res = await fetch(base64)
    const blob = await res.blob()
    return blob
}

// This one is not in used
export function Base64ToBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

//returns TRUE if the timelimit for pickup is exceeded
export function CheckTimelimit(order) {
    const timeLimit = process.env.REACT_APP_TIME_LIMIT
    console.log(`order: ${JSON.stringify(order)}`)
    let timelimitMilliSecs = Number(timeLimit) * 60 * 60 * 1000
    if ((Date.now() - Date.parse(order.pu_planned_time)) > timelimitMilliSecs) {
        return true
    } else {
        return false
    }
}

export const generateUUID = () => {
    const str = "abcdefghijklmnopqrstuvwxyz0123456789"
    const strArr = str.split("")
    const arr = []

    const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length)

    for (let i = 0; i < 24; i++) {
        const index = getRandomIndex(strArr)
        arr.push(strArr[index])
    }
    return arr.join("")
}