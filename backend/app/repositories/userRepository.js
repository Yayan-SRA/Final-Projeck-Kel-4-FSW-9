const { User } = require("../models");

module.exports = {
  create(createArgs) {
    return User.create(createArgs);
  },

  update(updateArgs,id) {
    return User.update(updateArgs,{
      where:{id}
    })
  },

  delete(id) {
    return User.Destroy({ where: { id } });
  },

  find(id) {
    return User.findOne({ where: { id } });
  },

  findAll() {
    return User.findAll();
  },
};
