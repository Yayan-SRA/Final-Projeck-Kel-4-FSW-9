const penjualanRepository = require("../repositories/penjualanRepository");

module.exports = {
  create(requestBody) {
    return penjualanRepository.create(requestBody);
  },

  update(id, requestBody) {
    return penjualanRepository.update(id, requestBody);
  },

  delete(id) {
    return penjualanRepository.delete(id);
  },

  async list() {
    try {
      const posts = await penjualanRepository.findAll();
      const postCount = await penjualanRepository.getTotalPenjualan();

      return {
        data: posts,
        count: postCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return penjualanRepository.find(id);
  },
};
