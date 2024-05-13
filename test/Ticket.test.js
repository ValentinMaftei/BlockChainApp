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
        assert.equal(ticket.price, 0);
        assert.equal(ticket.owner, accounts[0]);
        assert.equal(ticket.forSale, false);
    })

    it ("create tickets", async () => {
        const result = await this.ticket.createTicket('The Weeknd', 'Concert Arenele Romane');
        const ticketCount = await this.ticket.ticketCount();
        assert.equal(ticketCount, 2);
        const event = result.logs[0].args;
        assert.equal(event.id.toNumber(), 2);
        assert.equal(event.name, 'The Weeknd');
        assert.equal(event.description, 'Concert Arenele Romane');
        assert.equal(event.price, 0);
        assert.equal(event.owner, accounts[0]);
        assert.equal(event.forSale, false);
    })
})    