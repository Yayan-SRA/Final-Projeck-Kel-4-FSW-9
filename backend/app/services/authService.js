const authRepository = require("../repositories/authRepository");

module.exports = {
  create(requestBody) {
    return authRepository.create(requestBody);
  },

  update(id, requestBody) {
    return authRepository.update(id, requestBody);
  },

  delete(id) {
    return authRepository.delete(id);
  },

  get(id) {
    return authRepository.find(id);
  },

  async list() {
    try {
      const auth = await authRepository.findAll();

      return {
        data: auth,
      };
    } catch (err) {
      throw err;
    }
  },
};
