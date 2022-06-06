// import package
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dateFormat, { masks } from "dateformat";

// import assets
import cssModules from "../../../assets/css/UserEdit.module.css";

// import config
import { API } from "../../../config/api";

function UserEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [del, setDel] = useState(false);

  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const response = await API.get("/user/" + id);

      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const promote = async () => {
    try {
      await API.patch(`/promote/` + id);

      setModal(false);
      navigate("/customers");
    } catch (error) {
      console.log(error);
    }
  };

  const delUser = async () => {
    try {
      await API.delete(`/user/` + id);

      setDel(false);
      navigate("/customers");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {modal ? (
        <div className={cssModules.confirmModal}>
          <p>
            Are you sure promote {user.name} as <strong>Admin?</strong>
          </p>
          <div className={cssModules.actBtn}>
            <button className={cssModules.promoteBtn} onClick={promote}>
              Yes
            </button>
            <button
              className={cssModules.delBtn}
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {del ? (
        <div className={cssModules.confirmModal}>
          <p>
            Are you sure to delete <strong>{user.name}</strong>?
          </p>
          <div className={cssModules.actBtn}>
            <button className={cssModules.promoteBtn} onClick={delUser}>
              Yes
            </button>
            <button className={cssModules.delBtn} onClick={() => setDel(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className={cssModules.detilContainer}>
        <div className={cssModules.wrapper}>
          <div className={cssModules.img}>
            <img src={user.photo} alt="Photo" />
          </div>
          <div className={cssModules.desc}>
            <h2>Name</h2>
            <p>{user.name}</p>
            <h2>Email</h2>
            <p>{user.email}</p>
            <h2>Member since</h2>
            <p>{dateFormat(user.createdAt, "fullDate")}</p>
          </div>
        </div>
        <div className={cssModules.actBtn}>
          <button
            className={cssModules.promoteBtn}
            onClick={() => setModal(true)}
          >
            Promote
          </button>
          <button className={cssModules.delBtn} onClick={() => setDel(true)}>
            Delete
          </button>
        </div>
        <button onClick={() => navigate("/customers")}>Back</button>
      </div>
    </>
  );
}

export default UserEdit;
