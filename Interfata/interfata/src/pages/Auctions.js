import React from "react";
import TicketAuction from "../components/TicketAuction";

const Auctions = ({ auctions }) => {
    return (
        <div className="absolute w-full h-full pt-32 flex justify-center px-24 py-12">
            <div className="w-full">
                <div className="w-full">
                    <h1 className="tracking-widest text-[40px] text-center uppercase">Auctions</h1>
                    <div className="title"></div>
                    <br />
                    <div className="w-full flex flex-col justify-center gap-4">
                        {
                            auctions &&
                            auctions.length > 0 &&
                            auctions.map((auction, index) => (
                                <TicketAuction key={index} auction={auction} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auctions;