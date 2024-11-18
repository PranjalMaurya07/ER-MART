import React from "react";
import Layout from "../Components/Layouts/layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import "../styles/Category.css"; // Import the CSS file

const Category = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="category-container">
        <div className="category-grid">
          {categories.map((c) => (
            <div className="category-card" key={c._id}>
              <Link to={`/categories/${c.slug}`} className="category-btn">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Category;
