import React from "react";
import { NavLink } from "react-router-dom";
import Ticket from "../components/Ticket";

const Marketplace = () => {
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
                    <h1 className="tracking-widest text-[40px] text-center uppercase">Marketpl<i class="text-light-purple -ml-2 -mr-2 fi fi-brands-ethereum"></i>ce</h1>
                    <div className="title"></div>
                    <br />
                    <div className="w-full flex flex-col justify-center gap-4">
                        {
                            tickets.map((ticket, index) => (
                                <Ticket key={index} ticket={ticket} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Marketplace;