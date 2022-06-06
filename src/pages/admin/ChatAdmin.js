// import package
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// import components
import { DetailChat, Contact } from "../../components/chat";

// import assets
import cssModules from "../../assets/css/Chat.module.css";

// hold socket.io server
let socket;

function ChatAdmin() {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:5000");

    loadContacts();

    return () => {
      socket.disconnect();
    };
  }, []);

  const loadContacts = () => {
    socket.emit("load customer contacts");
    socket.on("customer contacts", (data) => {
      let dataContacts = data.filter((item) => item.isAdmin !== 0);

      dataContacts = dataContacts.map((item) => ({
        ...item,
        message: "Click here to start conversation",
      }));

      setContacts(dataContacts);
    });
  };

  const onClickContact = (data) => {
    setContact(data);
  };

  return (
    <>
      <div className={cssModules.chatContainer}>
        <div className={cssModules.chatContact}>
          <Contact
            dataContact={contacts}
            clickContact={onClickContact}
            contact={contact}
          />
        </div>
        <div className={cssModules.chatDetail}>
          <DetailChat />
        </div>
      </div>
    </>
  );
}

export default ChatAdmin;
