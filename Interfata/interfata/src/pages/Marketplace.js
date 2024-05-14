import React from "react";
import { NavLink } from "react-router-dom";
import Ticket from "../components/Ticket";

const Marketplace = ({arrayTickets, buyTicket}) => {
    return (
        <div className="absolute w-full h-full pt-32 flex justify-center px-24 py-12">
            <div className="w-full">
                <div className="w-full">
                    <h1 className="tracking-widest text-[40px] text-center uppercase">Marketpl<i class="text-light-purple -ml-2 -mr-2 fi fi-brands-ethereum"></i>ce</h1>
                    <div className="title"></div>
                    <br />
                    <div className="w-full flex flex-col justify-center gap-4">
                        {
                            arrayTickets &&
                            arrayTickets.map((ticket, index) => (
                                ticket.forSale &&
                                <Ticket key={index} ticket={ticket} buyTicket={buyTicket} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Marketplace;