const { Penjualans } = require("../models");

module.exports = {
  create(createArgs) {
    return Penjualans.create(createArgs);
  },

  update(id, updateArgs) {
    return Penjualans.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Penjualans.destroy(id);
  },

  find(id) {
    return Penjualans.findByPk(id);
  },

  findAll() {
    return Penjualans.findAll();
  },

  getTotalPenjualan() {
    return Penjualans.count();
  },
};
