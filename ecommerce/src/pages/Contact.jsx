import React from "react";
import Layout from "../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call us anytime we are 24X7
            availible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@codingdojo.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 55 112 233
          </p>
          <p className="mt-3">
            <BiSupport /> : 1080 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
