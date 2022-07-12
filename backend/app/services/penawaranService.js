const { updatePenawaran } = require("../controllers/api/v1/penawaranController");
const penawaranRepository = require("../repositories/penawaranRepository");

module.exports = {
  async listPenawaran() {
    try {
        const penawaran = await penawaranRepository.findAllPenawaran();
        // console.log("penawaran", penawaran);
        return penawaran;
    } catch (err) {
        throw err;
    }
},

async statusPenawaran() {
    try {
        const status = await penawaranRepository.findAllStatus();
        console.log("sere", status);
        return status;
    } catch (err) {
        throw err;
    }
},
create(requestBody) {
    return penawaranRepository.create(requestBody);
},

async onePenawaran({ id }) {
    try {
        const penawaran = await penawaranRepository.findonePenawaran({ id });
        console.log("ps", penawaran)
        return penawaran;
    } catch (err) {
        throw err;
    }
},

async updatePenawaran({ id }, requestBody) {
    // console.log("service id", id);
    try {
        const update = penawaranRepository.updatePenawaran(id, requestBody);
        return update;
    }
    catch (err) {
        throw err;
    }
},

};
