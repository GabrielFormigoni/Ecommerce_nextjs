import React from "react";

const Home = () => {
  return (
    <>
      HeroBanner
      <div>
        <h2>Best selling products</h2>
        <p>
          Wireless headphones!! Get rid of wires, as well as all the problems to
          keep them organized and whole.
        </p>
      </div>
      <div>
        {["product 1", "product 2", "product 3"].map((product, index) => (
          <div key={index}>{product}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
