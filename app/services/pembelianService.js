const pembelianRepostiory = require("../repositories/pembelianRepostiory");

module.exports = {
  create(requestBody) {
    return pembelianRepostiory.create(requestBody);
  },

  update(id, requestBody) {
    return pembelianRepostiory.update(id, requestBody);
  },

  delete(id) {
    return pembelianRepostiory.delete(id);
  },

  async list() {
    try {
      const posts = await pembelianRepostiory.findAll();
      const postCount = await pembelianRepostiory.getTotalPenjualan();

      return {
        data: posts,
        count: postCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return pembelianRepostiory.find(id);
  },
};
