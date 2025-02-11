import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import "./DisplayAudi.css"; 

const DisplayAudi = () => {
    const { screenId } = useParams();
    const [seatDict, setSeatDict] = useState({});
    const [selectedSeats, setSelectedSeats] = useState(new Set());

    useEffect(() => {
        fetch(`/screen/${screenId}/seats/`)
            .then((response) => response.json())
            .then((data) => setSeatDict(data))
            .catch((error) => console.error("Error fetching Auditorium Layout", error));
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
            <NavbarComponent />
            <main>
                <h1>Movie Reservation System</h1>
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
