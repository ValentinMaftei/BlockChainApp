const Ticket = artifacts.require("./Ticket.sol");
const TicketAuction = artifacts.require("./TicketAuction.sol");
const Withdrawable = artifacts.require("./Withdrawable.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Ticket);
  const ticket = await Ticket.deployed();
  await deployer.deploy(TicketAuction, ticket.address);
  await deployer.deploy(Withdrawable);
};
