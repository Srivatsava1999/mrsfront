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
          <h1>Movie Reservation System</h1>
          <h2>Schedule Show</h2>
          <ShowForm />
      </main>
    </section>
    );
}

export default ScheduleShow