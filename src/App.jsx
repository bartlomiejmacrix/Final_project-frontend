import "./App.css";
import Navbar from "./Navbar/Navbar";
import ContactWrapper from "./Contacts/ContactWrapper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const handleToast = (message) => {
    toast(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
      <Navbar />
      <ContactWrapper handleToast={handleToast} />
      <ToastContainer />
    </>
  );
}

export default App;
