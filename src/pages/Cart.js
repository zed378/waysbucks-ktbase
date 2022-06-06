// import packages
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toRupiah from "@develoka/angka-rupiah-js";

// import component

// import assets
import cssModules from "../assets/css/Cart.module.css";
import trash from "../assets/img/trash.svg";
import attachment from "../assets/img/attachment.svg";
import notransaction from "../assets/img/notransaction.png";
import { UserContext } from "../context/UserContext";

// import config
import { API } from "../config/api";
const path = "http://localhost:5000/uploads/product/";

function Cart() {
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();

  const [transaction, setTransaction] = useState([]);

  // store data
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    attach: "",
    address: "",
    postcode: "",
  });
  // init state for preview thumbnail
  const [preview, setPreview] = useState(null);

  const inputFile = () => {
    document.getElementById("attach").click();
  };

  // Alert
  const [del, setDel] = useState(null);
  const delAlert = (id) => {
    const modal = (
      <div className={cssModules.confirmModal}>
        <p>Are you sure to delete this tansaction?</p>
        <div className={cssModules.actBtn}>
          <button
            className={cssModules.promoteBtn}
            onClick={() => delTransaction(id)}
          >
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store form data as object
      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("address", form.address);
      formData.set("postcode", form.postcode);
      formData.set("attach", form.attach[0], form.attach[0].name);

      await API.post(`/income/${transaction[0].id}`, formData, config);
      await API.patch(`/transaction/${transaction[0].id}/process`);

      dispatch({
        type: "popShow",
      });

      setTimeout(() => {
        dispatch({
          type: "popClose",
        });

        navigate("/");

        document.location.reload(true);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const getTransaction = async () => {
    try {
      const response = await API.get(`/user-transaction/${state.user.id}`);

      setTransaction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const delTransaction = async (transID) => {
    try {
      await API.delete(`/transaction/${transID}`);

      setDel(null);
      getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <>
      {del ? del : <></>}

      <div className={cssModules.cartBody}>
        <h1>My Cart</h1>
        <br />
        {transaction.length !== 0 ? (
          <>
            <h3>Review Your Order</h3>
            <br />
            <div className={cssModules.orderCart}>
              <div className={cssModules.orderReview}>
                <div className={cssModules.orderItems}>
                  {/* item description  */}
                  {transaction?.map((item) => (
                    <div className={cssModules.itemDesc}>
                      <div className={cssModules.productDesc}>
                        <div className={cssModules.productImg}>
                          <img
                            src={path + item.product.thumbnail}
                            alt="Product"
                          />
                        </div>
                        <div className={cssModules.descriptions}>
                          <h4>{item.product.title}</h4>
                          <p>
                            <strong>Topping :</strong> {item.topping.title}
                          </p>
                        </div>
                      </div>
                      <div className={cssModules.productPrices}>
                        <p>
                          {toRupiah(item.total, {
                            formal: false,
                            floatingPoint: 0,
                          })}
                        </p>
                        <img
                          src={trash}
                          alt="del btn"
                          onClick={() => delAlert(item.id)}
                        />
                      </div>
                    </div>
                  ))}
                  {/* end of item description */}
                </div>

                <br />

                <div className={cssModules.payment}>
                  {transaction?.map((item) => (
                    <div className={cssModules.payDesc}>
                      <div className={cssModules.subTotal}>
                        <div className={cssModules.total}>
                          <h4>Subtotal</h4>
                          <h4>
                            {toRupiah(item.total, {
                              formal: false,
                              floatingPoint: 0,
                            })}
                          </h4>
                        </div>
                        <div className={cssModules.total}>
                          <h4>Qty</h4>
                          <h4>{item.qty}</h4>
                        </div>
                      </div>
                      <div className={cssModules.payTotal}>
                        <h4>Total</h4>
                        <h4>
                          {toRupiah(item.total, {
                            formal: false,
                            floatingPoint: 0,
                          })}
                        </h4>
                      </div>
                    </div>
                  ))}

                  {/* payment pic proof preview */}
                  <div className={cssModules.payProof}>
                    <div className={cssModules.imgPayment} id="imgPayment">
                      {preview && (
                        <img
                          src={preview}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "50%",
                          }}
                          alt="preview"
                        />
                      )}
                    </div>
                    <button onClick={inputFile}>
                      <img src={attachment} alt="Attachment" /> Attach Payment
                    </button>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className={cssModules.personInfo}>
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    id="attach"
                    name="attach"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="postcode"
                    placeholder="Postal Code"
                    onChange={handleChange}
                  />
                  <textarea
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                  ></textarea>
                  <button type="submit">Pay</button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className={cssModules.notransaction}>
            <img src={notransaction} alt={notransaction} />
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
