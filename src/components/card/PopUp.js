// import assets
import cssModules from "../../assets/css/PopUp.module.css";

function PopUp(props) {
  const { close } = props;
  return (
    <>
      <div className={cssModules.clickArea} onClick={close}></div>
      <div className={cssModules.popMessage}>
        <p>Thank you for ordering in us, please wait us to verify you order.</p>
      </div>
    </>
  );
}

export default PopUp;
