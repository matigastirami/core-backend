const { describe, it, after, before } = require('mocha');
const Page = require('../lib/loginPage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
    try {
        describe ('Roles page tests', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('http://localhost:4000/');
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('Queries the roles list', async () => {
                
            });

            it ('Creates a new role', async () => {
                
            });

            it ('Deletes a role', async () => {
                
            });

            it ('Edit a role', async () => {
                
            });

        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();