// import packages
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import toRupiah from "@develoka/angka-rupiah-js";

// import component

// import assets
import cssModules from "../assets/css/Profile.module.css";
import logo from "../assets/img/logo.svg";
import qr from "../assets/img/qr.svg";
import { UserContext } from "../context/UserContext";

// import config
import { API } from "../config/api";
const path = "http://localhost:5000/uploads/product/";

function Profile() {
  const [state, dispatch] = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [trans, setTrans] = useState([]);

  const getUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTrans = async () => {
    try {
      const respone = await API.get(`/user-transactions/${state.user.id}`);

      setTrans(respone.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getUserTrans();
  }, []);

  let navigate = useNavigate();

  return (
    <>
      <div className={cssModules.profileBody}>
        <div className={cssModules.profileContainer}>
          <div className={cssModules.profileDesc}>
            <h1>My Profile</h1>
            <div className={cssModules.contentWrap}>
              <div className={cssModules.profileImg}>
                <img src={user.photo} alt="Profile" />
              </div>
              <div className={cssModules.profileData}>
                <div>
                  <h3>Full Name</h3>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>{user.email}</p>
                </div>
                <button onClick={() => navigate(`/profile-edit/${user.id}`)}>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {!state.isAdmin ? (
            <div className={cssModules.historyTransaction}>
              {trans?.map((item) => (
                <>
                  <h1>My Transaction</h1>
                  <div className={cssModules.transactionCard}>
                    <div className={cssModules.detilTrans}>
                      <div className={cssModules.itemTrans}>
                        <div className={cssModules.imgProduct}>
                          <img
                            src={path + item.product.thumbnail}
                            alt="Product Pic"
                          />
                        </div>
                        <div className={cssModules.itemDesc}>
                          <h4>{item.product.title}</h4>
                          <p className={cssModules.datePurchase}>
                            {dateFormat(item.createdAt, "fullDate")}
                          </p>
                          <br />
                          <p className={cssModules.topping}>
                            Topping: {item.topping.title}
                          </p>
                          <p className={cssModules.productPrice}>
                            Price:{" "}
                            {toRupiah(item.total, {
                              formal: false,
                              floatingPoint: 0,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={cssModules.productStamp}>
                      <img
                        src={logo}
                        alt="Logo"
                        className={cssModules.bucksLogo}
                      />
                      <img
                        src={qr}
                        alt="QR Code"
                        className={cssModules.qrCode}
                      />
                      <div className={cssModules.stats}>
                        <p
                          className={cssModules.productStatus}
                          style={{
                            background:
                              item.status === "otw"
                                ? "rgba(0, 209, 255, 0.2)"
                                : item.status === "process"
                                ? "rgba(0, 209, 255, 0.2)"
                                : item.status === "cancel"
                                ? "#E8393950"
                                : item.status === "pending"
                                ? "rgba(0, 209, 255, 0.2)"
                                : "#78A85A30",
                            color:
                              item.status === "otw"
                                ? "#0063cf"
                                : item.status === "process"
                                ? "#0063cf"
                                : item.status === "cancel"
                                ? "#E83939"
                                : item.status === "pending"
                                ? "#0063cf"
                                : "#78A85A",
                          }}
                        >
                          {item.status === "process"
                            ? "Wait Approval"
                            : item.status === "otw"
                            ? "On The Way"
                            : item.status === "cancel"
                            ? "Cancel"
                            : item.status === "pending"
                            ? "Need To Pay"
                            : "Success"}
                        </p>
                        <p className={cssModules.totalPurchase}>
                          Sub Total:{" "}
                          {toRupiah(item.total, {
                            formal: false,
                            floatingPoint: 0,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
