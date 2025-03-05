import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import "./PublicAudi.css"; 

const PublicAudi = () => {
    const { screenId } = useParams();
    const [seatDict, setSeatDict] = useState({});
    const [selectedSeats, setSelectedSeats] = useState(new Set());

    useEffect(() => {
        console.log(screenId)
        fetch(`${process.env.REACT_APP_BASE_API_URL}/show/${screenId}/seats/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSeatDict(data.seat_layout);
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
            <NavbarComponent />
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

export default PublicAudi;