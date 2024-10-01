module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    cardCodeField: '#code.card-input',
    commentDriverField: '#comment',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveButton: 'div=Supportive',
    blanketAndHandkerchiefsButton: '.switch',
    iceCreamValue: 'div=+',
    enterButton: '.smart-button',
    businessButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[1]/div[1]',

    //Payment-picker 
    paymentMethodButton: '.pp-button .pp-text',
    addCardButton: 'div=Add card',
    signaturePanel: '.plc',
    linkButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    closePaymentModalButton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/button',
    cardIcon: '.pp-value-container  img',



    // Modals
    phoneNumberModal: '.modal',
    paymenMethodModal: '.payment-picker.open .modal',
    addCardModal: '.modal.unusual',
    popUpCarSearchModal: '.order-body',
    soundProofModal: 'div=Soundproof curtain',
    
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click(); 
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },

    selectSupportive: async function () {
        const supportiveButton = await $(this.supportiveButton); 
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
    },

    selectPaymentMethod: async function () {
       //Payment button section
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed()
        await paymentMethodButton.click()
        const paymentMethodModal = await $(this.paymenMethodModal);
        await paymentMethodModal.waitForDisplayed()

        //Card button section
        const addCardButton = await $(this.addCardButton);
        await addCardButton.click();
        const addCardModal = await $(this.addCardModal);
        await addCardModal.waitForDisplayed();

        //Card number field section
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(3204756094761826)
        const cardCodeField = await $(this.cardCodeField);
        await cardCodeField.waitForDisplayed();
        await cardCodeField.setValue(580);

        //Simulate link button
        const signaturePanel =  await $(this.signaturePanel);
        await signaturePanel.waitForDisplayed();
        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();

        //Closing the payment modal
        const closePaymentModalButton = await $(this.closePaymentModalButton);
        await closePaymentModalButton.waitForDisplayed();
        await closePaymentModalButton.click();

    },

    messageToDriver: async function() {
        const commentDriverField = await $(this.commentDriverField);
        await commentDriverField.waitForDisplayed();
        await commentDriverField.setValue('Leave the package at the door');
    },


    orderBlanketAndHandkerchiefs: async function() {
        const blanketAndHandkerchiefsButton = await $(this.blanketAndHandkerchiefsButton);
        await blanketAndHandkerchiefsButton.waitForDisplayed();
        await blanketAndHandkerchiefsButton.click();   
        
    },

    orderTwoIceCream: async function() {
        const iceCreamValue = await $(this.iceCreamValue);
        await iceCreamValue.waitForDisplayed();
        await iceCreamValue.click();
        await iceCreamValue.click();

    },

    SelectBusinessButton: async function() {
        const businessButton = await $(this.businessButton);
        await businessButton.click();
    },

    
    carSearchModal: async function() {
        const enterButton = await $(this.enterButton);
        await enterButton.waitForDisplayed();
        await enterButton.click();
    }


};