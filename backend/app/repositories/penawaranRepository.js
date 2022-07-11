const { Status, Penawaran } = require("../models");

module.exports = {
  findAllPenawaran() {
    const penawaran = Penawaran.findAll({
        order: ['id'],
        include: [{
          model: Status
      }]
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
