import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { setChanges } from "../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { convertEtherToWei, getAuctionByTicketId, endAuction } from "../MyWeb3";

const TicketSell = ({ ticket, placeTicketForSale, revokeTicketForSale, startAuction }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [auctionIsOpen, setAuctionIsOpen] = useState(false);
    const [price, setPrice] = useState(null);
    const [isInAuction, setIsInAuction] = useState(false);
    const changes = useSelector(state => state.user.changes);
    const formRef = useRef();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const toggleAuctionPopup = () => {
        setAuctionIsOpen(!auctionIsOpen);
    }

    const { register, handleSubmit } = useForm();
    const { register: auctionRegister, handleSubmit: auctionHandleSubmit } = useForm();

    const onSubmit = async (data) => {
        await placeTicketForSale(ticket.id, data.price);
        dispatch(setChanges());
        togglePopup();
    }

    const onSubmitAuction = async (data) => {
        await startAuction(ticket.id, convertEtherToWei(data.startingPrice));
        dispatch(setChanges());
        toggleAuctionPopup();
    }

    const getInfoTicket = async () => {
        setIsInAuction(await getAuctionByTicketId(ticket.id));
    }


    useEffect(() => {
        getInfoTicket();
    }, [changes]);

    return (

        <div className="w-full flex flex-col items-center rounded-lg shadow md:flex-row dark:border-dark-blue dark:bg-darkest-blue/[0.5] px-8 py-4 gap-8">
            <img className="object-cover w-36" src="/ticket.png" alt="ticket" />
            <div className="w-full flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ticket.name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ticket.description}</p>
            </div>
            <div className="flex-col flex h-full gap-2 min-w-fit">
                {
                    !ticket.forSale &&
                    (
                        isInAuction
                            ? <button type="button" onClick={async () => { await endAuction(ticket.id); dispatch(setChanges())}} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">CLOSE AUCTION</button>
                            : <button type="button" onClick={toggleAuctionPopup} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">INITIATE ACTION</button>

                    )
                }
                {
                    !isInAuction && (
                        ticket.forSale
                            ? <button type="button" onClick={async () => { await revokeTicketForSale(ticket.id); dispatch(setChanges()) }} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">WITHDRAW FROM MARKETPLACE</button>
                            : <button type="button" onClick={togglePopup} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">SELL</button>
                    )
                }
            </div>
            {
                isOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/20 backdrop-blur-[9.3px]">
                            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center">
                                <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-dark-blue">
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Sell your ticket on marketplace
                                            </h3>
                                            <button onClick={togglePopup} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div className="px-4 pt-4 flex flex-row gap-3">
                                            <p className="text-gray-900 dark:text-white">Name:</p>
                                            <p className="text-gray-900 dark:text-white">{ticket.name}</p>
                                        </div>
                                        <div className="px-4 flex flex-row gap-3">
                                            <p className="text-gray-900 dark:text-white">Description:</p>
                                            <p className="text-gray-900 dark:text-white">{ticket.description}</p>
                                        </div>
                                        <div className="p-4 md:p-5">
                                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                                <div>
                                                    <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price at which you want to sell your ticket.</label>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        id="price"
                                                        min="0.00001"
                                                        step="0.00001"
                                                        placeholder="e.g. 0.1 ETH"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-600 dark:text-black"
                                                        required
                                                        {...register("price")} />
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
            {
                auctionIsOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/20 backdrop-blur-[9.3px]">
                            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center">
                                <div className="relative p-4 w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-dark-blue">
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                Start an auction
                                            </h3>
                                            <button onClick={toggleAuctionPopup} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div className="px-4 pt-4 flex flex-row gap-3">
                                            <p className="text-gray-900 dark:text-white">Name:</p>
                                            <p className="text-gray-900 dark:text-white">{ticket.name}</p>
                                        </div>
                                        <div className="px-4 flex flex-row gap-3">
                                            <p className="text-gray-900 dark:text-white">Description:</p>
                                            <p className="text-gray-900 dark:text-white">{ticket.description}</p>
                                        </div>
                                        <div className="p-4 md:p-5">
                                            <form className="space-y-4" onSubmit={auctionHandleSubmit(onSubmitAuction)}>
                                                <div>
                                                    <label for="startingPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">The initial price at which you want to start the auction.</label>                                                    <input
                                                        type="number"
                                                        name="startingPrice"
                                                        id="startingPrice"
                                                        min="0.00001"
                                                        step="0.00001"
                                                        placeholder="e.g. 0.1 ETH"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-600 dark:text-black"
                                                        required
                                                        {...auctionRegister("startingPrice")} />
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
    );
}

export default TicketSell;