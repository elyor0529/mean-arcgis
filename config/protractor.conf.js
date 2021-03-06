let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        '../client/test/e2e/**/*.e2e-spec.ts'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    directConnect: true,
    baseUrl: 'http://localhost:3001/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {
        }
    },
    useAllAngular2AppRoots: true,
    beforeLaunch: function () {
        require('ts-node').register({
            project: 'client/test/e2e'
        });
    },
    onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter());
    }
};
