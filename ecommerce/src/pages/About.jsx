import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us"}>
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
            Our e-commerce platform provides an extensive selection of products
            for sale, spanning across diverse categories. From electronics and
            apparel to home goods and beauty products, our website offers a
            comprehensive range of items that customers can purchase online.
            Whether it's technology gadgets, fashion accessories, household
            essentials, or personal care products, our platform aims to cater to
            the diverse needs and preferences of our customers. With a
            user-friendly interface and convenient browsing options, our website
            enables customers to easily explore and shop for products from
            different categories in a seamless and convenient manner.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
