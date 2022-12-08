async function uploadImageToCloudinary(image){

    if (image === ''){
        return image
    }
    
   const  CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/duongkrsg/image/upload"
   const CLOUDINARY_PRESET = 'feyurftq'

    let apiUrl = CLOUDINARY_URL;
    let data = {
        "file": image,
        "upload_preset": CLOUDINARY_PRESET
    }
    try {
        const result = await fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        })
        const imageData = await result.json()
        return imageData.secure_url
    }
    catch (e) {
        console.log(e)
    }

}

export {uploadImageToCloudinary}