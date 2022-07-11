// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "yayan-sra", // TODO: Ganti dengan cloudname-mu
  api_key: "658661399695832", // TODO: Ganti dengan API Key-mu
  api_secret: "xgtqGRbAtYTFxmMcRe6S8P75dZQ", // TODO: Ganti dengan API Secret-mu
  secure: true,
});
	
module.exports = cloudinary;
