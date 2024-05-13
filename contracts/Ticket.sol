pragma solidity ^0.5.0;

// SPDX-License-Identifier: UNLICENSED


contract Ticket{
    uint public ticketCount = 0;

    struct TicketStruct{
        uint id;
        string name;
        string description;
        uint price;
        address payable owner;
        bool purchased;
    }

    mapping(uint => TicketStruct) public tickets;

    constructor() public{
        createTicket("Coldplay", "Concert Arena Nationala", 10);
    }

    function createTicket(string memory _name, string memory _description, uint _price) public{
        ticketCount++;
        tickets[ticketCount] = TicketStruct(ticketCount, _name, _description, _price, msg.sender, false);
    }

    function getAccountTickets(address _account) public view returns(uint[] memory){
        uint[] memory result = new uint[](ticketCount);
        uint counter = 0;
        for(uint i = 1; i <= ticketCount; i++){
            if(tickets[i].owner == _account){
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}


