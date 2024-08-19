const RetirementCalculatorPage = require('../pages/RetirementCalculatorPage.js');
const Utils = require('../utils/Utils');
const testData = require('../data/testData.json');

describe('Retirement Calculator Tests', () => {
    beforeAll(async () => {
        await browser.maximizeWindow();
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    });

    beforeEach(() => {
        Utils.logInfo('Starting a new test case');
    });

    it('should fill out the retirement form correctly and submit', async () => {
        Utils.logInfo('Filling out the retirement form with provided test data');

        await RetirementCalculatorPage.fillOutRetirementForm(testData);
        await browser.pause(3000);

        const successMessage = await $('#result-message');
        await successMessage.waitForDisplayed({ timeout: 5000 }); 
        expect(await successMessage.isDisplayed()).toBe(true);
        expect(await successMessage.getText()).toContain('Congratulations');

        Utils.logInfo('Form filled out and submitted successfully');
    });

    afterEach(() => {
        Utils.logInfo('Test case completed');
    });

    afterAll(() => {
        Utils.logInfo('All test cases completed');
    });
});
