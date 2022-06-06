// import packages
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import assets
import logo from "../../assets/img/logo.svg";
import basket from "../../assets/img/basket.svg";
import message from "../../assets/img/message.svg";
import cssModules from "../../assets/css/NavLogged.module.css";
import { UserContext } from "../../context/UserContext";

// import component
import DropMenu from "../card/DropMenu";

// import config
import { API } from "../../config/api";

function NavLogged() {
  // define state
  const [dropModal, setDropModal] = useState(false);
  const [user, setUser] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [state, dispatch] = useContext(UserContext);

  const getUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransaction = async () => {
    try {
      const response = await API.get(`/basket/${state.user.id}`);

      setTransaction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getTransaction();
  }, []);

  let navigate = useNavigate();

  return (
    <>
      {/* set modal using useState */}
      {dropModal ? <DropMenu close={() => setDropModal(false)} /> : <></>}

      {/* nav content  */}
      <div className={cssModules.navContainer}>
        <img src={logo} alt="Logo" onClick={() => navigate("/")} />
        <div className={cssModules.profileWrapper}>
          <div className={cssModules.chat} onClick={() => navigate("/chat")}>
            <img
              src={message}
              alt="Conversation"
              className={cssModules.chats}
            />
          </div>
          <div className={cssModules.pos}>
            <div className={cssModules.bask}>
              {transaction.length !== 0 ? (
                <p className={cssModules.stuff}>{transaction.length}</p>
              ) : (
                <></>
              )}
            </div>
            <img
              src={basket}
              alt="basket"
              className={cssModules.basketImg}
              onClick={() => navigate("/cart")}
            />
          </div>
          <div
            className={cssModules.imgWrapper}
            onClick={() => setDropModal(true)}
          >
            <img src={user.photo} alt="profile" />
          </div>
        </div>
      </div>
    </>
  );
}

export default NavLogged;
