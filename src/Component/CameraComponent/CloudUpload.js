import ImageKit from "imagekit-javascript";
import getEnvVars from "../../../environment";
const { SERVER_URL } = getEnvVars();

const CLOUD_NAME = "dvb3q9dsq";
const CLOUDINARY_PRESET = "mnh4qyn1";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

var imagekit = new ImageKit({
  publicKey: "public_9oA6a9dbCTuAWI1qrlnQcdi2h/U=",
  urlEndpoint: "https://ik.imagekit.io/ak4gva2wf",
  authenticationEndpoint: `${SERVER_URL}`,
});

async function uploadImageToCloudinary(image) {
  if (image === "") {
    return image;
  }

  // const CLOUDINARY_URL = "https://node.hostingladz.com:3033/v1/user/upload";

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

async function uploadToImageKit(file, base64) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: base64,
        fileName: file.name,
      },
      function(err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  })
    .then(async (newdata) => {
      console.log("imageKit result:", newdata);
      const url = imagekit.url({
        src: newdata.url,
        // transformation: [{ height: 300, width: 400 }],
      });

      return newdata;
    })
    .catch((err) => {
      console.log("imageKit err:", err);
      return "";
    });
}

async function uploadImageToImageKit(file) {
  console.log("file data :", file);
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file,
        fileName: "abc.jpeg",
        //you can change this and generate your own name if required
        // tags: ["tag-1", "tag-2"], //change this or remove it if you want
      },
      function(err, result) {
        if (err) reject(err);
        resolve(result);
      }
    );
  })
    .then(async (newdata) => {
      console.log("imageKit result:", newdata);
      const url = imagekit.url({
        src: newdata.url,
        // transformation: [{ height: 300, width: 400 }],
      });

      return newdata;
    })
    .catch((err) => {
      console.log("imageKit err:", err);
      return "";
    });
}

export { uploadImageToCloudinary, uploadToImageKit, uploadImageToImageKit };
