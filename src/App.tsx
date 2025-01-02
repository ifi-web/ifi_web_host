import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Navbar from "@/components/Navbar";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import VerifyMail from "@/pages/VerifyMail";
import Profile from "./pages/Profile";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/verifymail" element={<VerifyMail />} /> */}
          <Route path="/verification/:email" element={<VerifyMail />} />
        </Routes>
      </Router>
    </>
  );
}
