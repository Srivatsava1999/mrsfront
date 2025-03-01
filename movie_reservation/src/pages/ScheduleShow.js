import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import ShowForm from "../components/ShowForm";
import "./ScheduleShow.css";


const ScheduleShow=()=>{
    

    return(
        <section className="app-container">
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