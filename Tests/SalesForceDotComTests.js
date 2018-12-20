describe ('SalesForce Dot Com Tests', function () {
	"use strict";

	var SalesForceDotComPage = require('../Pages/SalesForceDotComPage.js');
	var salesPage = new SalesForceDotComPage();

	var searchPage = browser.params.search.searchPage;
	var apexAssertion = browser.params.search.apexAssertion;

	beforeAll(function() {
		browser.ignoreSynchronization = true;
	});
	beforeEach(function() {
		salesPage.openUrlRelativeToBaseUrl('/');
	});
	afterEach(function() {
	    browser.manage().deleteAllCookies();
	});

	it('"1. Writing test page should be listed"', function () {
	   //salesPage.login(username,password);
	   salesPage.useSearch();
	   expect(salesPage.getBrowserUrl()).toContain(searchPage);
	   salesPage.validateArray(salesPage.contentArray);
	   salesPage.clickEachLink();
	   salesPage.clickLink(0);
	   expect(salesPage.topic.getText()).toBe(apexAssertion);
	   //salesPage.logOut();
	});
});
