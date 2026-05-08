import header from '../pages/HeaderPage';
import create from '../pages/CreateUnitsPage';
import loginPage from '../pages/LoginPage';
import { validUser } from '../fixtures/login.data';
import { validUnit, images, notimage, bigimage } from '../fixtures/createUnit.data';
import { routes } from '../constants/routes';
import { createUnitsPlaceholders, tabNames, errorMessages, paymentMethods } from '../constants/uiTexts';
import 'cypress-real-events';

describe('Login flow', () => {   
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');

        header.elements.enterButton().click();
        loginPage.login(validUser.email, validUser.password)
        header.elements.avatarIcon().should('be.visible');
        cy.visit(routes.CREATE_UNIT);
    });

    it('C329 Verify "Далі" button', () => {
        create.elements.nextButton().should('contain', createUnitsPlaceholders.nextButton)
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

    it('C367 Verify image upload panels', () => {
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

    it('C384 Verify same images uploading', () => {
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

    it('C401 Verify uploading of invalid file type', () => {
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
    
    it('C405 Verify uploading of invalid size file', () => {
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

    it('C412 Verify removing variants from choosed list', () => {
        create.skip_to_services_page()
        create.add_services(3)

        create.elements.selectedServices().eq(1).find('div[class*="ServicesUnitFlow_serviceText"]').invoke('text').then((text) => {
            const trimmedText = text.trim();
            cy.wrap(trimmedText).as('deletedText');
        });
        create.elements.selectedServices().eq(1).find('button[data-testid="remove-servicesUnitFlow"]').click();
        cy.get('@deletedText').then((text: any) => {
            cy.contains(text).should('not.exist');
        });

        create.elements.selectedServices().eq(0).find('div[class*="ServicesUnitFlow_serviceText"]').invoke('text').then((text) => {
            const trimmedText = text.trim();
            cy.wrap(trimmedText).as('deletedText');
        });
        create.elements.selectedServices().eq(0).find('button[data-testid="remove-servicesUnitFlow"]').click();
        cy.get('@deletedText').then((text: any) => {
            cy.contains(text).should('not.exist');
        });
    });

    it('C413 Verify "Назад" button', () => {
        create.skip_to_services_page()
        create.elements.prevButton().should('contain', createUnitsPlaceholders.prevButton)

        create.elements.prevButton().click()
        create.elements.photoTitle().should('be.visible')
    });

    it('C414 Verify "Далі" button', () => {
        create.skip_to_services_page()
        create.elements.nextButton().should('contain', createUnitsPlaceholders.nextButton)

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

    it('C417 Verify prices page', () => {
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
});