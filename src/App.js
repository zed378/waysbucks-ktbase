// import package
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import assets
import "./assets/css/App.css";
import { UserContext } from "./context/UserContext";

// import pages
import {
  Cart,
  DetailProduct,
  LandingPage,
  Profile,
  Income,
  ProductAdd,
  ToppingAdd,
  Product,
  Topping,
  Users,
  PopUp,
  UserEdit,
  ProductEdit,
  ToppingEdit,
  ProfileEdit,
  Chat,
  ChatAdmin,
} from "./pages";

// import component
import { Nav, NavLogged, NavAdmin } from "./components/nav";
import PrivateRoute from "./context/PrivateRoute";

// impport config
import { API, setAuthToken } from "./config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      if (response.data.data.user.isAdmin === 0) {
        dispatch({
          type: "USER",
          payload,
        });
      } else if (response.data.data.user.isAdmin === 1) {
        dispatch({
          type: "ADMIN",
          payload,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Router>
        {state.isPop ? (
          <PopUp close={() => dispatch({ type: "popClose" })} />
        ) : (
          <></>
        )}

        {!state.isLogin ? (
          <Nav />
        ) : state.isLogin && state.isAdmin ? (
          <NavAdmin />
        ) : (
          <NavLogged />
        )}

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/cart" element={<Cart />} />
            <Route
              exact
              path="/detail-product/:id"
              element={<DetailProduct />}
            />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/customers" element={<Users />} />
            <Route exact path="/income" element={<Income />} />
            <Route exact path="/product" element={<Product />} />
            <Route exact path="/topping" element={<Topping />} />
            <Route exact path="/product-add" element={<ProductAdd />} />
            <Route exact path="/topping-add" element={<ToppingAdd />} />
            <Route exact path="/user-detil/:id" element={<UserEdit />} />
            <Route exact path="/product-edit/:id" element={<ProductEdit />} />
            <Route exact path="/topping-edit/:id" element={<ToppingEdit />} />
            <Route exact path="/profile-edit/:id" element={<ProfileEdit />} />
            <Route exact path="/profile-edit/:id" element={<ProfileEdit />} />
            <Route exact path="/chat" element={<Chat />} />
            <Route exact path="/chat-admin" element={<ChatAdmin />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
