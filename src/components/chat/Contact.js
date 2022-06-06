// import assets
import cssModules from "../../assets/css/Chat.module.css";

function Contact({ dataContact, clickContact, contact }) {
  return (
    <>
      {dataContact.length > 0 ? (
        <>
          {dataContact.map((item) => (
            <div
              className={cssModules.contactUser}
              key={item.id}
              onClick={() => {
                clickContact(item);
              }}
              style={{
                background: contact?.id === item?.id && "rgb(252, 206, 206)",
              }}
            >
              <div className={cssModules.profileWrapper}>
                <img src={item.user.photo} alt={item.user.photo} />
              </div>
              <div className={cssModules.dataUser}>
                <p>{item.user.name}</p>
                <p>{item.message}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Contact;
