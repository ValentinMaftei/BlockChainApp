import React from "react";
import { NavLink } from "react-router-dom";
import TicketSell from "../components/TicketSell";

const MyTickets = ({accountArrayTickets}) => {
    
    return (
        <div className="absolute w-full h-full pt-32 flex justify-center px-24 py-12">
            <div className="w-full">
                <div className="w-full">
                    <h1 className="tracking-widest text-[40px] text-center uppercase">My Tickets</h1>
                    <div className="title"></div>
                    <br />
                    <div className="w-full flex flex-col justify-center gap-4">
                        {
                            accountArrayTickets &&
                            accountArrayTickets.map((ticket, index) => (
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