
const express = require("express");
const dotenv = require("dotenv")
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const cors = require("cors")
 // const path = require("path");
const router = require("../config/routes");

dotenv.config();
 // const publicDir = path.join(__dirname, "../public");
 // const viewsDir = path.join(__dirname, "./views");
const app = express();
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({credentials:true, origin: 
    "http://localhost:3000",
methods: ["GET", "POST","DELETE","PUT"]}))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
 /** Install request logger */
app.use(morgan("dev"));

 /** Install JSON request parser */
app.use(cookieParser())
app.use(express.json());

 /** Install View Engine */
 // app.set("views", viewsDir);
 // app.set("view engine", "ejs");

 /** Set Public Directory */
//  app.use(express.static(publicDir));

 /** Install Router */
app.use(router);

module.exports = app;
