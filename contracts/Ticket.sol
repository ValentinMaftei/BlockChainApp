pragma solidity ^0.5.0;

// SPDX-License-Identifier: UNLICENSED

contract Ticket {
    uint public ticketCount = 0;

    struct TicketStruct {
        uint id;
        string name;
        string description;
        uint price;
        address payable owner;
        bool forSale;
    }

    mapping(uint => TicketStruct) public tickets;

    event TicketCreated(
        uint id,
        string name,
        string description,
        uint price,
        address payable owner,
        bool forSale
    );

    event TicketPlaceOnSale(uint id, uint price, address payable owner);

    event TicketBought(uint id, uint price, address payable owner);

    function createTicket(
        string memory _name,
        string memory _description
    ) public {
        ticketCount++;
        tickets[ticketCount] = TicketStruct(
            ticketCount,
            _name,
            _description,
            0,
            msg.sender,
            false
        );
        emit TicketCreated(
            ticketCount,
            _name,
            _description,
            0,
            msg.sender,
            false
        );
    }

    function getAccountTickets(
        address _account
    ) public view returns (uint[] memory) {
        uint[] memory tempResult = new uint[](ticketCount);
        uint counter = 0;
        for (uint i = 1; i <= ticketCount; i++) {
            if (tickets[i].owner == _account) {
                tempResult[counter] = i;
                counter++;
            }
        }
        uint[] memory result = new uint[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = tempResult[i];
        }
        return result;
    }

    modifier onlyTicketOwner(uint _id) {
        require(
            tickets[_id].owner == msg.sender,
            "You are not the owner of this ticket"
        );
        _;
    }

    function updateTicketPrice(uint _id, uint _newPrice) private {
        tickets[_id].price = _newPrice;
    }

    function getisTicketForSale(uint _id) public view returns (bool) {
        return tickets[_id].forSale;
    }

    function placeTicketOnSale(
        uint _id,
        uint _price
    ) external onlyTicketOwner(_id) {
        tickets[_id].forSale = true;
        updateTicketPrice(_id, _price);
        emit TicketPlaceOnSale(_id, _price, msg.sender);
    }

    function revokeTicketFromSale(uint _id) external onlyTicketOwner(_id) {
        tickets[_id].forSale = false;
        updateTicketPrice(_id, 0);
    }

    modifier isTicketForSale(uint _id) {
        require(tickets[_id].forSale == true, "Ticket is not for sale");
        _;
    }

    modifier hasEnoughFunds(uint _id) {
        require(msg.value >= tickets[_id].price, "Not enough funds");
        _;
    }

    function buyTicket(
        uint _id
    ) external payable isTicketForSale(_id) hasEnoughFunds(_id) {
        tickets[_id].owner.transfer(msg.value);
        tickets[_id].owner = msg.sender;
        tickets[_id].forSale = false;
        tickets[_id].price = 0;
        emit TicketBought(_id, msg.value, msg.sender);
    }

    function getTicket(uint _id) public view returns (string memory, string memory) {
            return (tickets[_id].name, tickets[_id].description);

    }

    function getTicketOwner(uint _id) public view returns (address) {
        return tickets[_id].owner;
    }

    event TicketTransferred(uint id, address payable newOwner);

    function transferTicket(uint _id, address payable newOwner) public {
        tickets[_id].owner = newOwner;
        emit TicketTransferred(_id, newOwner);
    }
}
