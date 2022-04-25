export const base64ToBlob = async (base64) => {
    const res = await fetch(base64)
    const blob = await res.blob()
    return blob
}