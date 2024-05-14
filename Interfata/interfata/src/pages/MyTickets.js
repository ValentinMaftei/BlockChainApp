import React from "react";
import { NavLink } from "react-router-dom";
import TicketSell from "../components/TicketSell";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { setChanges } from "../features/UserSlice";
import { useDispatch } from "react-redux";

const MyTickets = ({ accountArrayTickets, createTicket, placeTicketForSale, revokeTicketForSale }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const onSubmit = async (data) => {
        await createTicket(data.name, data.description);
        togglePopup();
        dispatch(setChanges());
    }

    return (
        <div className="absolute w-full h-full pt-32 flex justify-center px-24 py-12">
            <div className="w-full">
                <div className="w-full">
                    <h1 className="tracking-widest text-[40px] text-center uppercase">My Tickets</h1>
                    <div className="title"></div>
                    <br />
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <button type="button" onClick={togglePopup} class="w-[25%] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">ADD TICKET</button>
                        {
                            console.log(accountArrayTickets)
                        }
                        {
                            accountArrayTickets && accountArrayTickets.length > 0 &&
                            accountArrayTickets.map((ticket, index) => (
                                <TicketSell key={index} ticket={ticket} placeTicketForSale={placeTicketForSale} revokeTicketForSale={revokeTicketForSale} />
                            ))
                        }
                        {
                            isOpen && (
                                <>
                                    <div className="fixed inset-0 bg-black/20 backdrop-blur-[9.3px]">
                                        <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center">
                                            <div className="relative p-4 w-full max-w-md max-h-full">
                                                <div className="relative bg-white rounded-lg shadow dark:bg-dark-blue">
                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                            Add ticket
                                                        </h3>
                                                        <button onClick={togglePopup} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                            </svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                    </div>
                                                    <div className="p-4 md:p-5">
                                                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                                        <div>
                                                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    id="name"
                                                                    placeholder="e.g. Maneskin"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-600 dark:text-black"
                                                                    required
                                                                    {...register("name")} />
                                                            </div>
                                                            <div>
                                                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                                <input
                                                                    type="text"
                                                                    name="description"
                                                                    id="description"
                                                                    placeholder="e.g. Concert Arenele Romane"
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-600 dark:text-black"
                                                                    required
                                                                    {...register("description")} />
                                                            </div>
                                                            <button type="submit" class="text-white bg-gradient-to-br w-full from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">ADD</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyTickets;