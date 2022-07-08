// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  // cloud_name: "yayan-sra", // TODO: Ganti dengan cloudname-mu
  // api_key: "658661399695832", // TODO: Ganti dengan API Key-mu
  // api_secret: "xgtqGRbAtYTFxmMcRe6S8P75dZQ", // TODO: Ganti dengan API Secret-mu
  // secure: true,
  cloud_name: "dt3pzvmfg", // TODO: Ganti dengan cloudname-mu
  api_key: "549758152184815", // TODO: Ganti dengan API Key-mu
  api_secret: "0Rtn9uhrFEd8mDnZ1gOZP10Xn4I", // TODO: Ganti dengan API Secret-mu
  secure: true,
});

module.exports = cloudinary;
