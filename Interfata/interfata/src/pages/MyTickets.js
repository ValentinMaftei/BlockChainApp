import React from "react";
import { NavLink } from "react-router-dom";
import TicketSell from "../components/TicketSell";

const MyTickets = () => {
    const tickets = [
        {
            name: "Ticket 1",
            description: "Description 1",
            price: "1",
            purchased: false
        },
        {
            name: "Ticket 2",
            description: "Description 2",
            price: "2",
            purchased: false
        },
        {
            name: "Ticket 3",
            description: "Description 3",
            price: "3",
            purchased: false
        }
    ]
    return (
        <div className="absolute w-full h-full pt-32 flex justify-center px-24 py-12">
            <div className="w-full">
                <div className="w-full">
                    <h1 className="tracking-widest text-[40px] text-center uppercase">My Tickets</h1>
                    <div className="title"></div>
                    <br />
                    <div className="w-full flex flex-col justify-center gap-4">
                        {
                            tickets.map((ticket, index) => (
                                <TicketSell key={index} ticket={ticket} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyTickets;