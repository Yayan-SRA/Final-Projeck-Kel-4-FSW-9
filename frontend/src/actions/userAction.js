import axios from "axios";
import { useDispatch, useSelector } from "react-redux/es/exports";

export const LOGIN = "LOGIN"
export const GET_USER = "GET_USER"

export const login = (data) => {
    console.log("2. Masuk Action");
    console.log("coba data", data);
    return (dispatchEvent) => {
        
        // Loading
        dispatchEvent({
            type: LOGIN,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'POST',
            url: 'http://localhost:8000/login',
            // timeout: 120000
            data: data
        }, {
            withCredentials : true
        }).then((response) => {
                // console.log("3. Berhasil dapat data : ", response)
                console.log("3. Berhasil dapat data json : ", response.data)
                // berhasil get API
                dispatchEvent({
                    type: LOGIN,
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
                    type: LOGIN,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.Message
                    }
                })
            })
    }
}

export const getUser = () => {
    console.log("2. Masuk Action");
    return (dispatchEvent) => {
        const { loginResult, loginLoading, loginError } = useSelector((state) => state.user)
        console.log("masa salah");
        if(loginResult!==false){
            console.log("useract",loginResult)
            const data = loginResult;
        
        
        //Loading
        dispatchEvent({
            type: GET_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        axios({
            method: 'GET',
            url: 'http://localhost:8000/user',
            headers: {
                "Authorization": `Bearer ${data.accessToken}`
            }
            // timeout: 120000
        })
            .then((response) => {
                console.log("3. Berhasil dapat data : ", response.data)
                // berhasil get API
                dispatchEvent({
                    type: GET_USER,
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
                    type: GET_USER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.Message
                    }
                })
            })
        }
    }
}