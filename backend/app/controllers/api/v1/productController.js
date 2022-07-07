// const {Product} = require("../../../models");
const productService = require("../../../services/productService");

module.exports = {
    listAllProduct(req, res) {
        productService
            .listProduct()
            .then((product) => {
                res.status(200).json(product);
                // res.render("index", { product });
            });
    },

    // listOwnProduct(req, res){
    //     productService
    //         .listOwnProduct()
    //         .then((product) => {
    //             res.render("index", { product });
    //         });
    // },

    formAdd(req, res) {
        productService
            .list()
            .then((kategori,stat) => {
                console.log("list", kategori)
                res.status(200).json(kategori,stat)
                // res.render("addproduct", { kategori, stat });
            });
    },

    add(req, res) {
        productService
            .create({
                id_penjual: req.body.id_penjual,
                id_kategori: req.body.id_kategori,
                nama_produk: req.body.nama_produk,
                harga: req.body.harga,
                stok: req.body.stok,
                deskripsi: req.body.deskripsi,
                foto: req.body.foto,
            })
            .then(() => {
                // console.log();
                res.status(201).json({msg:"Product Uploaded"});
                // res.send(
                //     '<script>window.location.href="/";document.getElementById("alert-save").click();</script>'
                // );
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    async selectProduct(req, res) {
        // const token = req.cookies.jwt;
        // const pengguna = req.user;
        const id = req.params.id;
        console.log("lihat id", id) 
        const product = await productService.oneProduct({
            id 
        })
        console.log("lihat cc", product);
        // console.log("get id", req.params.id);
        // console.log("hasil id", id);

        const coba = await productService.listSize()
        console.log("coba", coba)
        console.log("product", product)
        res.render("edit", { product, coba });
    },

    updateProduct(req, res) {
        const id = req.params;
        productService.updateProduct({ id }, {
            id_penjual: req.body.id_penjual,
            id_kategori: req.body.id_kategori,
            nama_produk: req.body.nama_produk,
            harga: req.body.harga,
            stok: req.body.stok,
            deskripsi: req.body.deskripsi,
            foto: req.body.foto,
            // foto: req.file.filename,
        }).then(() => {
            // res.redirect("/");
            res.status(201).json({msg:"Product Updated"});
        }).catch(err => {
            res.status(422).json("Can't update Product")
        })
    },

    deleteProduct(req, res) {
        const id = req.params.id;
        console.log("coba lihat id", id)
        productService.deleteProduct({ id }).then(() => {
            res.status(200).json({msg:"Product Deleted"});
        }).catch(err => {
            res.status(422).json("Can't delete Product")
        })
    }

};