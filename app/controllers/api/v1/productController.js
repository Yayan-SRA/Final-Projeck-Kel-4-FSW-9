// const {Product} = require("../../../models");
const { Product, User, Kategori, Notif } = require("../../../models")
const productService = require("../../../services/productService");
const nodemailer = require("nodemailer");
const pembelian = require("../../../models/pembelian");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kel4.fsw9@gmail.com',
        pass: 'nttisxgcftabdkyy'
    }
});

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
    OneProduk(req, res) {
        const id = req.params.id
        Product.findOne({
            where: { id: id },
            include: [{ model: User }, { model: Kategori }]
        }).then((produk) => {
            res.status(203).json(produk)
        })
    },

    formAdd(req, res) {
        productService
            .list()
            .then((kategori) => {
                console.log("list", kategori)
                res.status(200).json(kategori)
                // res.render("addproduct", { kategori, stat });
            });
    },

    add1(req, res) {
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
                res.status(201).json({ msg: "Product Uploaded" });
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

    async add(req, res) {

        const { deskripsi, stok, id_penjual, harga, kategori } = req.body;
        if (deskripsi == "" || stok == "" || harga == "" || req.body.foto == null || kategori == "") {
            return res.status(403).json({ msg: "Lengkapi Informasi Barang!!!" })
        }

        if (!Number(harga)) {
            return res.status(403).json({ msg: "pastikan harga" })
        }

        if (!Number(stok)) {
            return res.status(403).json({ msg: "Pastikan Stok" })
        }
        let panjang = 0;
        let pro = await Product.findAll({
            where: { id_penjual: id_penjual }
        })
        for (let i = 1; i <= pro.length; i++) {
            panjang += 1
        }
        if (panjang >= 4) {
            return res.status(403).json({ msg: `Maaf Anda Sudah Memposting ${panjang} Produk` })
        }
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
                res.status(201).json({ msg: "Berhasil" })
                // res.status(201).json(result.User.email);
            })
            .catch((err) => {
                res.status(422).json({
                    status: 'FAIL',
                    message: err.message,
                    msg: "Pastikan Kategori"
                });
            });
    },

    async email(req, res) {
        try {
            const produks = [];
            let panjang = 0;
            Product.findAll().then((prod) => {
                // panjang += 1
                produks.push(prod);
            });
            let pro = await Product.findAll()
            // for(let i=1;i<=produks[0].)
            // for (let i = 1; i <= produks.length; i++) {
            //     panjang += 1
            // }
            for (let i = 1; i <= pro.length; i++) {
                panjang += 1
            }

            const result = await Product.findOne({
                where: { id: panjang },
                include: [{
                    model: User
                }]
            });
            const contentEmail = `
                        <h1 style="text-align: center">Hai <span style="color:black;">${result.User.nama}<span/>,</h1>
                        <h3 style="text-align: center">Selamat Berhasil Menambahkan Produk</h3>
                        <h3 style="text-align: center">Nama Produk <span style="color:black">${result.nama_produk}<span/>,</h3>
                        <h3 style="text-align: center">Harga <span style="color:black">${result.harga}<span/>,</h3>
                        <img style=" display: block;
                        margin-left: auto;
                        margin-right: auto;
                        width: 45%;" src=${result.foto}></img>
                        <h4 style="text-align: right">
                        Terima Kasih <br /><br />TTD<br />Second(Hand)
                        </h4>
                    `;
            const mailOptions = {
                from: 'Second(Hand)',
                to: `${result.User.email}`,
                subject: 'Info Produk(SecondHand)',
                // text:`Selamat Datang <h1>${req.body.nama}`,
                html: contentEmail,
            };
            transporter.sendMail(mailOptions, (err, info) => {
                console.log('Email sent: ' + info.response);
            });
            res.json({ msg: "Mantap222", produks, panjang, pro, result })
        } catch (error) {
            console.log(error)
        }
    },

    async selectProduct(req, res) {
        const id = req.params.id;

        // await productService
        // .list()
        await productService
            .oneProduct({
                id
            })
            .then((product) => {
                res.status(200).json(product);
            })
        // const product = await productService.oneProduct({ id })
        // res.status(200).json(product);
    },

    async kategori(req, res) {
        const id = req.params.id
        const produk = await productService.oneKategori({ id })
        res.json(produk)
    },

    async kat(req, res) {
        const kategori = await Kategori.findAll()
        res.json(kategori)
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
            res.status(201).json({ msg: "Product Updated" });
        }).catch(err => {
            res.status(422).json("Can't update Product")
        })
    },

    deleteProduct(req, res) {
        const id = req.params.id;
        console.log("coba lihat id", id)
        productService.deleteProduct({ id }).then(() => {
            res.status(200).json({ msg: "Product Deleted" });
        }).catch(err => {
            res.status(422).json("Can't delete Product")
        })
    },

    async Notif(req, res) {
        const result = await Notif.findAll({
            include: [{ model: Product }]
        })
        res.status(201).json(result)
    }

};