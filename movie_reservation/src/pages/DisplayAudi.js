import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./DisplayAudi.css"; 

const DisplayAudi = () => {
    const user=JSON.parse(localStorage.getItem("user"));
    const { screenId } = useParams();
    const [seatDict, setSeatDict] = useState({});
    const [selectedSeats, setSelectedSeats] = useState(new Set());

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_API_URL}/screen/${screenId}/seats/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${user.access}`,
                "X-Refresh-Token": user.refresh,
                "X-User-Id": user.user_id
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const {new_access_token, ...seatData}=data;
                setSeatDict(seatData.seat_layout);
                if (data.new_access_token){
                    user.access=new_access_token;
                    localStorage.setItem("user", JSON.stringify(user));
                }
            }).catch((error) => console.error("Error fetching Auditorium Layout", error));
    }, [screenId]);

    const toggleSeatSelection = (seat) => {
        setSelectedSeats((prevSelected) => {
            const newSelection = new Set(prevSelected);
            newSelection.has(seat) ? newSelection.delete(seat) : newSelection.add(seat);
            return newSelection;
        });
    };

    return (
        <section className="app-container">
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
            <EnterpriseNavbarComponent />
            <main>
                <section className="seatlayoutcard">
                    <section className="screen"></section>
                    <section className="seatmap">
                        {Object.keys(seatDict).reverse().map((row) => (
                            <div className="row" key={row}>
                                {seatDict[row].map((seat) => {
                                    const seatId = `${row}${seat}`;
                                    return (
                                        <div
                                            key={seatId}
                                            className={`seat ${selectedSeats.has(seatId) ? "selected" : ""}`}
                                            onClick={() => toggleSeatSelection(seatId)}
                                        >
                                            {seatId}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </section>
                </section>
            </main>
        </section>
    );
};

export default DisplayAudi;