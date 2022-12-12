async function uploadImageToCloudinary(image) {
  if (image === "") {
    return image;
  }

  // const CLOUDINARY_URL = "https://node.hostingladz.com:3033/v1/user/upload";
  const CLOUD_NAME = "dvb3q9dsq";
  const CLOUDINARY_PRESET = "mnh4qyn1";
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  let apiUrl = CLOUDINARY_URL;
  let data = {
    file: image,
    upload_preset: CLOUDINARY_PRESET,
  };
  try {
    const result = await fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });
    const cloudData = await result.json();
    console.log("Cloudinary res :", cloudData);
    return cloudData.secure_url;
  } catch (e) {
    console.log(e);
  }
}

async function uploadFilesToCloudinary(file) {
  if (file === "") {
    return file;
  }

  // const CLOUDINARY_URL = "https://node.hostingladz.com:3033/v1/user/upload";
  const CLOUD_NAME = "dvb3q9dsq";
  const CLOUDINARY_PRESET = "mnh4qyn1";
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;

  let apiUrl = CLOUDINARY_URL;
  let data = {
    file: file,
    upload_preset: CLOUDINARY_PRESET,
  };
  try {
    const result = await fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });
    const cloudData = await result.json();
    console.log("Cloudinary files upload res :", cloudData);
    return cloudData.secure_url;
  } catch (e) {
    console.log(e);
  }
}

export { uploadImageToCloudinary, uploadFilesToCloudinary };
