import React from "react";
import Layout from "../Components/Layouts/layout";

const About = () => {
  return (
    <Layout title={"About Us-ER Mart"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to ER-MART, where shopping meets convenience and
            quality. Our mission is to provide you with a seamless online
            shopping experience, offering a wide range of products that cater to
            your everyday needs. We pride ourselves on delivering exceptional
            value, secure shopping, and fast delivery. At ER-MART,
            your satisfaction is our top priority. Thank you for choosing us –
            let’s make your shopping journey remarkable!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
