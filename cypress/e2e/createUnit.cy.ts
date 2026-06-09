import header from '../pages/HeaderPage';
import create from '../pages/CreateUnitsPage';
import loginPage from '../pages/LoginPage';
import { validUser, validPhones, account } from '../fixtures/login.data';
import { validUnit, images, notimage, bigimage, priceInputs, priceInputExpect, invalidInput, surnameErrorResponse, nameErrorResponse, invalidPhoneInput, phoneErrorResponse, numberPrefix, phoneOperators, baseNumber } from '../fixtures/createUnit.data';
import { routes } from '../constants/routes';
import { createUnitsPlaceholders, tabNames, errorMessages, paymentMethods, createUnitsDropdown, createUnitsShiftDropdown, commonPlaceholders } from '../constants/uiTexts';
import 'cypress-real-events';

describe('Login flow', () => {   
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');

        header.elements.enterButton().click();
        loginPage.login(validUser.email, validUser.password)
        header.elements.avatarIcon().should('be.visible');
        cy.visit(routes.CREATE_UNIT);
        header.elements.preloader().should('not.exist');
    });

    it.skip('C329 Verify "Далі" button', () => {
        create.elements.nextButton().should('contain', commonPlaceholders.nextButton)
        create.elements.nextButton().click()

        create.elements.categorySelectError().should('be.visible')
        create.elements.unitNameError().should('be.visible')
        create.elements.vehicleManufacturerError().should('be.visible')
        create.elements.addressSelectionBlockError().should('be.visible')

        create.elements.categorySelect().click()
        create.elements.firstCategoryWrappe().contains(validUnit.firstCategoryLabel).click()
        create.elements.secondCategoryWrappe().contains(validUnit.secondCategoryLabel).click()
        create.elements.thirdCategoryWrappe().contains(validUnit.thirdCategoryLabel).click()

        create.elements.unitName().type(validUnit.unitName)

        create.elements.vehicleManufacturer().type(validUnit.vehicleManufacturer)
        create.elements.vehicleManufacturerConfirm().click()

        create.elements.addressSelection().click()
        create.elements.addressSelectionConfirm().click()
        create.elements.addressSelection().should('contain', validUnit.adress)

        create.elements.nextButton().click()
        
        create.elements.tabItems().should('have.length', 5).each(($tab, index) => {
            const isSecond = index === 1;
            cy.wrap($tab).should('be.visible').and('contain', tabNames[index]);
            cy.wrap($tab).find('[data-testid="labelNumber"]').should('have.text', String(index + 1));

            if (isSecond) {
                cy.wrap($tab).should('have.class', 'Mui-selected').and('have.attr', 'aria-selected', 'true');
            } else {
                cy.wrap($tab).should('not.have.class', 'Mui-selected').and('have.attr', 'aria-selected', 'false');
            }
        });

    });

    it.skip('C367 Verify image upload panels', () => {
        create.skip_to_photo_page()

        create.elements.photoTitle().should('be.visible')
        create.elements.technicalPhotoTitle().should('be.visible')
        create.elements.technicalPhotoDescriptionTitle().should('be.visible')

        cy.wrap(images).each((image, index) => {
            create.elements.imagesInput().selectFile(`cypress/fixtures/images/${image}`, { force: true });
            create.elements.unitImage().eq(index).should('be.visible').and('have.prop', 'naturalWidth').and('be.gt', 0);
        });

        create.elements.unitImage().eq(2).invoke('attr', 'src').as('movingSrc');

        cy.get('@movingSrc').then((movingSrc) => {
            const dataTransfer = new DataTransfer();
            
            create.elements.imageBlock().eq(2).trigger('dragstart', { dataTransfer });
            create.elements.imageBlock().eq(0).trigger('drop', { dataTransfer });
            create.elements.imageBlock().eq(0).trigger('dragend', { force: true });

            create.elements.unitImage().eq(0).should('have.attr', 'src', movingSrc);
        });

        cy.wrap(images).each((_image, index: number) => {
            const expectedCount = images.length - index; 

            create.elements.imageBlock().eq(0).realHover();
            create.elements.deleteImage().eq(0).should('be.visible').click({ force: true });

            if (expectedCount % create.IMAGES_PER_ROW === 0 && expectedCount !== 0) {
                create.elements.unitImage().should('have.length', expectedCount);
            }
        });
    });

    it.skip('C384 Verify same images uploading', () => {
        create.skip_to_photo_page()

        create.doubleImageUpload()
        create.elements.popupText().should('be.visible').contains(errorMessages.double)
        create.elements.popupCloseIcon().click()
        create.elements.popup().should('not.exist')

        create.elements.imagesInput().selectFile(`cypress/fixtures/images/${images[0]}`, { force: true });
        create.elements.popupText().should('be.visible').contains(errorMessages.double)
        create.elements.popupButton().click()
        create.elements.popup().should('not.exist')

        create.elements.imagesInput().selectFile(`cypress/fixtures/images/${images[0]}`, { force: true });
        create.elements.popupText().should('be.visible').contains(errorMessages.double)
        cy.get('body').click(0, 0);
        create.elements.popup().should('not.exist')
    });

    it.skip('C401 Verify uploading of invalid file type', () => {
        create.skip_to_photo_page()

        create.elements.imagesInput().selectFile(`cypress/fixtures/images/${notimage[0]}`, { force: true });
        create.elements.popupText().should('be.visible').contains(errorMessages.notValid)
        create.elements.popupCloseIcon().click()
        create.elements.popup().should('not.exist')

        create.elements.imagesInput().selectFile(`cypress/fixtures/images/${notimage[0]}`, { force: true });
        create.elements.popupText().should('be.visible').contains(errorMessages.notValid)
        create.elements.popupButton().click()
        create.elements.popup().should('not.exist')

        create.elements.imagesInput().selectFile(`cypress/fixtures/images/${notimage[0]}`, { force: true });
        create.elements.popupText().should('be.visible').contains(errorMessages.notValid)
        cy.get('body').click(0, 0);
        create.elements.popup().should('not.exist')
    });
    
    it.skip('C405 Verify uploading of invalid size file', () => {
        create.skip_to_photo_page()

        create.elements.imagesInput().selectFile(`cypress/fixtures/images/${bigimage[0]}`, { force: true });
        create.elements.popupText().should('be.visible').contains(errorMessages.notValid)
        create.elements.popupCloseIcon().click()
        create.elements.popup().should('not.exist')

        create.elements.imagesInput().selectFile(`cypress/fixtures/images/${bigimage[0]}`, { force: true });
        create.elements.popupText().should('be.visible').contains(errorMessages.notValid)
        create.elements.popupButton().click()
        create.elements.popup().should('not.exist')

        create.elements.imagesInput().selectFile(`cypress/fixtures/images/${bigimage[0]}`, { force: true });
        create.elements.popupText().should('be.visible').contains(errorMessages.notValid)
        cy.get('body').click(0, 0);
        create.elements.popup().should('not.exist')
    });

    it.skip('C412 Verify removing variants from choosed list', () => {
        create.skip_to_services_page()
        create.add_services(3)

        create.elements.selectedServices().eq(1).find(create.addServicesLoc).invoke('text').then((text) => {
            const trimmedText = text.trim();
            cy.wrap(trimmedText).as('deletedText');
        });
        create.elements.selectedServices().eq(1).find(create.removeServicesLoc).click();
        cy.get('@deletedText').then((text: any) => {
            cy.contains(text).should('not.exist');
        });

        create.elements.selectedServices().eq(0).find(create.addServicesLoc).invoke('text').then((text) => {
            const trimmedText = text.trim();
            cy.wrap(trimmedText).as('deletedText');
        });
        create.elements.selectedServices().eq(0).find(create.removeServicesLoc).click();
        cy.get('@deletedText').then((text: any) => {
            cy.contains(text).should('not.exist');
        });
    });

    it.skip('C413 Verify "Назад" button', () => {
        create.skip_to_services_page()
        create.elements.prevButton().should('contain', commonPlaceholders.prevButton)

        create.elements.prevButton().click()
        create.elements.photoTitle().should('be.visible')
    });

    it.skip('C414 Verify "Далі" button', () => {
        create.skip_to_services_page()
        create.elements.nextButton().should('contain', commonPlaceholders.nextButton)

        create.elements.nextButton().click()
        create.elements.info().contains(errorMessages.atLeastOne).should('be.visible')

        create.add_services(1)
        create.elements.nextButton().click()

        create.elements.tabItems().should('have.length', 5).each(($tab, index) => {
            const isFourth = index === 3;
            cy.wrap($tab).should('be.visible').and('contain', tabNames[index]);
            cy.wrap($tab).find('[data-testid="labelNumber"]').should('have.text', String(index + 1));

            if (isFourth) {
                cy.wrap($tab).should('have.class', 'Mui-selected').and('have.attr', 'aria-selected', 'true');
            } else {
                cy.wrap($tab).should('not.have.class', 'Mui-selected').and('have.attr', 'aria-selected', 'false');
            }
        });
    });

    it.skip('C417 Verify prices page', () => {
        create.skip_to_prices_page()

        create.elements.paymentMethodTitle().should('be.visible')
        create.elements.paymentMethodDropDawn().find('span').should('contain', paymentMethods.cashToCard)

        create.elements.paymentMethodDropDawn().click()
        create.elements.customSelect().find('span').contains(paymentMethods.cashToCard).should('be.visible').click()
        create.elements.paymentMethodDropDawn().find('span').should('contain', paymentMethods.cashToCard)

        create.elements.paymentMethodDropDawn().click()
        create.elements.customSelect().find('span').contains(paymentMethods.cashlessNoVAT).should('be.visible').click()
        create.elements.paymentMethodDropDawn().find('span').should('contain', paymentMethods.cashlessNoVAT)

        create.elements.paymentMethodDropDawn().click()
        create.elements.customSelect().find('span').contains(paymentMethods.cashlessVAT).should('be.visible').click()
        create.elements.paymentMethodDropDawn().find('span').should('contain', paymentMethods.cashlessVAT)
    });

    it.skip('C418 Verify "Вартість мінімального замовлення" section', () => {
        create.skip_to_prices_page()
        create.elements.priceInputTitle().should('be.visible')
        cy.wrap(priceInputs).each((textToInput: string, i: number) => {
            create.elements.priceInput().eq(0).clear().type(textToInput).should('have.value', priceInputExpect[i]);
        });
        create.elements.currency().should('have.value', 'UAH');
    });

    it.skip('C482 Verify adding price for service', () => {
        create.skip_to_prices_page()

        create.elements.addPriceButton().should('be.visible').and('contain.text', createUnitsPlaceholders.addText).find('svg').should('exist');                      
        create.elements.addPriceButton().click()
        
        cy.wrap(priceInputs).each((textToInput: string, i: number) => {
            create.elements.priceInput().eq(2).clear().type(textToInput).should('have.value', priceInputExpect[i]);
        });
        create.elements.currency().eq(1).should('have.value', 'UAH');
        
        create.elements.dropdown().should('be.visible').and('contain.text', createUnitsDropdown[0]).find('svg').should('exist');
        cy.wrap(createUnitsDropdown).each((text: string) => {
            create.elements.dropdown().click()
            cy.get(create.itemCustomSelect).contains(text).click()
            create.elements.dropdown().should('contain.text', text)
        });

        create.elements.dropdown().click()
        cy.get(create.itemCustomSelect).contains(createUnitsDropdown[1]).click()
        cy.wrap(createUnitsShiftDropdown).each((text: string) => {
            create.elements.shiftDropdown().click()
            cy.get(create.itemCustomSelect).contains(text).click()
            create.elements.shiftDropdown().should('contain.text', text)
        });

        create.elements.removePrice().click()
        create.elements.removePrice().should('not.exist')
        create.elements.addPriceButton().should('be.visible')
    });

    it.skip('C488 Verify "Назад" button', () => {
        create.skip_to_prices_page()
        create.elements.prevButton().click()
        create.elements.selectedServices().should('have.length.at.least', 1)
    });

    it.skip('C489 Verify ""Далі"" button', () => {
        create.skip_to_prices_page()
        create.elements.nextButton().click()
        create.elements.unitPriceError().should('be.visible')
        create.elements.priceInput().eq(0).type(priceInputs[0])
        create.elements.nextButton().click()
    });

    it.skip('C536 Verify contact card block, with filled personal info account', () => {
        create.skip_to_contacts_page()
        create.elements.contactTitle().should('exist')
        create.elements.userName().contains(account.userName).should('exist')
        create.elements.inn().contains(account.inn).should('exist')
        create.elements.paragraph(validPhones[0]).should('exist')
        create.elements.paragraph(validUser.email).should('exist')
        create.elements.paragraph(account.telegram).should('exist')
        create.elements.paragraph(account.GEO).should('exist')
    });

    it.skip('C537 Verify contact card block, with filled personal info account', () => {
        create.skip_to_contacts_page()
        create.elements.checkBoxTitle().should('exist')
        create.elements.checkBoxOperator().should('be.checked');
        
        create.elements.checkBoxOperator().click()
        create.elements.operatorFormName().should('be.visible')
        create.elements.operatorFormPhone().should('be.visible')
        create.elements.checkBoxOperator().click()
        create.elements.operatorFormName().should('not.exist')
        create.elements.operatorFormPhone().should('not.exist')

        create.elements.checkBoxText().click()
        create.elements.operatorFormName().should('be.visible')
        create.elements.operatorFormPhone().should('be.visible')
        create.elements.checkBoxText().click()
        create.elements.operatorFormName().should('not.exist')
        create.elements.operatorFormPhone().should('not.exist')

        create.elements.checkBoxText().click()
        create.elements.operatorFormSurnameTitle().should('contain', commonPlaceholders.surname)
        create.elements.operatorFormSurnameInput().should('contain', '')
        create.elements.operatorFormSurnameError().should('contain', errorMessages.required)

        create.elements.operatorFormNameTitle().should('contain', commonPlaceholders.name)
        create.elements.operatorFormNameInput().should('contain', '')
        create.elements.operatorFormNameError().should('contain', errorMessages.required)

        create.elements.operatorFormPhoneTitle().should('contain', commonPlaceholders.phone)
        create.elements.operatorFormPhoneInput().should('contain', '')
        create.elements.operatorFormPhoneError().should('contain', errorMessages.required)
        
        cy.wrap(invalidInput).each((text:string, i: number) => {
            const expectedError = surnameErrorResponse[i < 2 ? i : 2];
            create.elements.operatorFormSurnameInput().clear().type(text)
            create.elements.operatorFormSurnameError().should('contain', expectedError)
            create.elements.operatorFormSurnameError().should('contain', expectedError)
        });

        cy.wrap(invalidInput).each((text:string, i: number) => {
            const expectedError = nameErrorResponse[i < 2 ? i : 2];
            create.elements.operatorFormNameInput().clear().type(text)
            create.elements.operatorFormNameError().should('contain', expectedError)
        });

        cy.wrap(invalidPhoneInput).each((text:string, i: number) => {
            const expectedError = phoneErrorResponse[i < 2 ? 0 : 1];
            create.elements.operatorFormPhoneInput().clear().type(text)
            create.elements.operatorFormPhoneError().should('contain', expectedError)
        });

        cy.wrap(phoneOperators).each((operator) => {
            const fullPhoneNumber = `${numberPrefix}${operator}${baseNumber}`;
            create.elements.operatorFormPhoneInput().clear().type(fullPhoneNumber)
            create.elements.operatorFormPhoneError().should('not.exist')
        });

    });
});