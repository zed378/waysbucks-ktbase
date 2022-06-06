// import package
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toRupiah from "@develoka/angka-rupiah-js";

// import component

// import assets
import product from "../../assets/img/product.svg";
import noproduct from "../../assets/img/noproduct.png";
import cssModules from "../../assets/css/Product.module.css";

// import config
import { API } from "../../config/api";

function Product() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [del, setDel] = useState(null);

  const getProducts = async () => {
    try {
      const response = await API.get("/products");

      setProducts(response.data.data);
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
          <button className={cssModules.promoteBtn} onClick={() => delProd(id)}>
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

  const delProd = async (id) => {
    try {
      await API.delete("/product/" + id);

      setDel(false);

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className={cssModules.bodyProduct}>
        <button
          className={cssModules.addProd}
          onClick={() => navigate("/product-add")}
        >
          <img src={product} alt="product" />
          Add Product
        </button>

        <br />

        {del ? del : <></>}

        <div className={cssModules.prodContainer}>
          {products.length !== 0 ? (
            <>
              {products?.map((item) => (
                <div className={cssModules.productCard}>
                  <div className={cssModules.productImg}>
                    <img src={item.thumbnail} alt={item.thumbnail} />
                  </div>
                  <div className={cssModules.productDesc}>
                    <h3>{item.title}</h3>
                    <p>
                      {toRupiah(item.price, {
                        formal: false,
                        floatingPoint: 0,
                      })}
                    </p>
                  </div>
                  <div className={cssModules.actionBtn}>
                    <button
                      className={cssModules.editBtn}
                      onClick={() => navigate(`/product-edit/${item.id}`)}
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
              <img src={noproduct} alt="No Product to Display" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
