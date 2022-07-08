const { Product, Kategori, Status } = require("../models");

module.exports = {
  findAllProduct() {
    const product = Product.findAll({
        order: ['id']
    });
    console.log("barang", product)
    return product
},

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
  return Product.findOne({
      where: { id: id },
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
