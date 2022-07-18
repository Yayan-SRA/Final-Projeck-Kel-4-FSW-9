import axios from "axios";

export const GET_KATEGORI = "GET_KATEGORI"

export const getKategori = () => {
    // console.log("2. Masuk Action");
    return (dispatchEvent) => {
        
        //Loading
        dispatchEvent({
            type: GET_KATEGORI,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'GET',
            url: 'http://localhost:8000/v1/Produk/kategori',
            // timeout: 120000
        })
            .then((response) => {
                // console.log("3. Berhasil dapat data : ", response.data)
                // berhasil get API
                dispatchEvent({
                    type: GET_KATEGORI,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false
                    }
                })
            })
            .catch((error) => {
                // console.log("3. Gagal dapat data : ", error.message)
                //gagal get API
                dispatchEvent({
                    type: GET_KATEGORI,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.Message
                    }
                })
            })
    }
}