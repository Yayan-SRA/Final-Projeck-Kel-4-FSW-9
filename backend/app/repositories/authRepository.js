const { User } = require("../models/user");

module.exports = {
  create(createArgs) {
    return User.create(createArgs);
  },

  update(id, updateArgs) {
    return User.update(updateArgs, {
      where: { id },
    });
  },

  delete(id) {
    return User.destroy(id);
  },

  find(id) {
    return User.findByPk(id);
  },

  findAll() {
    return User.findAll();
  },
};
