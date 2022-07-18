import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {getProduct} from "../../actions/productAction";
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./style.css"

function ListProduct(){
    const { getProductResult, getProductLoading, getProductError } = useSelector((state) => state.product)
    const dispatchEvent = useDispatch();

    useEffect(() => {
        console.log("1. use effect component did mount");
        dispatchEvent(getProduct())
    }, [dispatchEvent])

    return(
        <div>
            <div>
            <h4>List Product</h4>
            <div className="row justify-content-center">
            {getProductResult ? (
                getProductResult.map((product) => (
                    // console.log(product.nama_produk)
                        
                            <div key={product.id} className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3  m-3 card ">
                                    <Link to={`/product/${product.id}`}>
                                        
                                <img src={product.foto} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.nama_produk}</h5>
                                    <p className="card-text">{product.id_kategori}</p>
                                    <h5 className="card-title">{product.harga}</h5>
                                </div>
                                    </Link>
                                    
                            </div>
                        
                ))
            ) : getProductLoading ? (
                <p>loading...</p>
            ) : (
                <p>{getProductError ? getProductError : "Data Kosong"}</p>
            )

            }
            </div>
        </div>
        </div>
    )
}

export default ListProduct;