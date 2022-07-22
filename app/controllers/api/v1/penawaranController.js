const { Product, Penawaran } = require("../../../models");
const penawaranService = require("../../../services/penawaranService");

module.exports = {
    async findProduk(req, res) {
        const id = req.params.id

        // Penawaran.findAll({
        //     where: { id_produk: id_produk }
        // }).then((tawar) => {
        //     res.json(tawar)
        // })
        penawaranService.listProduk({ id })
            .then((penawaran) => {
                res.status(201).json(penawaran)
            })
    },
    formPenawaran(req, res) {
        penawaranService
            .listPenawaran()
            .then((penawaran) => {
                res.render("penawaran", { penawaran });
            });
    },
    async tawaran(req, res) {
        const id = req.params.id;
        await penawaranService.listPenawaran({
            id
        })
            .then((penawaran) => {
                res.status(200).json(penawaran);
            })
    },

    async tawaranBuatBuyer(req, res) {
        const id = req.params.id;
        await penawaranService.listPenawaranBuatBuyer({
            id
        })
            .then((penawaranBuatBuyer) => {
                res.status(200).json(penawaranBuatBuyer);
            })
    },

    penawaran(req, res) {
        console.log("tes", req.body)
        penawaranService
            .create({
                id_user: req.body.id_user,
                id_produk: req.body.id_produk,
                id_penjual: req.body.id_penjual,
                id_status: req.body.id_status,
                jumlah: req.body.jumlah,
                penawaranHarga: req.body.penawaranHarga,
                ketNegosiasi: req.body.ketNegosiasi,
            })
            .then((penawaran) => {
                res.status(200).json(penawaran)
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    updatePenawaran(req, res) {
        const id = req.params;
        penawaranService.updatePenawaran({ id }, {
            id_user: req.body.id_user,
            id_produk: req.body.id_produk,
            id_status: req.body.id_status,
            jumlah: req.body.jumlah,
            penawaranHarga: req.body.penawaranHarga,
            keterangan: req.body.keterangan,
        }).then((update) => {
            res.status(200).json(update)
        }).catch(err => {
            res.status(422).json("Can't update Penawaran")
        })
    },
    async selectPenawaran(req, res) {
        // const token = req.cookies.jwt;
        // const pengguna = req.user;
        const id = req.params.id;
        console.log("lihat id", id)
        const penawaran = await penawaranService.onePenawaran({
            id
        })
        const status = await penawaranService.statusPenawaran();
        res.render("#tempateditpenawaran", { penawaran, status });
    },


};