
const express = require('express')
const upload = require("../upload");
const {Users} = require("../app/models")
const uploadOnMemory = require("../uploadOnMemory");
const cloudinary = require("../cloudinary");

// const{UserController} = require("./controllers")
const controllers = require("../app/controllers"); 
const router = express.Router();
const apiRouter = express.Router();

router.get("/listUser",controllers.api.v1.usercontrollers.handleListUser)

// router.get("/whoami",usercontroller.whoAmI)

router.get("/user", controllers.api.v1.usercontrollers.authorize,controllers.api.v1.usercontrollers.whoAmI);
// router.get("/users", controllers.api.v1.usercontrollers.verifyToken,controllers.api.v1.usercontrollers.handleListUser);
router.get("/user/:id",controllers.api.v1.usercontrollers.handleGetUser)
router.get("/usernama/:email",controllers.api.v1.usercontrollers.handleGetUserNama)
router.post("/login", controllers.api.v1.usercontrollers.handleLogin);
router.post("/register",controllers.api.v1.usercontrollers.handleCreateUser)
router.put("/update/:id",controllers.api.v1.usercontrollers.handleUpdateuser)
// router.get("/user/:id",controllers.api.v1.usercontrollers.handleGetUser)
router.delete("/deleteuser/:id",controllers.api.v1.usercontrollers.handleDeleteUser)
router.get("/token",controllers.api.v1.usercontrollers.refreshToken)
router.delete("/logout",controllers.api.v1.usercontrollers.logout)
router.get("/KofRegis",controllers.api.v1.usercontrollers.handleKonfirmasiRegister)

router.put(
    "/api/v1/profiles/:id/image",
    upload.single("image"),
    (req, res) => {
    const url = `/uploads/${req.file.filename}`;
    res
        .status(200)
        .json({ message: "Foto berhasil di-upload, silahkan cek URL", url });
    }
);

router.put(
    "/api/v1/profiles/:id/image/cloudinary",
    uploadOnMemory.single("image"),
    (req, res) => {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, function (err, result) {
        if (!!err) {
        console.log(err);
        return res.status(400).json({
            message: "Gagal upload file!",
        });
    }

    res.status(201).json({
        message: "Upload image berhasil",
        url: result.url,
        });
    });
    }
);

apiRouter.get("/", controllers.api.v1.productController.listAllProduct);
apiRouter.get("/v1/Produk", controllers.api.v1.productController.listAllProduct);
// apiRouter.get("/ownProduct", controllers.api.v1.productController.listOwnProduct);
apiRouter.get("/v1/Produk/add/form", controllers.api.v1.productController.formAdd);
apiRouter.post("/v1/Produk/add", controllers.api.v1.productController.add);
apiRouter.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'final_proyek',
        });
        console.log(uploadResponse);
        res.status(201).json({ 
            message: "Upload image berhasil",
            url: uploadResponse.url,
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});
router.post(
    "/v1/Produk/add/image/cloudinary",
    uploadOnMemory.single("image"),
    (req, res) => {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, function (err, result) {
        if (!!err) {
        console.log(err);
        return res.status(400).json({
            message: "Gagal upload file!",
        });
    }

    res.status(201).json({
        message: "Upload image berhasil",
        url: result.url,
        });
    });
    }
);
apiRouter.put("/v1/Produk/update/:id", controllers.api.v1.productController.updateProduct);
apiRouter.get("/v1/Produk/:id", controllers.api.v1.productController.selectProduct);
apiRouter.delete(
  "/v1/produk/delete/:id",
  controllers.api.v1.productController.deleteProduct
);

apiRouter.get("/api/v1/penjualan", controllers.api.v1.penjualanController.list);
apiRouter.post("/api/v1/penjualan", controllers.api.v1.penjualanController.create);
apiRouter.put("/api/v1/penjualans/:id", controllers.api.v1.penjualanController.update);
apiRouter.get("/api/v1/penjualan/:id", controllers.api.v1.penjualanController.show);
apiRouter.delete("/delete/:id",controllers.api.v1.penjualanController.destroy);

apiRouter.use(router);
apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter