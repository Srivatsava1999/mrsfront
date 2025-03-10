import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import DisplayScreenComponent from "../components/DisplayScreenComponent";
import "./SelectScreen.css";

const SelectScreen=()=>{
  const user=JSON.parse(localStorage.getItem("user"));
  const {theatreId}=useParams()
  const [screens,setScreens]=useState([]);
  const [selectedScreen, setSelectedScreen]=useState("")

  useEffect(() => {
      fetch(`${process.env.REACT_APP_BASE_API_URL}/theatre/${theatreId}/screen/`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${user.access}`,
            "X-Refresh-Token": user.refresh,
            "X-User-Id": user.user_id
        }
    }).then(response => response.json()).then(data=>{
      const {new_access_token, ...screenData}=data;
            const screenArray = Object.values(screenData);  
      setScreens(screenArray);
      if (data.new_access_token){
        user.access=new_access_token;
        localStorage.setItem("user", JSON.stringify(user));
    }
    }).catch(error=>console.error("Error fetching screens", error));
    }, []);
  return (
      <section className="app-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
        <EnterpriseNavbarComponent/>
        <main className="select-main">
          <section className="selection">
          <h2>Select Screen</h2>
          <DropdownComponent
          options={screens}
          labelKey="screenNum"
          valueKey="screenId"
          onChange={(value) => setSelectedScreen(value)}
          />
          </section>
          {selectedScreen &&(
            <DisplayScreenComponent screenId={selectedScreen} theatreId={theatreId}/>
          )}
      </main>
    </section>
  );
}

export default SelectScreen