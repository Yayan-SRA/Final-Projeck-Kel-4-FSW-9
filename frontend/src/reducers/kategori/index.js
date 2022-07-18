import { GET_KATEGORI, } from "../../actions/kategoriAction";

const initialState = {
    getkategoriResult: false,
    getkategoriLoading: false,
    getkategoriError: false,
}

const kategori = (state = initialState, action) => {
    switch (action.type) {
        case GET_KATEGORI:
            console.log("4. Masuk Reducer", action);
            return{
                ...state,
                getKategoriResult: action.payload.data,
                getKategoriLoading: action.payload.loading,
                getKategoriError: action.payload.errorMessage,
            }
    
        default:
            return state;
    }
}

export default kategori