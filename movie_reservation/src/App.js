import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useEffect } from 'react';
import AddMovie from './pages/addmovie';
import EnterpriseHomePage from './pages/EnterpriseHomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddTheatre from './pages/AddTheatre';
import SelectTheatrePage from './pages/SelectTheatrePage';
import AddScreen from './pages/AddScreen';
import SelectScreen from './pages/SelectScreen';
import DisplayAudi from './pages/DisplayAudi';
import ScheduleShow from './pages/ScheduleShow';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const manageTabs =()=>{
    let totalTabs;
    window.onload=()=>{
        let user=sessionStorage.getItem("user")
        if (user!==null){
            localStorage.setItem("user",user);
        }
        if (localStorage.getItem("count")===null){
            totalTabs=0;
        }else{
            totalTabs=parseInt(localStorage.getItem("count"));
        }
        totalTabs++;
        localStorage.setItem("count",""+totalTabs);
    }
    window.onbeforeunload=()=>{
        if(localStorage.getItem("count")===null){
            totalTabs=1;
        }else{
            totalTabs=localStorage.getItem("count");
        }
        totalTabs--;
        localStorage.setItem("count",""+totalTabs);
        if (totalTabs<1){
            let user=localStorage.getItem("user");
            if (user!==null){
                sessionStorage.setItem("user",user);
            }
            localStorage.removeItem("user");
        }
    }
  }
  useEffect(()=>{
    manageTabs();
  },[]);
  
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path='/login/' element={<LoginPage/>}></Route>
          <Route path='/register/' element={<RegisterPage/>}></Route>
          
          {/* Enterprise Routes */}
          <Route path="/enterprise/" element={<EnterpriseHomePage/>}></Route>
          <Route path="/enterprise/add-movie/" element={<AddMovie />} />
          <Route path="/enterprise/add-theatre/" element={<AddTheatre />} />
          <Route path='/theatre/' element={<SelectTheatrePage/>}></Route>
          <Route path='/theatre/:theatreId/screen/' element={<AddScreen/>}></Route>
          <Route path='/select-screen/:theatreId/screen/' element={<SelectScreen/>}></Route>
          <Route path='/screen/:screenId/seats/' element={<DisplayAudi/>}></Route>
          <Route path='/scheduleshow/' element={<ScheduleShow/>}></Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
