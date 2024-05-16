pragma solidity ^0.5.0;

contract Withdrawable {
    mapping(uint => mapping(address  => uint)) public pendingReturns;

    function withdraw(uint auctionId) public returns (bool) {
        uint amount = pendingReturns[auctionId][msg.sender];
        if (amount > 0) {
            pendingReturns[auctionId][msg.sender] = 0;

            if (!msg.sender.send(amount)) {
                // If the send fails, revert the withdrawal
                pendingReturns[auctionId][msg.sender] = amount;
                return false;
            }
        }
        return true;
    }
}