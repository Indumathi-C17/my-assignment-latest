const testData = require('../data/testData.json');

class RetirementCalculatorPage {
    get currentAgeInput() { return $('#current-age'); }
    get retirementAgeInput() { return $('#retirement-age'); }
    get currentAnnualIncomeInput() { return $('#current-income'); }
    get spousesAnnualIncomeInput() { return $("//input[@id='spouse-income']"); }
    get currentRetirementSavingsInput() { return $('#current-total-savings'); }
    get currentRetirementContributionInput() { return $('#current-annual-savings'); }
    get annualRetirementContributionIncreaseInput() { return $('#savings-increase-rate'); }
    get socialSecurityIncomeToggle() { return $("//label[@for='yes-social-benefits']"); }
    get relationshipStatusSelect() { return $("//label[@for='married']"); }
    get socialSecurityOverrideInput() { return $('#social-security-override'); }
    get submitButton() { return $("//button[contains(text(), 'Calculate')]"); }

    enterCurrentAge(age1) {
        this.currentAgeInput.waitForDisplayed({ timeout: 5000 });
        this.currentAgeInput.waitForEnabled({ timeout: 5000 });
        this.currentAgeInput.setValue(age1);
    }

    enterRetirementAge(age2) {
        this.retirementAgeInput.waitForDisplayed({ timeout: 5000 });
        this.retirementAgeInput.waitForEnabled({ timeout: 5000 });
        this.retirementAgeInput.setValue(age2);
    }

    async enterCurrentAnnualIncome(income) {
        await this.currentAnnualIncomeInput.waitForDisplayed({ timeout: 5000 });
        await this.currentAnnualIncomeInput.clearValue(); 

        await this.currentAnnualIncomeInput.setValue('$');
        await browser.keys(['ArrowRight']);

        
        await this.currentAnnualIncomeInput.addValue(income);
    }

    async enterSpousesAnnualIncome(income) {
        await this.spousesAnnualIncomeInput.waitForDisplayed({ timeout: 5000 });
    
        await this.spousesAnnualIncomeInput.clearValue();

        await this.spousesAnnualIncomeInput.setValue('$');
    
        await browser.keys(['ArrowRight']);
    
        await this.spousesAnnualIncomeInput.addValue(income);
    }

    async enterCurrentRetirementSavings(savings) {
        await this.currentRetirementSavingsInput.waitForDisplayed({ timeout: 5000 });
    
        await this.currentRetirementSavingsInput.clearValue();

        await this.currentRetirementSavingsInput.setValue('$');
    
        await browser.keys(['ArrowRight']);

        this.currentRetirementSavingsInput.setValue(savings);
    }

    async enterCurrentRetirementContribution(contribution) {
        await this.currentRetirementContributionInput.waitForDisplayed({ timeout: 5000 });
    
        await this.currentRetirementContributionInput.clearValue();

        await this.currentRetirementContributionInput.setValue('%');
    
        await browser.keys(['ArrowRight']);

        this.currentRetirementContributionInput.setValue(contribution);
    }

    async enterAnnualRetirementContributionIncrease(increase) {

        await this.annualRetirementContributionIncreaseInput.waitForDisplayed({ timeout: 5000 });
    
        await this.annualRetirementContributionIncreaseInput.clearValue();

        await this.annualRetirementContributionIncreaseInput.setValue('%');

        this.annualRetirementContributionIncreaseInput.setValue(increase);
    }

    async  toggleSocialSecurityIncome() {
        await this.annualRetirementContributionIncreaseInput.waitForDisplayed({ timeout: 5000 });

        this.socialSecurityIncomeToggle.click();
    }
    
    submitForm() {
        this.submitButton.click();
    }

    fillOutRetirementForm(data) {
        this.enterCurrentAge(data.currentAge);
        this.enterRetirementAge(data.retirementAge);
        this.enterCurrentAnnualIncome(data.currentAnnualIncome);
        this.enterSpousesAnnualIncome(data.spouseAnnualIncome);
        this.enterCurrentRetirementSavings(data.currentRetirementSavings);
        this.enterCurrentRetirementContribution(data.currentRetirementContribution);
        this.enterAnnualRetirementContributionIncrease(data.annualRetirementContributionIncrease);
        if (data.socialSecurityIncome === 'No') {
            this.toggleSocialSecurityIncome();
            this.enterSocialSecurityOverride(data.socialSecurityIncome);
        }

        this.submitForm();
    }
}

module.exports = new RetirementCalculatorPage();
