import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../../Context/cart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/get-single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:8000/get-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            width={"100px"}
            height={"250px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`http://localhost:8000/get-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                <div className="d-flex">
                  <button
                    className="btnn btn1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btnn btn2">ADD TO CART</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
