const { Pembelians } = require("../models");

module.exports = {
  create(createArgs) {
    return Pembelians.create(createArgs);
  },

  update(id, updateArgs) {
    return Pembelians.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Pembelians.destroy(id);
  },

  find(id) {
    return Pembelians.findByPk(id);
  },

  findAll() {
    return Pembelians.findAll();
  },

  getTotalPembeliann() {
    return Pembelians.count();
  },
};
