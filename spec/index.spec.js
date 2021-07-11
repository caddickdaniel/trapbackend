process.env.NODE_ENV = 'test';
const {
    expect
} = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const connection = require('../db/connection');

describe('/api', () => {
    beforeEach(() => connection.migrate
        .rollback()
        .then(() => connection.migrate.latest())
        .then(() => connection.seed.run()));
    after(() => connection.destroy());

    describe('/stock', () => {
        it('GET/ status 200/ responds with an array of stock objects', () => request
            .get('/api/stock')
            .expect(200)
            .then(({
                body
            }) => {
                expect(body.stock).to.be.an('array');
                expect(body.stock[0]).to.contain.keys('type', 'place');
            }));
        it('GET/ status 200/ responds with an array of stock objects sorted by abv', () => request
            .get('/api/stock?sort_by=abv')
            .expect(200)
            .then(({
                body
            }) => {
                // console.log(body.stock[0])
                expect(body.stock).to.be.an('array');
                expect(body.stock[0].abv).to.equal(8);
            }));
        it('GET/ status 200/ responds with an array of stock objects sorted by brewery name', () => request
            .get('/api/stock?sort_by=brewery_name')
            .expect(200)
            .then(({
                body
            }) => {
                // console.log(body.stock[0])
                expect(body.stock).to.be.an('array');
                expect(body.stock[0].brewery_name).to.equal('Brewer 6');
            }));
        it('GET/ status 200/ responds with an array of stock objects in ascending order', () => request
            .get('/api/stock?order=asc')
            .expect(200)
            .then(({
                body
            }) => {
                // console.log(body.stock[0])
                expect(body.stock).to.be.an('array');
                expect(body.stock[0].product_name).to.equal('Beer 9');
            }));
        it('GET/ status 200/ responds with an array of stock objects in descending order', () => request
            .get('/api/stock?order=desc')
            .expect(200)
            .then(({
                body
            }) => {
                // console.log(body.stock[0])
                expect(body.stock).to.be.an('array');
                expect(body.stock[0].product_name).to.equal('Beer 1');
            }));
        it('GET/ status 200/ responds with an array of stock objects in ascending order sorted by abv', () => request
            .get('/api/stock?sort_by=abv&order=asc')
            .expect(200)
            .then(({
                body
            }) => {
                // console.log(body.stock[0])
                expect(body.stock).to.be.an('array');
                expect(body.stock[0].abv).to.equal(3);
            }));
        it('POST/ status 201/ adds a stock item to the stock object', () => {
            const newStock = {
                product_name: 'The new beer',
                brewery_name: 'The new brewery',
                abv: 300,
                type: 'Spiritbeer',
                place: 'Bottle',
                desc: 'The newest bestest spirit beer',
                price: 100,
            };
            return request
                .post('/api/stock')
                .send(newStock)
                .expect(201)
                .then(({
                    body
                }) => {
                    // console.log(body)
                    expect(body.stock.product_name).to.equal('The new beer');
                    expect(body.stock).to.contain.keys('abv', 'type');
                    expect(body.stock).to.be.an('object');
                });
        });
        it('DELETE/ status 204/ responds with a 204 and no-content', () => request.delete('/api/stock/product/Beer 1').expect(204));
    });
});