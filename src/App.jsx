import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./components/Pagination";
import Login from "./components/Login";
import Listing from "./components/Listing";
import Quote from "./components/Quote";
import QuoteCreationPage from "./components/QuoteCreationPage";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route
            path="/listing"
            element={token ? <Listing token={token} /> : <Login />}
          />
          <Route
            path="/create-quote"
            element={token ? <QuoteCreationPage token={token} /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
