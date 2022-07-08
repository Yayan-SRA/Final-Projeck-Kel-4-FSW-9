// const { Product } = require("../../../models");
const { Product, User } = require("../../../models")
const productService = require("../../../services/productService");
const nodemailer = require("nodemailer");
// const isi = require("../../../../../index.html")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: 'diorypribadi@gmail.com',
        // pass: 'powexrwoffzenaml'
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

    formAdd(req, res) {
        productService
            .list()
            .then((kategori, stat) => {
                console.log("list", kategori)
                res.status(200).json(kategori, stat)
                // res.render("addproduct", { kategori, stat });
            });
    },

    async add1(req, res) {
        // let user = User.findOne({
        //     where: {
        //         id: req.body.id_penjual
        //     }
        // })
        // const produks = []
        // Product.findAll().then((prod) => {
        //     produks.push(prod)
        // })
        // const panjang = produks.length
        // const { deskripsi, stok, id_penjual } = req.body
        // const result = await Product.findOne({
        //     where: { id: panjang + 1 },
        //     include: [{
        //         model: User
        //     }]
        // });
        // const produks = []
        // let leng = 0;
        // Product.findAll().then((prod) => {
        //     produks.push(prod)
        //     leng += 1
        // })
        // const { deskripsi, stok, id_penjual } = req.body

        // const produks = []
        // let leng = 0;
        // Product.findAll().then((prod) => {
        //     produks.push(prod)
        // })
        // productService
        //     .create({
        //         id_penjual: req.body.id_penjual,
        //         id_kategori: req.body.id_kategori,
        //         nama_produk: req.body.nama_produk,
        //         harga: req.body.harga,
        //         stok: req.body.stok,
        //         deskripsi: req.body.deskripsi,
        //         foto: req.body.foto,
        //     })

        // const produks = []
        // let leng = 0;
        // Product.findAll().then((prod) => {
        //     produks.push(prod)
        // })
        try {
            const { deskripsi, stok, id_penjual } = req.body

            const produks = []
            let leng = 0;
            const result = Product.findAll()
            // const result = Product.findAll().then((prod) => {
            //     produks.push(prod)
            // })
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
            // const produks = []
            // let leng = 0;
            // Product.findAll().then((prod) => {
            //     produks.push(prod)
            // })
            // const result = await Product.findOne({
            //     where: { id: produks[0].length },
            //     include: [{
            //         model: User
            //     }]
            // });
            const contentEmail = `
                <h1>Hai <span style="color:red">${req.body.nama_produk}<span/>,</h1>
                <h1>Hai <span style="color:red">${id_penjual}<span/>,</h1>
                <h1>Hai <span style="color:red">${stok}<span/>,</h1>
                <h3>Hai <span style="color:red">${deskripsi}<span/>,</h3>
                <img src=${req.body.foto}></img>
                <h4>Verifikasi Email mu!</h4>
                <p>Terima Kasih<p/>
            `
            const mailOptions = {
                from: "Diory Pribadi",
                to: "dioripribadisinaga@gmail.com",
                subject: "Verifikasi Email(SecondHand)",
                // text:`Selamat Datang <h1>${req.body.nama}`,
                html: contentEmail
            };
            transporter.sendMail(mailOptions, (err, info) => {
                console.log('Email sent: ' + info.response);
            })
            res.status(201).json(result);
        } catch (error) {
            res.json(error.message)
            console.log(error);
        }
        // productService
        //     .create({
        //         id_penjual: req.body.id_penjual,
        //         id_kategori: req.body.id_kategori,
        //         nama_produk: req.body.nama_produk,
        //         harga: req.body.harga,
        //         stok: req.body.stok,
        //         deskripsi: req.body.deskripsi,
        //         foto: req.body.foto,
        //     })
        //     .then(() => {
        //         const result = Product.findOne({
        //             where: { id: (produks[0].length + 1) },
        //             include: [{
        //                 model: User
        //             }]
        //         });
        //         const contentEmail = `
        //             <h1>Hai <span style="color:red">${req.body.nama_produk}<span/>,</h1>
        //             <h1>Hai <span style="color:red">${id_penjual}<span/>,</h1>
        //             <h1>Hai <span style="color:red">${stok}<span/>,</h1>
        //             <h3>Hai <span style="color:red">${deskripsi}<span/>,</h3>
        //             <img src=${req.body.foto}></img>
        //             <h4>Verifikasi Email mu!</h4>
        //             <p>Terima Kasih<p/>
        //         `
        //         const mailOptions = {
        //             from: "Diory Pribadi",
        //             to: "diorypribadi29sinaga@gmail.com",
        //             subject: "Verifikasi Email(SecondHand)",
        //             // text:`Selamat Datang <h1>${req.body.nama}`,
        //             html: contentEmail
        //         };
        //         transporter.sendMail(mailOptions, (err, info) => {
        //             console.log('Email sent: ' + info.response);
        //         })
        //         res.status(201).json(result);
        //     })
        //     .catch((err) => {
        //         res.status(422).json({
        //             status: "FAIL",
        //             message: err.message,
        //         });
        //     });
    },

    add2(req, res) {
        const { deskripsi, stok, id_penjual } = req.body
        // const result = Product.findAll()
        // const result = Product.findAll()
        // const result = Product.findOne({
        //     where: { id: 5 },
        //     include: [{
        //         model: User
        //     }]
        // });
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
                const result = Product.findOne({
                    where: { id: 5 },
                    include: [{
                        model: User
                    }]
                });
                // const user = await User.findOne({
                //     where: {
                //         email: req.body.email
                //     }
                // })
                // const result = Product.findAll()
                const contentEmail = `
                <h1>Hai <span style="color:red">${req.body.nama_produk}<span/>,</h1>
                <h1>Hai <span style="color:red">${id_penjual}<span/>,</h1>
                <h1>Hai <span style="color:red">${stok}<span/>,</h1>
                <h3>Hai <span style="color:red">${deskripsi}<span/>,</h3>
                <img src=${req.body.foto}></img>
                <h4>Verifikasi Email mu!</h4>
                <p>Terima Kasih<p/>
            `
                const mailOptions = {
                    from: "Diory Pribadi",
                    to: "dioripribadisinaga@gmail.com",
                    subject: "Verifikasi Email(SecondHand)",
                    // text:`Selamat Datang <h1>${req.body.nama}`,
                    html: contentEmail
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    console.log('Email sent: ' + info.response);
                })
                // res.status(201).json({ msg: "Berhasil" });
                res.status(201).json(result)
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    async add(req, res) {
        // let user = User.findOne({
        //     where: {
        //         id: 1
        //     }
        // })

        // let user2 = await User.findOne({
        //     where: {
        //         email: "diory@gmail.com"
        //     }
        // })
        // const user1 = await User.findOne({
        //     where: {
        //         id: 1
        //     }
        // })
        // let panjang = 1
        // const produks = [];
        // Product.findAll().then((prod) => {
        //     produks.push(prod);
        // });

        // // panjang = produks[0].length
        // // for (let items of produks) {
        // //     panjang += 1
        // // }
        // const result = await Product.findOne({
        //     where: { id: panjang + 1 },
        //     include: [{
        //         model: User
        //     }]
        // });

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
        // if (!Number(kategori)) {
        //     return res.status(403).json({ msg: "Pastikan Kategori", kategori })
        // }
        // console.log(("Gas Kan"));
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
                // const user = await this.userModel.findOne({
                //     where: { email, },
                //     include: [{ model: this.roleModel, attributes: ["id", "name",], }]
                // });
                // console.log(id_penjual);
                // let user = User.findOne({
                //     where: {
                //         id: id_penjual
                //     }
                // })
                // const produks = [];
                // Product.findAll().then((prod) => {
                //     produks.push(prod);
                // });
                // const result = Product.findOne({
                //     where: { id: produks[0].length + 1 },
                //     include: [
                //         {
                //             model: User,
                //         },
                //     ],
                // });
                // const produks = [];
                // Product.findAll().then((prod) => {
                //     produks.push(prod);
                // });
                // const result1 = Product.findOne({
                //     where: { id: 1 },
                //     include: [{
                //         model: User
                //     }]
                // });
                const contentEmail = `
                        <h1>Hai <span style="color:red">${req.body.nama_produk}<span/>,</h1>
                        <h1>Hai <span style="color:red">${id_penjual}<span/>,</h1>
                        <h1>Hai <span style="color:red">${stok}<span/>,</h1>
                        <h3>Hai <span style="color:red">${deskripsi}<span/>,</h3>
                        <img src=${req.body.foto}></img>
                        <h4>Verifikasi Email mu!</h4>
                        <p>Terima Kasih<p/>
                    `;
                const mailOptions = {
                    from: 'Diory Pribadi',
                    to: "diorypribadi@gmail.com",
                    subject: 'Verifikasi Email(SecondHand)',
                    // text:`Selamat Datang <h1>${req.body.nama}`,
                    html: contentEmail,
                };
                // transporter.sendMail(mailOptions, (err, info) => {
                //     console.log('Email sent: ' + info.response);
                // });

                // res.status(201).json(result.User.email);
                // res.status(201).json({ msg: produks[0].length });
                // res.status(201).json({ msg: panjang });
                // res.status(201).json(produks[0]);
                // res.status(201).json(result);
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

    async add3(req, res) {
        try {
            const { deskripsi, stok, id_penjual } = req.body;

            const produks = [];
            Product.findAll().then((prod) => {
                produks.push(prod);
            });

            const result = await Product.findOne({
                where: { id: 1 },
                include: [{
                    model: User
                }]
            });
            productService.create({
                id_penjual: req.body.id_penjual,
                id_kategori: req.body.id_kategori,
                nama_produk: req.body.nama_produk,
                harga: req.body.harga,
                stok: req.body.stok,
                deskripsi: req.body.deskripsi,
                foto: req.body.foto,
            })
            const contentEmail = `
                        <h1>Hai <span style="color:red">${req.body.nama_produk}<span/>,</h1>
                        <h1>Hai <span style="color:red">${id_penjual}<span/>,</h1>
                        <h1>Hai <span style="color:red">${stok}<span/>,</h1>
                        <h3>Hai <span style="color:red">${deskripsi}<span/>,</h3>
                        <img src=${req.body.foto}></img>
                        <p>Terima Kasih<p/>
                    `;
            const mailOptions = {
                from: 'Diory Pribadi',
                to: 'diorypribadi29sinaga@gmail.com',
                subject: 'Verifikasi Email(SecondHand)',
                // text:`Selamat Datang <h1>${req.body.nama}`,
                html: contentEmail,
            };
            // transporter.sendMail(mailOptions, (err, info) => {
            //     console.log('Email sent: ' + info.response);
            // });
            // const result1 = await Product.findOne({
            //     where: { id: 3 },
            //     include: [{
            //         model: User
            //     }]
            // });
            // res.status(201).json(result.User.email);
            // res.status(201).json({ msg: produks[0].length });
            // res.status(201).json({ msg: panjang });
            // res.status(201).json(produks[0]);
            res.status(201).json(result);
            // res.status(201).json(result.User.email);

            // try {
            //     const result = await Product.findOne({
            //         where: { id: produks[0].length },
            //         include: [{
            //             model: User
            //         }]
            //     });
            //     // res.status(201).json({ msg: produks[0].length });
            //     res.status(201).json(result);
            // } catch (error) {
            //     console.log(error);
            // }



        } catch (error) {
            console.log(error);
        }
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
                subject: 'Infot Produk(SecondHand)',
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
    }

};