import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProduct.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/product-category/${params.slug}`
      );
      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} results found</h6>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`http://localhost:8000/get-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name.substring(0, 20)}...</h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}...
                    </p>
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
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
