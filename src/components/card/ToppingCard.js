// import package
import toRupiah from "@develoka/angka-rupiah-js";

// import assets
import cssModules from "../../assets/css/DetailProduct.module.css";

function ToppingCard({ item, check }) {
  return (
    <div className={cssModules.toppingMenu} onClick={check} key={item.id}>
      {item.isClick === 1 ? (
        <img src={check} alt="isChecked" className={cssModules.isChecked} />
      ) : (
        <></>
      )}
      <img src={item.thumbnail} alt="Bubble Tea Gelatin" />
      <div>
        <p>{item.title}</p>
        <p>{toRupiah(item.price, { formal: false, floatingPoint: 0 })}</p>
      </div>
    </div>
  );
}

export default ToppingCard;
