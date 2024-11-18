import React from "react";
import Layout from "../Components/Layouts/layout";
import "../styles/PrivacyPolicy.css"; // Import CSS for styling

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="policy-container">
        <h1 className="policy-title">Privacy Policy</h1>
        <p className="policy-text">
          At <strong>ER-MART</strong>, your privacy is our priority. We are
          committed to safeguarding your personal information and ensuring a
          secure shopping experience. This Privacy Policy outlines how we
          collect, use, and protect your data.
        </p>
        <h2 className="policy-section-title">Information We Collect</h2>
        <p className="policy-text">
          We collect essential information, such as your name, email address,
          phone number, and payment details, to process your orders and improve
          your shopping experience. Additionally, we may gather data like
          browsing behavior and preferences to personalize your experience.
        </p>
        <h2 className="policy-section-title">Data Protection</h2>
        <p className="policy-text">
          We implement advanced security measures to protect your data from
          unauthorized access, alteration, or disclosure. Our payment gateway
          partners follow strict compliance standards to ensure safe
          transactions.
        </p>
      </div>
    </Layout>
  );
};

export default Policy;
