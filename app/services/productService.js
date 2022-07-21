const productRepository = require("../repositories/productRepository");

module.exports = {
    async listProduct() {
        try {
            const product = await productRepository.findAllProduct();
            // const penjual = await productRepository.findAllPenjual({idJual});
            // console.log("product", product);
            return product;
        } catch (err) {
            throw err;
        }
    },

    //   async listOwnProduct() {
    //     try {
    //         const ownProduct = await productRepository.findOwnProduct();
    //         // console.log("product", product);
    //         return ownProduct;
    //     } catch (err) {
    //         throw err;
    //     }
    // },

    async list() {
        try {
            const kategori = await productRepository.findAllKategori();
            //   const stat = await productRepository.findAllStatus();
            console.log("sere", kategori);
            return kategori;
        } catch (err) {
            throw err;
        }
    },

    create(requestBody) {
        return productRepository.create(requestBody);
    },

    async oneProduct({ id }) {
        try {
            const product = await productRepository.findOneProduct({ id });
            // const kategori = await productRepository.findAllKategori();
            // const coba = await productRepository.findAllUkur();
            console.log("cs", product)
            return product;
        } catch (err) {
            throw err;
        }
    },
    async oneKategori({ id }) {
        try {
            const kategori = await productRepository.findOneKategori({ id });
            // const kategori = await productRepository.findAllKategori();
            // const coba = await productRepository.findAllUkur();
            console.log("cs", kategori)
            return kategori;
        } catch (err) {
            throw err;
        }
    },

    async updateProduct({ id }, requestBody) {
        // console.log("service id", id);
        try {
            const update = productRepository.updateProduct(id, requestBody);
            return update;
        }
        catch (err) {
            throw err;
        }
    },

    async deleteProduct({ id }) {
        console.log("coba lihat id service", id)
        try {
            const del = await productRepository.deleteProduct({ id });
            return del;
        } catch (error) {
            throw err;
        }

    }
};
