import React from "react";
import { NavLink } from "react-router-dom";
import AuctionBid from "../components/AuctionBid";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { setChanges } from "../features/UserSlice";
import { useDispatch } from "react-redux";

const MyBids = ({ auctionBids }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit } = useForm();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className="absolute w-full h-full pt-32 flex justify-center px-24 py-12">
            <div className="w-full">
                <div className="w-full">
                    <h1 className="tracking-widest text-[40px] text-center uppercase">My Tickets</h1>
                    <div className="title"></div>
                    <br />
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        {
                            auctionBids && auctionBids.length > 0 &&
                            auctionBids.map((bid, index) => (
                                <AuctionBid key={index} ticket={bid} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyBids;