// import package
import { useNavigate } from "react-router-dom";

// import assets
import cssModules from "../../assets/css/Users.module.css";

function UserCard({ item }) {
  const navigate = useNavigate();

  return (
    <>
      <div className={cssModules.userCard}>
        <div className={cssModules.imgContainer}>
          <img src={item.photo} alt="Profile" />
        </div>

        <p>{item.name}</p>

        <button onClick={() => navigate(`/user-detil/${item.id}`)}>
          See Detail
        </button>
      </div>
    </>
  );
}

export default UserCard;
