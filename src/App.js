import { Routes, Route } from "react-router-dom";
import React,{useState,useEffect} from 'react';

import './App.css';
import MainMenu from "./components/MainMenu";
import HomePage from "./components/HomePage";
import DevicesPage from "./components/DevicesPage";
import ScheduleBuild from "./components/ScheduleBuild";
import AddDevices from "./components/AddDevices";

import SignUp from "./components/SignUp";
import Login from "./components/LogIn";
import Footer from "./components/Footer";
function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const handleAuthenticated = (isAuthenticated) => {setAuthenticated(isAuthenticated)}

  return (
 <div>
  
 <MainMenu  authenticated={authenticated}
        handleAuthenticated={setAuthenticated}/>
 <Routes>
        <Route path = "/" element={<HomePage/>}/>

        <Route path = "/devices" element={<DevicesPage/> } authenticated={authenticated} 
   />
  <Route path = "/login" element={<Login  authenticated={authenticated} 
            handleAuthenticated={setAuthenticated} />}/>
   <Route path = "/signup" element={<SignUp/> } authenticated={authenticated} />
        <Route path = "/createSchedule" element={<ScheduleBuild/>} />
        <Route path = "/createSchedule/addDevices"
          element={<AddDevices backTo={'/createSchedule'}/>}
        />

</Routes>
<Footer/>


 </div>
 
  );
}

export default App;
