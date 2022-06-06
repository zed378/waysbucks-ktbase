// import packages
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toRupiah from "@develoka/angka-rupiah-js";

// import component

// import assets
import cssModules from "../assets/css/DetailProduct.module.css";
import check from "../assets/img/check.svg";

// import config
import { API } from "../config/api";

function DetailProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [top, setTop] = useState(null);
  const [topPrice, setTopPrice] = useState(null);
  const [product, setProduct] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [total, setTotal] = useState(0);

  const getProduct = async () => {
    try {
      const res = await API.get("/product/" + id);

      setProduct({
        id: res.data.data.id,
        title: res.data.data.title,
        thumbnail: res.data.data.thumbnail,
        price: toRupiah(res.data.data.price, {
          formal: false,
          floatingPoint: 0,
        }),
        prices: res.data.data.price,
      });

      setTotal(res.data.data.price);
    } catch (error) {
      console.log(error);
    }
  };

  const getToppings = async () => {
    try {
      const response = await API.get("/toppings");

      setToppings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checked = async (idTop, isClick) => {
    try {
      if (isClick === 0) {
        await API.patch(`/setClick/${idTop}/1`);
        getToppings();
      } else if (isClick === 1) {
        await API.patch(`/setClick/${idTop}/0`);
        getToppings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTransaction = async () => {
    try {
      await API.post(`/transaction/${product.id}/${top}/${quantity}/${total}`);

      navigate("/");
      document.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const incre = () => {
    setQuantity(quantity + 1);

    const value = product.prices + topPrice;
    const multiply = value * quantity;
    setTotal(multiply);
  };

  const decre = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);

      const value = product.prices + topPrice;
      const multiply = value * quantity;
      setTotal(multiply);
    } else {
      const value = product.prices + topPrice;
      const multiply = value * quantity;
      setTotal(multiply);
    }
  };

  const allPrice = (itemPrice, itemID) => {
    setTop(itemID);
    setTopPrice(itemPrice);

    setTotal(product.prices + topPrice);

    console.log(`total ${total}`);
    console.log(`top ${top}`);
    console.log(`topPrice ${topPrice}`);
    console.log(`product.prices ${product.prices}`);
    console.log(`product.id ${product.id}`);
    console.log(`quantity ${quantity}`);
  };

  useEffect(() => {
    getProduct();
    getToppings();
  }, []);

  useEffect(getToppings);

  return (
    <>
      <div className={cssModules.bodyDetail}>
        <div className={cssModules.imgProduct}>
          <img src={product.thumbnail} alt="Product" />
        </div>

        <div className={cssModules.topping}>
          <h1>{product.title}</h1>
          <div className={cssModules.setPrice}>
            <p>{product.price}</p>
            <div className={cssModules.qtySet}>
              <p>Qty</p>
              <p className={cssModules.counterSet} onClick={decre}>
                -
              </p>
              <p className={cssModules.count}>{quantity}</p>
              <p className={cssModules.counterSet} onClick={incre}>
                +
              </p>
            </div>
          </div>
          <br />
          <h2>Topping</h2>
          <div className={cssModules.menuWrapper}>
            {toppings?.map((item) => (
              <div
                className={cssModules.toppingMenu}
                onClick={() => {
                  checked(item.id, item.isClick, item.price);
                  allPrice(item.price, item.id);
                }}
              >
                {item.isClick === 1 ? (
                  <img
                    src={check}
                    alt="isChecked"
                    className={cssModules.isChecked}
                  />
                ) : (
                  <></>
                )}
                <img src={item.thumbnail} alt="Bubble Tea Gelatin" />
                <div>
                  <p>{item.title}</p>
                  <p>
                    {toRupiah(item.price, { formal: false, floatingPoint: 0 })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <br />
          <div className={cssModules.totalPrice}>
            <h2>Total</h2>
            <h3>{toRupiah(total, { formal: false, floatingPoint: 0 })}</h3>
          </div>
          <button onClick={() => addTransaction()}>Add Cart</button>
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
