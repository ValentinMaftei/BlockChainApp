import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { setChanges } from "../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTicket } from "../MyWeb3";

const TicketAuction = ({ auction }) => {
    const dispatch = useDispatch();

    const account = useSelector(state => state.user.id);

    const [isOpen, setIsOpen] = useState(false);
    const [price, setPrice] = useState(null);
    const [ticket, setTicket] = useState(null);

    const formRef = useRef();
    const bids = [
        {
            price: 0.1,
            bidder: "0x1234...5678"
        }
    ]

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    }

    const getInfoTicket = async () => {
        setTicket(await getTicket(auction.ticketId));
    }

    useEffect(() => {
        getInfoTicket();
    }, []);

    return (
        ticket &&
        <div className="w-full flex flex-col items-center rounded-lg shadow md:flex-row dark:border-dark-blue dark:bg-darkest-blue/[0.5] px-8 py-4 gap-8">
            <img className="object-cover w-36" src="/ticket.png" alt="ticket" />
            <div className="w-full flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ticket.name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ticket.description}</p>
            </div>
            <div className="flex-col flex h-full gap-2 min-w-fit">
                <button type="button" onClick={togglePopup} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">VIEW AUCTION</button>
            </div>
            {
                isOpen && (
                    <>
                        <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="bg-black/20 backdrop-blur-[9.3px] overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-[101] flex w-full h-full justify-center items-center">
                            <div className="relative px-96 py-24 w-full h-full flex items-center justify-center">
                                <div className="overflow-y-hidden w-full h-full relative bg-white rounded-lg shadow dark:bg-dark-blue">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
                                            Auction
                                        </h3>
                                        <button onClick={togglePopup} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="w-full h-full p-4">
                                        <div className="w-full flex flex-col items-center rounded-lg shadow md:flex-row dark:border-dark-blue dark:bg-darkest-blue/[0.5] px-8 py-4 gap-8">
                                            <img className="object-cover w-36" src="/ticket.png" alt="ticket" />
                                            <div className="w-full flex flex-col justify-between p-4 leading-normal">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ticket.name}</h5>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{ticket.description}</p>
                                            </div>
                                            {
                                                auction.highestBidder !== account
                                                    ? <form className="w-[40%] space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                                        <div>
                                                            <label for="price" className="block mb-2 font-medium text-gray-900 dark:text-white">Enter bid value</label>
                                                            <input
                                                                type="number"
                                                                name="price"
                                                                id="price"
                                                                min="0.1"
                                                                placeholder="e.g. 0.1 ETH"
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-600 dark:text-black"
                                                                required
                                                                {...register("price")} />
                                                        </div>
                                                        <button type="submit" class="text-white bg-gradient-to-br w-full from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">PLACE BID</button>
                                                    </form>
                                                    : <button class="w-[40%] text-white bg-gradient-to-br w-full from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center">WITHDRAW</button>
                                            }
                                        </div>
                                        <br />
                                        <div className="w-full overflow-y-auto">
                                            {
                                                bids.map((bid, index) => (
                                                    <div key={index} className="w-full flex flex-row justify-between p-4 border-b dark:border-gray-600 last:border-none">
                                                        <div className="w-full flex items-center justify-between">
                                                            <div className="h-full flex flex-col justify-center">
                                                                <span className="text-lg font-bold text-gray-900 dark:text-gray-400">Bidder: {bid.bidder}</span>
                                                                {
                                                                    bid.bidder === account && <span className="w-fit rounded py-1 px-2 bg-dark-purple/[0.75]">
                                                                        your bid
                                                                    </span>
                                                                }
                                                            </div>
                                                            <span className="text-2xl text-gray-700 dark:text-white">Value: {bid.price} ETH</span>
                                                        </div>
                                                    </div>
                                                ))
                                            }
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

export default TicketAuction;