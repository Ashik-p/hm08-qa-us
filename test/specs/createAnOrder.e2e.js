const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        //Ensure the From and To field is filled correctly
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
        
    })

    it('should select supportive plan taxi option', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();

    })

    it('should fill the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should add the credi card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectPaymentMethod();
        const cardIcon = await $(page.cardIcon);
        await cardIcon.waitForDisplayed();
        await expect (await $(cardIcon)).toBeExisting();

        await browser.pause(2000);
    })

    it('should write a message for driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.messageToDriver();
        await expect ($(page.commentDriverField)).toBeDisplayed('Leave the package at the door');
    })

    it('should order a Blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        //select supportive plan button to enable order requirements options
        await page.selectSupportive();

        await page.orderBlanketAndHandkerchiefs();
        await expect ($('.switch-input')).toBeChecked();

        await browser.pause(5000);

 
    })

    it('should order 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        await page.orderBlanketAndHandkerchiefs();
        await page.orderTwoIceCream();

        await expect ($('.counter-value')).toHaveText("2");

    })

    it('should display the car search modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.SelectBusinessButton();
        await page.carSearchModal();
        await expect($(page.popUpCarSearchModal)).toBeExisting();
        
    })

    it('should provide waiting time for driver in the modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.SelectBusinessButton();
        await page.carSearchModal();
        await browser.pause(40000);
        await expect($(page.popUpCarSearchModal)).toBeExisting();

    })
    
})