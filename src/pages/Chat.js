// import package
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// import components
import { DetailChat, Contact } from "../components/chat";

// import assets
import cssModules from "../assets/css/Chat.module.css";

// hold socket.io server
let socket;

function Chat() {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  const loadContact = () => {
    socket.emit("load admin contact");
    socket.on("admin contact", (item) => {
      let dataContacts = dataContacts.map((item) => ({
        ...item,
        message: "Click here to start conversation",
      }));

      setContacts(dataContacts);
    });
  };

  const onClickContact = (data) => {
    setContact(data);
  };

  useEffect(() => {
    socket = io("http://localhost:5000");

    loadContact();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className={cssModules.chatContainer}>
        <div className={cssModules.chatContact}>
          <Contact
            dataContact={contact}
            clickContact={onClickContact}
            contact={contacts}
          />
        </div>
        <div className={cssModules.chatDetail}>
          <DetailChat />
        </div>
      </div>
    </>
  );
}

export default Chat;
