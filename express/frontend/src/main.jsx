import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Home from './Home';
import SignUp from './API/SignUp';
import LogIn from './API/LogIn';
import StudentCreate from './API/StudentCreate';
import StudentDetails from './API/StudentDetails';
import Navbar from './Components/Navbar';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" Component={LogIn} />
        <Route exact path="/signup" Component={SignUp} />
        <Route exact path="/" Component={Home} />
        <Route exact path="/student/add" Component={StudentCreate} />
        <Route exact path="/student/:nrp" Component={StudentDetails} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <App />
  </StrictMode>,
)
