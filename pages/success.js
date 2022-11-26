import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { runFireworks } from "../lib/utils";

import { useStateContext } from "../context/StateContext";

const success = () => {
  const { setCartItens, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    setCartItens([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for buying in our store!</h2>
        <p className="email-msg">Check you email imbox for your receipt!</p>
        <p className="description">
          If you have any questions, please send an email to
          <a className="email" href="mailto:purshase@gmail.com">
            purshase@gmail.com
          </a>
        </p>
        <Link href="/">
          <button className="btn" width="300px">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
