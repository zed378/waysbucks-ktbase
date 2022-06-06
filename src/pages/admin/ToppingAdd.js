// import package
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import assets
import cssModules from "../../assets/css/ToppingAdd.module.css";
import clip from "../../assets/img/clip.svg";

// import config
import { API } from "../../config/api";

function ToppingAdd() {
  const navigate = useNavigate();
  const pic = () => {
    document.getElementById("pic").click();
  };

  // alert
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  // store data
  const [form, setForm] = useState({
    title: "",
    price: "",
    thumbnail: "",
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
      formData.set("title", form.title);
      formData.set("price", form.price);
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);

      const response = await API.post("/topping", formData, config);

      if (response.data.status === "Success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/topping");
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
      }, 3000);
    }
  };

  return (
    <>
      <div className={cssModules.bodyTopping}>
        <div className={cssModules.formContainer}>
          <h1>Add Topping</h1>

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
              Add Topping Success
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
              Add Topping Failed
            </h3>
          ) : (
            <></>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Topping Name"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="thumbnail"
              id="pic"
              placeholder="Photo Topping"
              hidden
              onChange={handleChange}
            />
            <div className={cssModules.addPic} onClick={pic}>
              <p>Topping Photo</p>
              <img src={clip} alt="Clip" />
            </div>
            <br />
            <button type="submit">Add Topping</button>
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

export default ToppingAdd;
