import React from "react";
import { HeroBanner, Product, FooterBanner } from "../components";
import { client } from "../lib/client";

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

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
export default Home;
