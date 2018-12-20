var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var testDate = new Date().toISOString().substring(0, 10);


var reporter = new HtmlScreenshotReporter({
    dest: './Reports',
    filename: testDate + '-SalesForce-largescreen-report.html',
    reportTitle: 'SalesForce-LargeScreenTests',
    cleanDestination: false,
    showSummary: true,
    showConfiguration: false,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true,
    showQuickLinks: true
});

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine',
    baseUrl: 'https://developer.salesforce.com', 
    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000,
        print: function () { }
    },

    allScriptsTimeout: 120000,

    params: {
        resolution: {
            width: 1920,
            height: 1080
        },
        search: {
            searchPage: '#stq=Writing%20Tests',
			apexAssertion: 'Writing Tests'
        },
    },

    onPrepare: function () {
        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
     
        jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));

        jasmine.getEnv().addReporter(reporter);

        var resolutionWidth = browser.params.resolution.width;
        var resolutionHeight = browser.params.resolution.height;

        browser.driver.manage().window().setSize(resolutionWidth, resolutionHeight);

        var disableCssAnimate = function () {
            angular
              .module('disableCssAnimate', [])
              .run(function () {
                  var style = document.createElement('style');
                  style.type = 'text/css';
                  style.innerHTML = '* {' +
                    'transition-property: none !important;' +
                    '-o-transition-property: none !important;' +
                    '-moz-transition-property: none !important;' +
                    '-ms-transition-property: none !important;' +
                    '-webkit-transition-property: none !important;' +
                    '}';
                  document.getElementsByTagName('head')[0].appendChild(style);
              });
        };

        browser.addMockModule('disableCssAnimate', disableCssAnimate);
    },
    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    specs:['../tests/SalesForceDotComTests.js'],

    capabilities: {
        browserName: 'chrome',
    },
};
