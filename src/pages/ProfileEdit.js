// import package
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import assets
import cssModules from "../assets/css/ToppingAdd.module.css";
import clip from "../assets/img/clip.svg";

// import config
import { API } from "../config/api";

function ProfileEdit() {
  const { id } = useParams();

  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const response = await API.get(`/user/${id}`);

      setPreview(response.data.data.photo);
      setForm({
        name: response.data.data.name,
      });

      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const pic = () => {
    document.getElementById("pic").click();
  };

  // alert
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  // store data
  const [form, setForm] = useState({
    name: "",
    photo: "",
  });

  // set preview image
  const [preview, setPreview] = useState(null);

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
      formData.set("photo", form.photo[0], form.photo[0].name);

      const response = await API.patch("/user/" + user.id, formData, config);

      if (response.data.status === "Success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
          document.location.reload(true);
        }, 1500);
      } else if (response.data.status === "Failed") {
        setFail(true);
        setTimeout(() => {
          setFail(false);
        }, 3000);
      }
    } catch (error) {
      setFail(true);
      setTimeout(() => {
        setFail(false);
      }, 4000);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className={cssModules.bodyTopping}>
        <div className={cssModules.formContainer}>
          <h1>Edit User</h1>

          {success ? (
            <h3
              style={{
                color: "green",
                background: "#c5fce5",
                textAlign: "center",
                padding: "0.5rem 0",
                fontSize: "1.15rem",
                fontFamily: "avenirs",
              }}
            >
              Edit User Success
            </h3>
          ) : (
            <></>
          )}

          {fail ? (
            <h3
              style={{
                color: "red",
                background: "#e0cecc",
                textAlign: "center",
                padding: "0.5rem 0",
                fontSize: "1.15rem",
                fontFamily: "avenirs",
              }}
            >
              Edit User Failed
            </h3>
          ) : (
            <></>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="User Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              id="pic"
              name="photo"
              placeholder="User Photo"
              hidden
              onChange={handleChange}
            />
            <div className={cssModules.addPic} onClick={pic}>
              <p>User Photo</p>
              <img src={clip} alt="Clip" />
            </div>
            <br />
            <button type="submit">Save</button>
          </form>
        </div>
        <div className={cssModules.imgPreview}>
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
      </div>
    </>
  );
}

export default ProfileEdit;
