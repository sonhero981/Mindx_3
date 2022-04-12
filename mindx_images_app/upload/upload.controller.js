const cloudinary = require("cloudinary").v2;
const steamifier = require("streamifier");

const uploadToDisk = (req, res) => {
  console.log(req.file);
  res.send({ success: 1, data: req.file.originalName });
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
  secure: true,
});

const uploadToCloud = async (req, res) => {
  const streamUpload = (req, res) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      steamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };


    const result = await streamUpload(req);
    res.send({success: 1, data: result})
};

module.exports = {
  uploadToCloud,
  uploadToDisk,
};
