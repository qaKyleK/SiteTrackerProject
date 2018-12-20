function SalesForceDotComPage () {
   this.searchField = element(by.id('st-search-input'));
   this.searchBtn = element(by.className('header-st-search-button'));
   this.contentArray = element.all(by.id('st-results-container')).all(by.css('div')).all(by.className('result__title'));
   this.loginBtn = element(by.id('login-button'));
   this.username = element(by.id('username'));
   this.password = element(by.id('password'));
   this.signIn = element(by.id('Login'));
   this.accountMenu = element(by.className('btn btn-account'));
   this.logoutBtn = element(by.id('user-info-logout'));
   this.topic = element(by.id('topic-title'));
}

var EC = protractor.ExpectedConditions;

SalesForceDotComPage.prototype.clearAndSendKeys = function (element, text) {
    element.clear();
    element.sendKeys(text);
};

SalesForceDotComPage.prototype.waitForVisibilityOf = function (element, timeout) {
    browser.wait(EC.visibilityOf(element), timeout);
};

SalesForceDotComPage.prototype.clickLink = function (link) {
   browser.actions().mouseMove(this.contentArray.get(link)).click().perform();
   browser.sleep(1000);
};

SalesForceDotComPage.prototype.clickEachLink = function () {
   for (var index = 0; index < 20; index++) {  
    var option = element.all(by.id('st-results-container')).all(by.css('div')).all(by.className('result__title')).get(index);
	browser.executeScript('arguments[0].scrollIntoView(true)', option.getWebElement());
    browser.actions().mouseMove(option).click().perform();
	browser.sleep(1000);
	browser.navigate().back(); 
   }
};

SalesForceDotComPage.prototype.login = function (user, pass) {
   browser.actions().mouseMove(this.loginBtn).click().perform();
   this.clearAndSendKeys(this.username, user);
   this.clearAndSendKeys(this.password, pass);
   browser.actions().mouseMove(this.signIn).click().perform(); // Email needs to be whitelisted on the backend to bypass Sandbox (email verification)
};

SalesForceDotComPage.prototype.logOut = function () {
   browser.actions().mouseMove(this.accountMenu).click().perform();
   this.logoutBtn.click();
};

SalesForceDotComPage.prototype.validateArray = function (element) {
   var list = true;
   for (let i = 0; i < element.length; i++) {
   if (element[i].checkValidity()) continue;
   list = false;
   break;
   }
};

SalesForceDotComPage.prototype.useSearch = function () {
   browser.executeScript("arguments[0].value='Writing Tests';", this.searchField); //sendKeys not sending the entire string
   browser.actions().mouseMove(this.searchBtn).click().perform();
   browser.sleep(5000);
};

SalesForceDotComPage.prototype.getBrowserUrl = function () {
    return browser.getCurrentUrl();
};

SalesForceDotComPage.prototype.waitForVisibilityOf = function (element, timeout) {
    browser.wait(EC.visibilityOf(element), timeout);
};

SalesForceDotComPage.prototype.openUrlRelativeToBaseUrl = function (url) {
    browser.get(url);
};

module.exports = SalesForceDotComPage;
