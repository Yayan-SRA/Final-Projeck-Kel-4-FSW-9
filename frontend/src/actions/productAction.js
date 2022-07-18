import axios from "axios";

export const GET_PRODUCT = "GET_PRODUCT"
export const KIRIM_ID = "KIRIM_ID"
export const GET_SELECTED_PRODUCT = "GET_SELECTED_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const ADD_PRODUCT_PHOTO = "ADD_PRODUCT_PHOTO"
export const PREVIEW_PRODUCT = "PREVIEW_PRODUCT"

export const getProduct = () => {
    console.log("2. Masuk Action");
    return (dispatchEvent) => {
        
        //Loading
        dispatchEvent({
            type: GET_PRODUCT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'GET',
            url: 'http://localhost:8000/v1/Produk',
            // timeout: 120000
        })
            .then((response) => {
                console.log("3. Berhasil dapat data : ", response.data)
                // berhasil get API
                dispatchEvent({
                    type: GET_PRODUCT,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((error) => {
                console.log("3. Gagal dapat data : ", error.message)
                //gagal get API
                dispatchEvent({
                    type: GET_PRODUCT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.Message
                    }
                })
            })
    }
}
export const getSelectedProduct = (data) => {
    console.log("2. Masuk Action", data);
    // console.log("2. Masuk Action id", data.id);
    // const id = data.id
    return (dispatchEvent) => {
        //Loading
        dispatchEvent({
            type: GET_SELECTED_PRODUCT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'GET',
            url: `http://localhost:8000/v1/DetailProduk/${data.id}`,
            // timeout: 120000
        })
            .then((response) => {
                console.log("3. Berhasil dapat data : ", response.data)
                // berhasil get API
                dispatchEvent({
                    type: GET_SELECTED_PRODUCT,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((error) => {
                console.log("3. Gagal dapat data : ", error.message)
                //gagal get API
                dispatchEvent({
                    type: GET_SELECTED_PRODUCT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.Message
                    }
                })
            })
    }
}
export const addProduct = (data) => {
    console.log("2. Masuk Action");
    console.log("coba data", data);
    return (dispatchEvent) => {
        
        //Loading
        dispatchEvent({
            type: ADD_PRODUCT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'POST',
            url: 'http://localhost:8000/v1/Produk/add',
            // timeout: 120000
            data: data

        }).then((response) => {
                console.log("3. Berhasil dapat data : ", response.data)
                console.log("3. Berhasil dapat data json : ", response.config.data)
                // berhasil get API
                dispatchEvent({
                    type: ADD_PRODUCT,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((error) => {
                console.log("3. Gagal dapat data : ", error.message)
                //gagal get API
                dispatchEvent({
                    type: ADD_PRODUCT,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.Message
                    }
                })
            })
    }
}

export const addProductPhoto = (data) => {
    console.log("2. Masuk Action");
    console.log("coba data", data);
    // const form = new FormData();
    // form.append("image", data);
    return (dispatchEvent) => {

        // Loading
        dispatchEvent({
            type: ADD_PRODUCT_PHOTO,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'POST',
            url: 'http://localhost:8000/v1/Produk/add/image/cloudinary',
            // timeout: 120000
            data: data
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
              }
        }).then((response) => {
                // console.log("3. Berhasil dapat data : ", response)
                console.log("3. Berhasil dapat data : ", response.data)
                // berhasil get API
                dispatchEvent({
                    type: ADD_PRODUCT_PHOTO,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((error) => {
                console.log("3. Gagal dapat data : ", error.message)
                //gagal get API
                dispatchEvent({
                    type: ADD_PRODUCT_PHOTO,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.Message
                    }
                })
            })
    }
}
export const previewProduct = (data) => {
    console.log("2. Masuk Action");
    console.log("coba data", data);
    // const form = new FormData();
    // form.append("image", data);
    return (dispatchEvent) => {

        // Loading
        dispatchEvent({
            type: PREVIEW_PRODUCT,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        if(data !== false) {
            console.log("opo masuk kene ?", data)
            dispatchEvent({
                type: PREVIEW_PRODUCT,
                payload: {
                    loading: false,
                    data: data,
                    errorMessage: false
                }
            })
        } else {
            console.log("masuk kene ?", data)
            dispatchEvent({
                type: PREVIEW_PRODUCT,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: true
                }
            })
        }

    }
}

export const kirimId = (data) => {
    console.log("2. Masuk Action");
    console.log("coba data", data);
    // const form = new FormData();
    // form.append("image", data);
    return (dispatchEvent) => {

        // Loading
        dispatchEvent({
            type: KIRIM_ID,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        if(data !== false) {
            console.log("opo masuk kene ?", data)
            dispatchEvent({
                type: KIRIM_ID,
                payload: {
                    loading: false,
                    data: data,
                    errorMessage: false
                }
            })
        } else {
            console.log("masuk kene ?", data)
            dispatchEvent({
                type: KIRIM_ID,
                payload: {
                    loading: false,
                    data: false,
                    errorMessage: true
                }
            })
        }

    }
}