
const Usercontrollers = require("./UserController")
const productController = require("./productController");
const penjualanController = require("./penjualanController");
const penawaranController = require("./penawaranController");
const usercontrollers = new Usercontrollers()

module.exports = {
  usercontrollers,productController,penjualanController, penawaranController
};
