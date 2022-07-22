const { Product, Status, Penawaran, User, Kategori } = require("../models");

module.exports = {
  findProduk({ id }) {
    const penawaran = Penawaran.findAll({
      order: ['id'],
      where: { id_produk: id }
    });
    console.log("tawaran", penawaran)
    return penawaran
  },
  findAllPenawaran({ id }) {
    const penawaran = Penawaran.findAll({
      order: ['id'],
      where: { id_penjual: id },
      include: [{
        model: Status
      }, {
        model: Product,
        include: [Kategori, User]
      },
      {
        model: User
      },
      ]
    });
    console.log("tawaran", penawaran)
    return penawaran
  },
  findAllPenawaranBuatBuyer({ id }) {
    const penawaran = Penawaran.findAll({
      order: ['id'],
      where: { id_user: id },
      include: [{
        model: Status
      }, {
        model: Product,
        include: [Kategori, User]
      },
      {
        model: User
      },
      ]
    });
    console.log("tawaran", penawaran)
    return penawaran
  },

  findAllStatus() {
    const stat = Status.findAll({
      order: ['id']
    });
    console.log("status", stat)
    return stat;
  },

  create(createBody) {
    return Penawaran.create(createBody);
  },

  findOneProduct({ id }) {
    return Product.findOne({
      where: { id: id },
      include: [{
        model: Kategori
      }]
    });
  },
  updatePenawaran({ id }, updateBody) {
    return Penawaran.update(updateBody, { where: { id: id } });
  },
  deleteProduct({ id }) {
    console.log("coba lihat id repo", id)
    const hapus = Product.destroy({ where: { id } })
    console.log("coba lihat hapus", hapus)
    return hapus;
  }
};
