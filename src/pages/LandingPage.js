// import package
import { useContext, useState, useEffect } from "react";

// import component
import ProductCard from "../components/card/ProductCard";

// import assets
import cssModules from "../assets/css/LandingPage.module.css";
import banner from "../assets/img/banner.jpg";
import noproduct from "../assets/img/noproduct.png";
import { UserContext } from "../context/UserContext";

// import config
import { API } from "../config/api";

function LandingPage() {
  const [state, dispatch] = useContext(UserContext);

  const [prods, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await API.get("/products");

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const detil = () => {
    if (!state.isLogin) {
      document.getElementById("login").click();
    }
  };

  return (
    <>
      <div className={cssModules.landingBody}>
        <div className={cssModules.banner}>
          <div className={cssModules.bannerDesc}>
            <h1>WAYSBUCKS</h1>
            <p className={cssModules.p1}>
              Things are changing, but we’re still here for you
            </p>
            <p className={cssModules.p2}>
              We have temporarily closed our in-store cafes, but select grocery
              and drive-thru locations remaining open.{" "}
              <strong>Waysbucks</strong> Drivers is also available
            </p>
            <br />
            <p className={cssModules.p3}>Let’s Order...</p>
          </div>
          <div className={cssModules.bannerImg}>
            <img src={banner} alt="Banner" />
          </div>
        </div>

        <br />
        <br />

        <h1>Let's Order</h1>
        <br />
        <div className={cssModules.productDisplay}>
          {prods.length !== 0 ? (
            <>
              {prods?.map((item, index) => (
                <ProductCard item={item} key={index} click={detil} />
              ))}
            </>
          ) : (
            <div className={cssModules.noData}>
              <img src={noproduct} alt="No Product to Display" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LandingPage;
