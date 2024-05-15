import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ balance, account }) => {
    return (
        <nav className="z-[100] absolute h-20 w-screen bg-white border-gray-200 dark:bg-darkest-blue/[0.5]">
            <div className="flex flex-wrap items-center justify-between mx-auto px-8 py-5">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <i className="text-light-purple text-[30px] flex justify-center items-center fi fi-brands-ethereum"></i>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tickets<span className="text-light-purple">ETH</span></span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="flex flex-row items-center gap-6" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li><NavLink to="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Home</NavLink></li>
                        {
                            account &&
                            <li><NavLink to="/marketplace" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Marketplace</NavLink></li>
                        }
                        {
                            account &&
                            <li><NavLink to="/auctions" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Auctions</NavLink></li>
                        }
                        {
                            account &&
                            <li><NavLink to="/my-tickets" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">My Tickets</NavLink></li>
                        }
                        {
                            account &&
                            <li><NavLink to="/my-incomes" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">My Incomes</NavLink></li>
                        }
                    </ul>
                    {
                        balance &&
                        <p className="font-medium bg-dark-purple rounded-lg py-2 px-4 text-gray-500 flex gap-2 dark:text-gray-300 mt-4 md:mt-0"><img src="./ethereum.png" className="w-6 h-6"></img>Balance: <span className="text-gray-700 dark:text-gray-100">{balance} ETH</span></p>
                    }
                </div>
            </div>
        </nav>

    );
}

export default Sidebar;