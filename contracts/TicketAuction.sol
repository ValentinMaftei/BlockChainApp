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
    }

    struct Bid {
        uint value;
        address payable bidder;
    }

    mapping(uint => Bid[]) public auctionBids;

    mapping(uint => Auction) public auctions;

    constructor(address _ticketContractAddress) public {
        ticketContract = Ticket(_ticketContractAddress);
    }

    modifier isAuctionActive(uint _id) {
        require(auctions[_id].active, "Auction is not active");
        _;
    }

    modifier isBidHighEnough(uint _id) {
        require(
            msg.value >= auctions[_id].highestBid + 10000000000000,
            "Bid is not high enough"
        );
        _;
    }

    event AuctionStarted(uint auctionId, uint ticketId, uint startPrice);

    function startAuction(uint _ticketId, uint _startPrice) public {
        // Start the auction
        auctionCount++;
        auctions[auctionCount] = Auction(
            auctionCount,
            _startPrice,
            _startPrice, // Highest bid is the start price
            address(0),
            _ticketId,
            true
        );
        emit AuctionStarted(auctionCount, _ticketId, _startPrice);
    }

    event AuctionEnd(uint auctionId, address winner, uint amount);

    function endAuction(uint _auctionId) public {
        require(auctions[_auctionId].active, "Auction is not active");

        if (auctions[_auctionId].highestBidder == address(0)) {
            // No bids were placed
            auctions[_auctionId].active = false;
            emit AuctionEnd(
                _auctionId,
                auctions[_auctionId].highestBidder,
                auctions[_auctionId].highestBid
            );
            return;
        }

        
        // Transfer the funds to the seller
        pendingReturns[_auctionId][
            ticketContract.getTicketOwner(auctions[_auctionId].ticketId)
        ] += auctions[_auctionId].highestBid;


        // Transfer the ticket to the winner
        ticketContract.transferTicket(
            auctions[_auctionId].ticketId,
            auctions[_auctionId].highestBidder
        );


        // End the auction
        auctions[_auctionId].active = false;
        emit AuctionEnd(
            _auctionId,
            auctions[_auctionId].highestBidder,
            auctions[_auctionId].highestBid
        );
    }

    function getAuctionByTicketId(uint _ticketId) public view returns (bool) {
        for (uint i = 1; i <= auctionCount; i++) {
            if (auctions[i].ticketId == _ticketId && auctions[i].active) {
                return true;
            }
        }
        return false;
    }

    event BidPlaced(uint auctionId, address bidder, uint value);

    function placeBid(
        uint _auctionId
    ) public payable isAuctionActive(_auctionId) isBidHighEnough(_auctionId) {
        // Push the bid to the auction's bids array
        auctionBids[_auctionId].push(Bid(msg.value, msg.sender));

        if (auctions[_auctionId].highestBidder != address(0)) {
            // Update the pending returns for the previous highest bidder
            pendingReturns[_auctionId][
                auctions[_auctionId].highestBidder
            ] += auctions[_auctionId].highestBid;
        }

        // Update the highest bid and bidder
        auctions[_auctionId].highestBid = msg.value;
        auctions[_auctionId].highestBidder = msg.sender;

        emit BidPlaced(_auctionId, msg.sender, msg.value);
    }

    function getBidsByAuctionId(
        uint _auctionId
    ) public view returns (uint[] memory, address[] memory) {
        uint[] memory values = new uint[](auctionBids[_auctionId].length);
        address[] memory bidders = new address[](
            auctionBids[_auctionId].length
        );

        for (uint i = 0; i < auctionBids[_auctionId].length; i++) {
            values[i] = auctionBids[_auctionId][i].value;
            bidders[i] = auctionBids[_auctionId][i].bidder;
        }

        return (values, bidders);
    }


    function checkPendingReturns(uint _auctionId, address account) public view returns (bool) {
        return pendingReturns[_auctionId][account] > 0;
    }

    function getTotalValuePendingReturns (address account) public view returns (uint) {
        uint total = 0;
        for (uint i = 1; i <= auctionCount; i++) {
            if (!auctions[i].active){
                total += pendingReturns[i][account];
            }
        }
        return total;
    }

    event WithdrawAllReturns(uint auctionId, address account, uint amount);

    function withdrawAllReturns(address payable account) public {
        for (uint i = 1; i <= auctionCount; i++) {
            if (!auctions[i].active && pendingReturns[i][account] > 0) {
                uint amount = pendingReturns[i][account];
                pendingReturns[i][account] = 0;
    
                account.transfer(amount);
            }
        }

        emit WithdrawAllReturns(auctionCount, account, pendingReturns[auctionCount][account]);
    }
}
