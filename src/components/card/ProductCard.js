// import package
import toRupiah from "@develoka/angka-rupiah-js";
import { Link } from "react-router-dom";

// import assets
import cssModules from "../../assets/css/Product.module.css";

function ProductCard({ item, click }) {
  return (
    <>
      <Link
        to={`/detail-product/` + item.id}
        style={{ textDecoration: "none" }}
        onClick={click}
        className={cssModules.productCard}
      >
        <div className={cssModules.productImg}>
          <img src={item.thumbnail} alt={item.thumbnail} />
        </div>
        <div className={cssModules.productDesc}>
          <h3>{item.title}</h3>
          <p>
            {toRupiah(item.price, {
              formal: false,
              floatingPoint: 0,
            })}
          </p>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;
