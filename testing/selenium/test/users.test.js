const { describe, it, after, before } = require('mocha');
const Page = require('../lib/loginPage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
    try {
        describe ('Users page tests', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('https://auth-main-node.herokuapp.com/');
            });

            afterEach (async () => {
                //await page.quit();
            });

            /*it ('Queries the users list', async () => {
                
            });*/

            it ('Creates a new user', async () => {
                await page.doLogin("admin","admin");
                await page.sleep(1000)
                await page.navigateToUsersCreateAndUpdate()
                await page.completeCreateUserForm()
                await page.waitForElementPresentByClassName('uk-modal uk-open')
                let text = await page.getText(await page.findByClassName('uk-modal-body'))
                console.log("texto:", text)
                //expect(text).to.be.equals('Usuario creado con éxito')
            });

            /*it ('Deletes an user', async () => {
                
            });

            it ('Edit an user', async () => {
                
            });*/

        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();