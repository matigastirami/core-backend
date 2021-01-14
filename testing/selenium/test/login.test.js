const { describe, it, after, before } = require('mocha');
const Page = require('../lib/loginPage');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
    try {
        describe ('Login page tests', async function () {
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

            it ('Do a valid login', async () => {
                await page.doLogin("admin","admin");
                await page.findByXPath('//*[@id="app"]/div/main/div/p[1]')
            });

            it ('Do an invalid login', async () => {
                await page.doLogin("admin","test");
                await page.sleep(1000)
                let alertText = await page.getAlertText()
                expect(alertText).to.be.equal('Usuario y/o contraseña inválidos')
            });

        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {

    }
})();