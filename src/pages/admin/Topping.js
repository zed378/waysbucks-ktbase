// import package
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toRupiah from "@develoka/angka-rupiah-js";

// import component

// import assets
import topping from "../../assets/img/topping.svg";
import notopping from "../../assets/img/notopping.png";
import cssModules from "../../assets/css/Topping.module.css";

// import config
import { API } from "../../config/api";

function Topping() {
  const navigate = useNavigate();
  const [toppings, setToppings] = useState([]);
  const [del, setDel] = useState(null);

  const getToppings = async () => {
    try {
      const response = await API.get("/toppings");

      setToppings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const delAlert = (id, name) => {
    const modal = (
      <div className={cssModules.confirmModal}>
        <p>
          Are you sure to delete <strong>{name}</strong>?
        </p>
        <div className={cssModules.actBtn}>
          <button className={cssModules.promoteBtn} onClick={() => delTop(id)}>
            Yes
          </button>
          <button className={cssModules.delBtn} onClick={() => setDel(null)}>
            Cancel
          </button>
        </div>
      </div>
    );

    setDel(modal);
  };

  const delTop = async (id) => {
    try {
      await API.delete("/topping/" + id);

      setDel(null);

      getToppings();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToppings();
  }, []);

  return (
    <div className={cssModules.bodyTopping}>
      <button
        className={cssModules.addTop}
        onClick={() => navigate("/topping-add")}
      >
        <img src={topping} alt="product" />
        Add Topping
      </button>
      <br />

      {del ? del : <></>}

      <div className={cssModules.topContainer}>
        {toppings.length !== 0 ? (
          <>
            {toppings?.map((item) => (
              <div className={cssModules.topCard}>
                <div className={cssModules.topImg}>
                  <img src={item.thumbnail} alt="Topping" />
                </div>
                <div className={cssModules.topDesc}>
                  <h3>{item.title}</h3>
                  <p>
                    {toRupiah(item.price, { formal: false, floatingPoint: 0 })}
                  </p>
                </div>
                <div className={cssModules.actionBtn}>
                  <button
                    className={cssModules.editBtn}
                    onClick={() => navigate(`/topping-edit/${item.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className={cssModules.delBtn}
                    onClick={() => delAlert(item.id, item.title)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className={cssModules.noData}>
            <img src={notopping} alt="No Product to Display" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Topping;
