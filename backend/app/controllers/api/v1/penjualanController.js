

const penjualanService = require("../../../services/penjualanService");
const {Penjualans} = require("../../../models");


module.exports = {
  async list(req,res){
    try {
        await Penjualans.findAll().then((users)=>{
            res.json(users)
        })
        // const users = await userService.list()
        // res.json(users)
    } catch (error) {
        console.error(error)
    }
},

  create(req, res) {
    penjualanService
      .create(req.body)
      .then((post) => {
        res.status(201).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  update(req, res) {
    penjualanService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: "OK",
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  show(req, res) {
    penjualanService
      .get(req.params.id)
      .then((post) => {
        res.status(200).json({
          status: "OK",
          data: post,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    Penjualans
      .destroy({where:{id:req.params.id}})
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  onLost(req, res) {
    res.status(404).json({
      status: "FAIL",
      message: "Route not found!",
    });
  },

  onError(err, req, res, next) {
    res.status(500).json({
      status: "ERROR",
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
};
