import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import ShowForm from "../components/ShowForm";
import "./ScheduleShow.css";


const ScheduleShow=()=>{
    

    return(
        <section className="app-container">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
        <EnterpriseNavbarComponent/>
        <main>
          <ShowForm />
      </main>
    </section>
    );
}

export default ScheduleShow