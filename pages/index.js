import React from "react";
import { HeroBanner, Product, FooterBanner } from "../components";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>
          Wireless headphones!! Get rid of wires, as well as all the problems to
          keep them organized and whole.
        </p>
      </div>
      <div className="products-container">
        {["product 1", "product 2", "product 3"].map((product, index) => (
          <div key={index}>{product}</div>
        ))}
      </div>

      <FooterBanner />
    </>
  );
};

export default Home;
