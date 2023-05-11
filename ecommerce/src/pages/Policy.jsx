import React from "react";
import Layout from "../components/layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacyPolicy.jpg"
            alt="privacy policy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            A Privacy Policy is a legal agreement that summarizes key details
            about how a business or website collects, manages, and protects the
            personal information of its customers.
          </p>
          <p>
            Personal information is essentially any information that identifies
            an individual. Common examples include names, sex, date of birth,
            physical addresses, social security numbers, and so on.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
