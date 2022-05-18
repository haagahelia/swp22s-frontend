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


//search by address (that it includes the keyword, not is equal to). We can also add other fields to search through. 
export function searchByKeyword(array, keyword) {
    if (keyword) {
      const filteredArray = array.filter(function(item) {
        return item.pu_address.toLowerCase().includes(keyword.toLowerCase())
      })
      return filteredArray
    } else {
      return array
    }

}

export const dateComparator = (row1, row2) => {
    const date1 = new Date(row1.pu_planned_time)
    const date2 = new Date(row2.pu_planned_time)

    if (date1 === null && date2 === null) return 0

    if (date1 === null) return -1

    if (date2 === null) return 1

    return date1 - date2
}

