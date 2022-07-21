const { Product, Kategori, Status } = require("../models");

module.exports = {
  findAllProduct() {
    const product = Product.findAll({
      order: ['id'],
      include: [{ model: Kategori }]
    });
    console.log("barang", product)
    return product
  },
  //   findAllPenjual(idJual) {
  //     const Penjual = Product.findAll({
  //       where: { id_penjual: idJual }
  //     });
  //     console.log("barang", Penjual)
  //     return Penjual
  // },

  //   findOwnProduct() {
  //     const ownProduct = Product.findAll({
  //       where: { id: id },
  //     });
  //     console.log("barang", ownProduct)
  //     return ownProduct
  // },

  findAllKategori() {
    const kategori = Kategori.findAll({
      order: ['id']
    });
    console.log("kategori", kategori)
    return kategori;
  },

  findAllStatus() {
    const stat = Status.findAll({
      order: ['id']
    });
    console.log("status", stat)
    return stat;
  },

  create(createBody) {
    return Product.create(createBody);
  },

  findOneProduct({ id }) {
    return Product.findAll({
      where: { id_penjual: id },
      include: [{
        model: Kategori
      }]
    });
  },

  findOneKategori({ id }) {
    return Product.findAll({
      where: { id_kategori: id },
      include: [{
        model: Kategori
      }]
    });
  },

  updateProduct({ id }, updateBody) {
    return Product.update(updateBody, { where: { id } });
  },
  deleteProduct({ id }) {
    console.log("coba lihat id repo", id)
    const hapus = Product.destroy({ where: { id } })
    console.log("coba lihat hapus", hapus)
    return hapus;
  }
};
