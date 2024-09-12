import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import ContactWrapper from "./Components/Contacts/ContactWrapper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";

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
    <div className="w-[1280px]">
      <Router>
        <Navbar />
        <ContactWrapper handleToast={handleToast} />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
