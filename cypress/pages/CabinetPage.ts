class CreateUnitsPage {
  elements ={
    ownerTypeLabel:() => cy.get('div[class*="OwnerProfileLegalType_title"]'),
  
    verificationText:() => cy.get('div[class*="OwnerProfileForm_verificationText"]'),
    
    phoneLabel:() => cy.get('div[class*="OwnerProfileNumber_title"]'),
    phoneInput:() => cy.get('input[data-testid="input_OwnerProfileNumber"]'),

    viberLabel:() => cy.get('div[class*="OwnerProfileAdditionalInfo_title"]'),
    viberInput:() => cy.get('input[class*="OwnerProfileAdditionalInfo_input"]'),

    customSelect:() => cy.get('div[data-testid="div_CustomSelect"]'),
    customSelectOption:() => cy.get('li[data-testid="item-customSelect"]'),

    customInputTitle:() => cy.get('div[class*="CustomInput_title"]'),
    customInput:() => cy.get('input[data-testid="custom-input"]'),

    nextButton:() => cy.get('button[data-testid="nextButton"]'),
    error:() => cy.get('div[data-testid="descriptionError"]'),
  }

}

export default new CreateUnitsPage();