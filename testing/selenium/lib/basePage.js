const {Builder, By, until} = require('selenium-webdriver');
const chromedriver = require('chromedriver')
console.log(chromedriver.path)

const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
//o.setChromeBinaryPath("C:\\bin\\chromedriver.exe")
//o.addArguments('start-fullscreen');
//o.addArguments('disable-infobars');
//o.setUserPreferences({ credential_enable_service: false });
o.windowSize({ height: 1080, width: 1920 })

var Page = function() {
    this.driver = new Builder()
        .setChromeOptions(o)
        .forBrowser('chrome')
        .build();

    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };

    this.takeScreenshot = async function(){
        return await this.driver.takeScreenshot()
    }

    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };

    this.sleep = async function() {
        return await this.driver.sleep(1500);
    };

    this.findByXPath = async function(xpath){
        await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000, 'Looking for element');
        return await this.driver.findElement(By.xpath(xpath));
    }

    this.findByClassName = async function(className){
        await this.driver.wait(until.elementLocated(By.className(className)), 15000, 'Looking for element');
        return await this.driver.findElement(By.className(className));
    }
    
    this.findByLinkText = async function(linkText){
        await this.driver.wait(until.elementLocated(By.linkText(linkText)), 15000, 'Looking for element');
        return await this.driver.findElement(By.linkText(linkText));
    }

    this.findByPartialLinkText = async function(partialLinkText){
        await this.driver.wait(until.elementLocated(By.partialLinkText(partialLinkText)), 15000, 'Looking for element');
        return await this.driver.findElement(By.partialLinkText(partialLinkText));
    }

    this.findById = async function(id) {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
        return await this.driver.findElement(By.id(id));
    };

    this.findByName = async function(name) {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
        return await this.driver.findElement(By.name(name));
    };

    this.click = async function(el) {
        return await el.click()
    }

    this.write = async function (el, txt) {
        return await el.sendKeys(txt);
    };

    this.getAlertText = async function() {
        // Store the alert in a variable
        let alert = await this.driver.switchTo().alert();

        //Store the alert text in a variable
        let alertText = await alert.getText();

        return alertText
    }

    this.waitForElementPresentById = async function(id){
        return this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for an element by id')
    }

    this.waitForElementNotPresentById = async function(id){
        return this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Verify if an element is not present by id')
    }

    this.waitForElementPresentByClassName = async function(className){
        return this.driver.wait(until.elementLocated(By.className(className)), 15000, 'Looking for an element by className')
    }

    this.waitForElementNotPresentByClassName = async function(className){
        return this.driver.wait(until.elementLocated(By.className(className)), 15000, 'Verify if an element is not present by className')
    }

    this.getText = async function(el){
        return el.getText();
    }

    this.verifyTextPresentOnPage = async function(text){
        return this.driver.getPageSource().contains(text)
    }
};

module.exports = Page;