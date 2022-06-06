// import package
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import assets
import cssModules from "../../../assets/css/ToppingAdd.module.css";
import clip from "../../../assets/img/clip.svg";

// import config
import { API } from "../../../config/api";

function ToppingEdit() {
  const { id } = useParams();

  const [topping, setTopping] = useState([]);

  const getProduct = async () => {
    try {
      const response = await API.get(`/topping/${id}`);

      setPreview(response.data.data.thumbnail);
      setForm({
        ...form,
        title: response.data.data.title,
        price: response.data.data.price,
      });

      setTopping(response.data.data);
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

      const response = await API.patch(
        "/topping/" + topping.id,
        formData,
        config
      );

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
      }, 4000);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className={cssModules.bodyTopping}>
        <div className={cssModules.formContainer}>
          <h1>Edit Topping</h1>

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
              Edit Topping Success
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
              Edit Topping Failed
            </h3>
          ) : (
            <></>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Topping Name"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              id="pic"
              name="thumbnail"
              placeholder="Photo Topping"
              hidden
              onChange={handleChange}
            />
            <div className={cssModules.addPic} onClick={pic}>
              <p>Topping Photo</p>
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

export default ToppingEdit;
