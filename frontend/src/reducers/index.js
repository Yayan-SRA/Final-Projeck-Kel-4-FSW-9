import { combineReducers } from "redux";
import product from "./product";
import kategori from "./kategori";
import user from "./user"

export default combineReducers({
    product, kategori, user
})