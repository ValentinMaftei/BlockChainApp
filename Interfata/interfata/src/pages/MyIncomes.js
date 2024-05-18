import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuctionBid from "../components/AuctionBid";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { setChanges } from "../features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { convertWeiToEther, getTotalValuePendingReturns, withdrawAll } from "../MyWeb3";

const MyIncomes = ({ totalMoney }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const account = useSelector(state => state.user.id);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const handleWithdrawAllIncomes = async () => {
        await withdrawAll(account);
        dispatch(setChanges());
    }

    return (
        <div className="absolute w-full h-full pt-32 flex justify-center px-24 py-12">
            <div className="w-full">
                <div className="w-full">
                    <h1 className="tracking-widest text-[40px] text-center uppercase">My Incomes</h1>
                    <div className="title"></div>
                    <div className="w-full flex justify-center px-[36rem] py-12">
                        <div className="w-full h-full bg-light-blue rounded-xl flex flex-col items-center justify-between p-8 gap-12 min-w-[700px]">
                            <div>
                                <h1 className="text-[30px] text-center">Total amount of money from closed auctions:</h1>
                                {
                                    totalMoney != null
                                    && <h1 className="text-[30px] text-center">{parseFloat(convertWeiToEther(totalMoney)).toFixed(5)} <i class="text-light-purple fi fi-brands-ethereum"></i></h1>
                                }
                            </div>
                            <img src="./money-bag.png" alt="Payment" className="w-48 h-48" />
                            <button onClick={handleWithdrawAllIncomes} disabled={totalMoney > 0 ? false : true} style={{opacity: totalMoney > 0 ? '100%' : '50%'}} type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:opacity-[0.8] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-12 py-3 text-center me-2 mb-2 flex items-center text-[20px] gap-4">
                                WITHDRAW ALL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyIncomes;