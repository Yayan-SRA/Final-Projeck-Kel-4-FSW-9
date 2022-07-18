import { GET_PRODUCT, ADD_PRODUCT, ADD_PRODUCT_PHOTO, PREVIEW_PRODUCT, GET_SELECTED_PRODUCT, KIRIM_ID } from "../../actions/productAction";

const initialState = {
    getProductResult: false,
    getProductLoading: false,
    getProductError: false,

    getSelectedProductResult: false,
    getSelectedProductLoading: false,
    getSelectedProductError: false,

    kirimIdResult: false,
    kirimIdLoading: false,
    kirimIdError: false,
    
    addProductResult: false,
    addProductLoading: false,
    addProductError: false,

    previewProductResult: false,
    previewProductLoading: false,
    previewProductError: false,
    
    addProductPhotoResult: false,
    addProductPhotoLoading: false,
    addProductPhotoError: false,
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            console.log("4. Masuk Reducer", action);
            return{
                ...state,
                addProductResult: action.payload.data,
                addProductLoading: action.payload.loading,
                addProductError: action.payload.errorMessage,
            };
        case PREVIEW_PRODUCT:
            console.log("4. Masuk Reducer", action);
            return{
                ...state,
                previewProductResult: action.payload.data,
                previewProductLoading: action.payload.loading,
                previewProductError: action.payload.errorMessage,
            };
        case KIRIM_ID:
            console.log("4. Masuk Reducer", action);
            return{
                ...state,
                kirimIdResult: action.payload.data,
                kirimIdLoading: action.payload.loading,
                kirimIdError: action.payload.errorMessage,
            };
        case ADD_PRODUCT_PHOTO:
            console.log("4. Masuk Reducer", action);
            return{
                ...state,
                addProductPhotoResult: action.payload.data,
                addProductPhotoLoading: action.payload.loading,
                addProductPhotoError: action.payload.errorMessage,
            };
        case GET_PRODUCT:
            console.log("4. Masuk Reducer", action);
            return{
                ...state,
                getProductResult: action.payload.data,
                getProductLoading: action.payload.loading,
                getProductError: action.payload.errorMessage,
            };
        case GET_SELECTED_PRODUCT:
            console.log("4. Masuk Reducer", action);
            return{
                ...state,
                getSelectedProductResult: action.payload.data,
                getSelectedProductLoading: action.payload.loading,
                getSelectedProductError: action.payload.errorMessage,
            };
    
        default:
            return state;
    }
}

export default product