const allure = require('allure-commandline');

exports.config = {
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    specs: [
      './test/specs/**/*.ts'
    ],
    capabilities: [{
      maxInstances: 1,
      browserName: 'chrome',
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://hurma.work/tariffs',
    framework: 'mocha',
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000
    },
    
    before: async () => {
      await browser.setTimeout({ 'implicit': 5000 });
    },
  };
  
  