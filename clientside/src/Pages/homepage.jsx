import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/layout";
import { Prices } from "../Components/Price.js";
import { useCart } from "../Context/cart";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get-all-category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/category");
      if (data?.success) {
        setCategories(data?.category);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get-products-perpage
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get product's count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load-more-products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8000/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter-products-by-categories
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get-filtered-products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers "}>
      <div className="homepage-container container-fluid row mt-3">
        <div className="filter-section col-md-3">
          <h4 className="filter-title text-center">Filter By Category</h4>
          <div className="category-filter d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="filter-title text-center mt-4">Filter By Price</h4>
          <div className="price-filter d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="reset-button d-flex flex-column">
            <button
              className="btn btn-danger mt-3"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="products-section col-md-9">
          <h1 className="page-title text-center">All Products</h1>
          <div className="product-cards d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="product-card card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8000/get-photo/${p._id}`}
                  className="card-img-top product-image"
                  alt={p.name}
                />
                <div className="card-body product-body">
                  <h5 className="card-title product-name">{p.name}</h5>
                  <p className="card-text product-description">
                    {p.description.substring(0, 25)}...
                  </p>
                  <p className="card-text product-price"> $ {p.price}</p>
                  <div className="d-flex action-buttons">
                    <button
                      className="btnn btn1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btnn btn2"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="load-more-btn m-2 p-3">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
