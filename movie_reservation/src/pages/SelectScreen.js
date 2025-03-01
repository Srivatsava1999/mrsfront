import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import DisplayScreenComponent from "../components/DisplayScreenComponent";
import "./SelectScreen.css";

const SelectScreen=()=>{
  const user=JSON.parse(localStorage.getItem("user"));
  const GETrequestBody={
    refresh: user.refresh,
};
  const {theatreId}=useParams()
  const [screens,setScreens]=useState([]);
  const [selectedScreen, setSelectedScreen]=useState("")

  useEffect(() => {
      fetch(`http://127.0.0.1:8000/theatre/${theatreId}/screen/`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${user.access}`
        },body: JSON.stringify(GETrequestBody),
    }).then(response => response.json()).then(data=>{
      const {new_access_token, ...screenData}=data;
      setScreens(screenData);
      if (data.new_access_token){
        user.access=new_access_token;
        localStorage.setItem("user", JSON.stringify(user));
    }
    }).catch(error=>console.error("Error fetching screens", error));
    }, []);
  return (
      <section className="app-container">
        <EnterpriseNavbarComponent/>
        <main>
          <h1>Movie Reservation System</h1>
          <h2>Select Screen</h2>
          <DropdownComponent
          options={screens}
          labelKey="screenNum"
          valueKey="screenId"
          onChange={(value) => setSelectedScreen(value)}
          />
          {selectedScreen &&(
            <DisplayScreenComponent screenId={selectedScreen} theatreId={theatreId}/>
          )}
      </main>
    </section>
  );
}

export default SelectScreen