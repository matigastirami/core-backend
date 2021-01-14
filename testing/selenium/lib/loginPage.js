let Page = require('./basePage');
const locator = require('../utils/localtor');
const fake = require('../utils/fakeData');

const inpUsernameLocator = locator.loginPage.usernameFieldId
const inpPasswordLocator = locator.loginPage.passwordFieldId
const btnIngresarLocator = locator.loginPage.loginButtonXPath

/*let searchInput, searchButton, resultStat;

Page.prototype.findMenuButton = async function () {
    searchInput = await this.findById(searchInputSelectorId);
    searchButton = await this.findByName(searchButtonSelectorName);

    const result = await this.driver.wait(async function () {
        const searchButtonText = await searchButton.getAttribute('value');
        const searchInputEnableFlag = await searchInput.isEnabled();

        return {
            inputEnabled: searchInputEnableFlag,
            buttonText: searchButtonText
        }
    }, 5000);
    return result;
};*/

let usernameInp, passwordInp, loginBtn;

Page.prototype.doLogin = async function (username, password) {
    usernameInp = await this.findById(inpUsernameLocator)
    passwordInp = await this.findById(inpPasswordLocator)
    loginBtn = await this.findByClassName("uk-button uk-button-primary")

    await this.write(usernameInp, username)
    await this.write(passwordInp, password)
    await this.click(loginBtn)
}

Page.prototype.navigateToUsersCreateAndUpdate = async function () {
    await this.click(await this.findByClassName('uk-navbar-toggle uk-icon'))
    await this.click(await this.findByLinkText('Usuarios'))
    await this.click(await this.findByXPath('//*[@id="app"]/div/main/div/div/div[1]/button'))
}

Page.prototype.completeCreateUserForm = async function() {
    await this.write(await this.findById('username'), `webdriver${(new Date()).getTime()}`)
    await this.write(await this.findById('email'), `webdriver${(new Date()).getTime()}@test.com`)
    await this.write(await this.findById('name'), `webdriver${(new Date()).getTime()}`)
    await this.write(await this.findById('surname'), `webdriver${(new Date()).getTime()}`)
    await this.write(await this.findById('password'), `webdriver${(new Date()).getTime()}`)
    await this.click(await this.findById('appInput'))
    await this.waitForElementPresentById('optionsModalapp')
    await this.click(await this.findByXPath('//*[@id="optionsModalapp"]/div/div[2]/div/div[2]/table/tbody/tr[1]'))
    await this.waitForElementNotPresentById('optionsModalapp')
    await this.sleep(500)
    await this.click(await this.findById('roleInput'))
    await this.waitForElementPresentById('optionsModalrole')
    await this.click(await this.findByXPath('//*[@id="optionsModalrole"]/div/div[2]/div/div[2]/table/tbody/tr[1]'))
    await this.waitForElementNotPresentById('optionsModalrole')
    await this.sleep(500)
    await this.click(await this.findByXPath('//*[@id="app"]/div/main/div/button'))
}

module.exports = Page;