// const {Product} = require("../../../models");
const penawaranService = require("../../../services/penawaranService");

module.exports = {
    formPenawaran(req, res) {
        penawaranService
            .listPenawaran()
            .then((penawaran) => {
                res.render("penawaran", { penawaran });
            });
    },
    async tawaran(req, res) {
        // const token = req.cookies.jwt;
        // const pengguna = req.user;
        // const id = req.params.id;
        // console.log("lihat id", id)
        const penawaran = await penawaranService.listPenawaran();
        console.log("lihat cc", cars);
        // console.log("get id", req.params.id);
        // console.log("hasil id", id);

        const status = await penawaranService.statusPenawaran();
        console.log("coba", penawaran)
        console.log("cars", status)
        res.render("#halamanpenawaran", { penawaran, status });
    },

    penawaran(req, res) {
        penawaranService
            .create({
                id_user: req.body.id_user,
                id_produk: req.body.id_produk,
                id_status: req.body.id_status,
                jumlah: req.body.jumlah,
                penawaranHarga: req.body.penawaranHarga,
                keterangan: req.body.keterangan,
            })
            .then((car) => {
                console.log(car);
                res.send(
                    '<script>window.location.href="#lokasilistpenawaran";document.getElementById("alert-save").click();</script>'
                );
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
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
        res.render("#tempateditpenawaran", { penawaran,status });
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
        }).then(() => {
            res.redirect("#lokasipenawaran");
        }).catch(err => {
            res.status(422).json("Can't update Penawaran")
        })
    },

};