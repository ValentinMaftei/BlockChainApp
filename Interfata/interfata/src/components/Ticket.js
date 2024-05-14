import React from "react";
import { convertWeiToEther } from "../MyWeb3";
import { useDispatch } from "react-redux";
import { setChanges } from "../features/UserSlice";

const Ticket = ({ ticket, buyTicket }) => {
    const dispatch = useDispatch();
    return (

        <div class="w-full flex flex-col items-center rounded-lg shadow md:flex-row dark:border-dark-blue dark:bg-darkest-blue/[0.5] px-8 py-4 gap-8">
            <img class="object-cover w-36" src="/ticket.png" alt="ticket" />
            <div class="w-full flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ticket.name}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{ticket.description}</p>
            </div>
            <div className="flex-col flex h-full gap-2 min-w-fit">
            <span class="text-3xl font-bold text-gray-900 dark:text-white flex items-center">{convertWeiToEther(ticket.price)}<i class="text-light-purple fi fi-brands-ethereum"></i></span>
            <button type="button" onClick={async () => {await buyTicket(ticket.id, ticket.price); dispatch(setChanges())}} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">BUY</button>
            </div>
        </div>

    );
}

export default Ticket;