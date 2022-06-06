// import packages
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// import assets
import logo from "../../assets/img/logo.svg";
import cssModules from "../../assets/css/Nav.module.css";
import { UserContext } from "../../context/UserContext";

// import component
import Login from "../auth/Login";
import Register from "../auth/Register";

function Nav() {
  // define state
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  return (
    <>
      {/* set modal using useState */}
      {state.logModal ? (
        <Login
          close={() =>
            dispatch({
              type: "logClose",
            })
          }
          regCard={() =>
            dispatch({
              type: "regShow",
            })
          }
        />
      ) : (
        <></>
      )}
      {state.regModal ? (
        <Register
          close={() =>
            dispatch({
              type: "regClose",
            })
          }
          logCard={() =>
            dispatch({
              type: "logShow",
            })
          }
        />
      ) : (
        <></>
      )}

      {/* nav content  */}
      <div className={cssModules.navContainer}>
        <img src={logo} alt="Logo" onClick={() => navigate("/")} />
        <div className={cssModules.btnWrapper}>
          <button
            className={cssModules.logBtn}
            id="login"
            onClick={() => dispatch({ type: "logShow" })}
          >
            Login
          </button>
          <button
            className={cssModules.regBtn}
            onClick={() => dispatch({ type: "regShow" })}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Nav;
