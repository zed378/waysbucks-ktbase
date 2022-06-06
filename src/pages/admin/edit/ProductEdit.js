// import package
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import assets
import cssModules from "../../../assets/css/ProductAdd.module.css";
import clip from "../../../assets/img/clip.svg";

// import config
import { API } from "../../../config/api";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pic = () => {
    document.getElementById("pic").click();
  };

  // store data
  const [form, setForm] = useState({
    title: "",
    price: "",
    thumbnail: "",
  });

  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const response = await API.get(`/product/${id}`);

      setPreview(response.data.data.thumbnail);
      setForm({
        ...form,
        title: response.data.data.title,
        price: response.data.data.price,
      });

      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // alert
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

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
        "/product/" + product.id,
        formData,
        config
      );

      if (response.data.status === "Success") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/product");
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
      <div className={cssModules.bodyProduct}>
        <div className={cssModules.formContainer}>
          <h1>Edit Product</h1>

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
              Edit Product Success
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
              Edit Product Failed
            </h3>
          ) : (
            <></>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Product Name"
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
              placeholder="Photo Product"
              hidden
              onChange={handleChange}
            />
            <div className={cssModules.addPic} onClick={pic}>
              <p>Product Photo</p>
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

export default ProductEdit;
