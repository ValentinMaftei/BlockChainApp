const Ticket = artifacts.require("./Ticket.sol");

contract("Ticket", accounts => {
    before(async () => {
        this.ticket = await Ticket.deployed();
    })

    it ("deploys successfully", async () => {
        const address = this.ticket.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    })

    it ("lists tickets", async () => {
        const ticketCount = await this.ticket.ticketCount();
        const ticket = await this.ticket.tickets(ticketCount);
        assert.equal(ticket.id.toNumber(), ticketCount.toNumber());
        assert.equal(ticket.name, 'Coldplay');
        assert.equal(ticket.description, 'Concert Arena Nationala');
        assert.equal(ticket.price, 10);
        assert.equal(ticket.owner, accounts[0]);
        assert.equal(ticket.purchased, false);
    })
})    