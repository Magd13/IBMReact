
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from './Components/Landing_Page/LandingPage';
import SignUp from './Components/Sign_Up/SignUp';
import Login from './Components/Login/Login';
import InstantConsultation from "./Components/InstantConsultation/InstantConsultation";
import BookingConsultation from "./Components/BookingConsultation";
import Notification from "./Components/Notification/Notification"
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileForm from "./Components/ProfileCard/ProfileCard";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Notification>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/instant-consultation" element={<InstantConsultation />} />
                <Route path="/booking"              element={<BookingConsultation />} /> 
                <Route path="/reviews" element={<ReviewForm/>}/>
                <Route path="/reports" element={<ReportsLayout/>}/>
                <Route path="/profile" element={<ProfileForm/>}/>
            </Routes>
          </Notification>
        </BrowserRouter>
    </div>
  );
}
export default App;