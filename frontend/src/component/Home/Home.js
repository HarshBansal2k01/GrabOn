import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/fa";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors,getProduct } from "../../actions/productAction";
// to call and use function we need this 2 things 4
// when to tigger actions
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      // will clearing error after showing
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="GrabOn" />
          <div className="banner">
            <p>Welcome to GrabOn</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll
                {/* <CgMouse /> */}
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          {/* showing products */}
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
