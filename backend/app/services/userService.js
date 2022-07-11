const userRepository = require("../repositories/userRepository");

module.exports = {
  async create(requestBody) {
    return userRepository.create(requestBody);
  },

  async update(requestBody,id) {
    return userRepository.update(requestBody,id);
  },

  async delete(id) {
    return userRepository.delete(id);
  },

  async find(id) {
    return userRepository.find(id);
  },

  async list() {
    try {
      const users = await userRepository.findAll();

      return {
        users
      };
    } catch (err) {
      throw err;
    }
  },
};
