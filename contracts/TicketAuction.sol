pragma solidity ^0.5.0;

import "./Ticket.sol";
import "./Withdrawable.sol";

contract TicketAuction is Withdrawable {
    Ticket public ticketContract;

    uint public auctionCount = 0;

    // Auction details
    struct Auction {
        uint id;
        uint startPrice;
        uint highestBid;
        address payable highestBidder;
        uint ticketId;
        bool active;
        uint deadline; // Deadline as a UNIX timestamp
    }

    mapping(uint => Auction) public auctions;

    constructor(address _ticketContractAddress) public {
        ticketContract = Ticket(_ticketContractAddress);
    }

    modifier isAuctionActive(uint _id) {
        require(auctions[_id].active, "Auction is not active");
        _;
    }

    modifier isBidHighEnough(uint _id) {
        require(msg.value > auctions[_id].highestBid, "Bid is not high enough");
        _;
    }

    event AuctionStarted(
        uint auctionId,
        uint ticketId,
        uint startPrice,
        uint duration
    );

    function startAuction(
        uint _ticketId,
        uint _startPrice,
        uint _duration
    ) public {
        // Start the auction
        auctionCount++;
        auctions[auctionCount] = Auction(
            auctionCount,
            _startPrice,
            _startPrice, // Highest bid is the start price
            address(0),
            _ticketId,
            true,
            _duration
        );
        emit AuctionStarted(auctionCount, _ticketId, _startPrice, _duration);
    }

    event BidPlaced(uint ticketId, address bidder, uint amount);

    event AuctionEnded(uint ticketId, address winner, uint amount);

    function bid(
        uint _ticketId
    )
        public
        payable
        isAuctionActive(_ticketId)
        isBidHighEnough(_ticketId)
    {
        // Refund the previous highest bidder
        if (auctions[_ticketId].highestBidder != address(0)) {
            pendingReturns[auctions[_ticketId].highestBidder] += auctions[
                _ticketId
            ].highestBid;
        }

        // Update the highest bid
        auctions[_ticketId].highestBid = msg.value;
        auctions[_ticketId].highestBidder = msg.sender;
        emit BidPlaced(_ticketId, msg.sender, msg.value);
    }

    function endAuction(uint _ticketId) public {
        for (uint i = 1; i <= auctionCount; i++) {
            if (auctions[i].ticketId == _ticketId) {
                if (auctions[i].highestBidder == address(0)) {
                    // No bids were placed
                    auctions[i].active = false;
                    return;
                }
                // Transfer the ticket to the winner
                ticketContract.transferTicket(
                    _ticketId,
                    auctions[i].highestBidder
                );
                // Transfer the funds to the seller
                pendingReturns[
                    ticketContract.getTicketOwner(_ticketId)
                ] += auctions[i].highestBid;
                // End the auction
                auctions[i].active = false;
                emit AuctionEnded(
                    _ticketId,
                    auctions[i].highestBidder,
                    auctions[i].highestBid
                );
            }
        }
    }

    function getAuctionByTicketId(uint _ticketId) public view returns (bool) {
        for (uint i = 1; i <= auctionCount; i++) {
            if (auctions[i].ticketId == _ticketId && auctions[i].active) {
                return true;
            }
        }
        return false;
    }
}
