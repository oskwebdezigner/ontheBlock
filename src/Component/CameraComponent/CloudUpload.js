async function uploadImageToCloudinary(image) {
  if (image === "") {
    return image;
  }

  const CLOUDINARY_URL = "https://node.hostingladz.com:3033/v1/user/upload";
  const CLOUDINARY_PRESET = "feyurftq";

  let apiUrl = CLOUDINARY_URL;
  let data = {
    file: [image],
    // upload_preset: CLOUDINARY_PRESET,
  };
  try {
    const result = await fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
    });
    const imageData = await result.json();
    console.log("image url :", imageData.secure_url);
    return imageData.secure_url;
  } catch (e) {
    console.log(e);
  }
}

export { uploadImageToCloudinary };
