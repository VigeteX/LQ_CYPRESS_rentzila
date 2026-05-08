import { createUnitsPlaceholders } from '../constants/uiTexts';
import { validUnit, images } from '../fixtures/createUnit.data';
class CreateUnitsPage {
  readonly IMAGES_PER_ROW = 4;
  elements ={
    nextButton:() => cy.get('button[data-testid="nextButton"]'),
    prevButton:() => cy.get('button[data-testid="prevButton"]'),

    categorySelectError:() => cy.get('div[class*="CategorySelect_errorTextVisible"]'),
    unitNameError:() => cy.get('div[class*="CustomInput_errorDescr"]'),
    vehicleManufacturerError:() => cy.get('div[class*="CustomSelectWithSearch_errorTextVisible"]'),
    addressSelectionBlockError:() => cy.get('div[class*="AddressSelectionBlock_errorTextVisible__IAGKS"]'),
    
    categorySelect:() => cy.get('div[class*="CategorySelect_button"]'),
    unitName:() => cy.get('input[placeholder="Введіть назву оголошення"]'),
    vehicleManufacturer:() => cy.get('input[data-testid="input-customSelectWithSearch"]'),
    addressSelection:() => cy.get('label[data-testid="mapLabel"]'),
    
    firstCategoryWrappe:() => cy.get('div[class*="FirstCategory_wrapper"]'),
    secondCategoryWrappe:() => cy.get('div[class*="SecondCategory_wrapper"]'),
    thirdCategoryWrappe:() => cy.get('div[class*="ThirdCategory_wrapper"]'),

    vehicleManufacturerConfirm:() => cy.get('div[data-testid="item-customSelectWithSearch"]'),
    addressSelectionConfirm:() => cy.get('button[class*="ItemButtons_darkBlueBtn"]'),

    createTitle:() => cy.get('div[class*="CreateEditFlowLayout_title"]'),

    tabItems: () => cy.get('[role="tab"]'),
    labelNumber: () => cy.get('[data-testid="labelNumber"]'),

    photoTitle:() => cy.get('div[class*="ImagesUnitFlow_title"]'),
    technicalPhotoTitle:() => cy.get('div[class*="ImagesUnitFlow_paragraph"]'),
    technicalPhotoDescriptionTitle:() => cy.get('div[class*="ImagesUnitFlow_descr"]'),

    imageContainer:() => cy.get('div[class*="ImagesUnitFlow_imageContainer"]'),
    imageBlock:() => cy.get('div[data-testid="imageBlock"]'),
    unitImage:() => cy.get('img[data-testid="unitImage"]'),  
    imagesInput:() => cy.get('input[data-testid="input_ImagesUnitFlow"]'),
    deleteImage:() => cy.get('div[data-testid="deleteImage"]'),
    
    popup:() => cy.get('div[class*="PopupLayout_content"]'),
    popupText:() => cy.get('div[class*="PopupLayout_content"]').find('div[data-testid="errorPopup"]'),
    popupCloseIcon:() => cy.get('div[class*="PopupLayout_content"]').find('div[data-testid="closeIcon"]'),
    popupButton:() => cy.get('div[class*="PopupLayout_content"]').find('button[class*="ItemButtons_darkBlueBtn"]'),

    servicesTitle:() => cy.get('div[class*="ServicesUnitFlow_title"]'),
    servicesInput:() => cy.get('div[class*="ServicesUnitFlow_searchInput"]').find('input'),
    servicesResults:() => cy.get('div[data-testid="searchItem-servicesUnitFlow"]'),
    selectedServices:() => cy.get('div[data-testid="item-servicesUnitFlow"]'),

    info:() => cy.get('div[data-testid="add-info"]'),

    pricesTitle:() => cy.get('div[class*="PricesUnitFlow_title"]'),
    paymentMethodTitle:() => cy.get('div[class*="PricesUnitFlow_paragraph"]'),
    paymentMethodDropDawn:() => cy.get('div[class*="PricesUnitFlow_methodSelectWrapper"]'),
    customSelect:() => cy.get('li[data-testid="item-customSelect"]'),
    
  }
  skip_to_photo_page(){
    this.elements.nextButton().should('contain', createUnitsPlaceholders.nextButton)
    this.elements.nextButton().click()

    this.elements.categorySelect().click()
    this.elements.firstCategoryWrappe().contains(validUnit.firstCategoryLabel).click()
    this.elements.secondCategoryWrappe().contains(validUnit.secondCategoryLabel).click()
    this.elements.thirdCategoryWrappe().contains(validUnit.thirdCategoryLabel).click()

    this.elements.unitName().type(validUnit.unitName)

    this.elements.vehicleManufacturer().type(validUnit.vehicleManufacturer)
    this.elements.vehicleManufacturerConfirm().click()

    this.elements.addressSelection().click()
    this.elements.addressSelectionConfirm().click()
    this.elements.addressSelection().should('contain', validUnit.adress)

    this.elements.nextButton().click()
    this.elements.photoTitle().should('be.visible')
  }
  skip_to_services_page(){
    this.skip_to_photo_page()
    this.elements.imagesInput().selectFile(`cypress/fixtures/images/${images[0]}`, { force: true });
    this.elements.unitImage().eq(0).should('be.visible').and('have.prop', 'naturalWidth').and('be.gt', 0);
    this.elements.nextButton().click()
    this.elements.servicesTitle().should('be.visible')
  }
  skip_to_prices_page(){
    this.skip_to_services_page()
    this.add_services(1)
    this.elements.nextButton().click()
    this.elements.pricesTitle().should('be.visible')
  }

  doubleImageUpload(){
    this.elements.imagesInput().selectFile(`cypress/fixtures/images/${images[0]}`, { force: true });
    this.elements.unitImage().eq(0).should('be.visible').and('have.prop', 'naturalWidth').and('be.gt', 0);
    this.elements.imagesInput().selectFile(`cypress/fixtures/images/${images[0]}`, { force: true });
  }
  add_services(amount: number) {
    this.elements.servicesInput().type('a');
    for (let i = 0; i < amount; i++) {
      this.elements.servicesResults().eq(i).click();
      this.elements.selectedServices().should('have.length', i + 1);
    }
    this.elements.selectedServices().should('have.length', amount)
  }
}

export default new CreateUnitsPage();