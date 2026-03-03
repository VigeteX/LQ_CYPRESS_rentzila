import createUnitPage from "../pageObjects/CreateUnitPage.page";
import createUnitFormFieldsText from "../constants/createUnitFormFields.constants.json";
import errorMessages from "../constants/errorMessages.constants.json"

describe('Create Unit Form Fields validation', () => {
    beforeEach(() => {
        createUnitPage.open();
        cy.login();
        createUnitPage.verifyOnPage();
        createUnitPage.fillRequiredFields()
        createUnitPage.elements.nextButton().click();
    })

    const closeStrategies = [
        () => createUnitPage.closeErrorPopupByCross(),
        () => createUnitPage.closeErrorPopupByOutsideClick(),
        () => createUnitPage.closeErrorPopupBySaveBtn()
    ]

    it('C367: Verify image upload panels', () => {
        createUnitPage.elements.techVehiclePhotosTitle()
            .should('be.visible')
            .and('have.text', createUnitFormFieldsText.techVehiclePhotosTitle);
        createUnitPage.elements.techVehiclePhotosTitleRequiredSign().should('be.visible')
        createUnitPage.elements.techVehiclePhotosDescription()
            .should('be.visible')
            .and('have.text', createUnitFormFieldsText.techVehiclePhotosDescription);

        cy.task<string[]>('getFilesFromFolder', 'cypress/testData/validPhotos')
            .then((files) => {
                createUnitPage.elements.techPhotosInput().selectFile(files, { force: true })
            })

        createUnitPage.elements.techPhotosMainPhotoTitle()
            .should('be.visible')
            .and('have.text', createUnitFormFieldsText.techPhotosMainPhotoText);

        createUnitPage.elements.techPhotosArray().then(($elements) => {
            const length = $elements.length;

            //Save the src attribute of the first element
            const firstSrc = $elements[0].getAttribute('src');
            cy.wrap($elements[0]).as('firstElement');

            //Select a random index (excluding the first element at index 0)
            const randomIndex = Cypress._.random(1, length - 1);

            //Save the src attribute of the randomly selected element
            const randomSrc = $elements[randomIndex].getAttribute('src');

            //Perform drag & drop: move the random element to the first position
            cy.wrap($elements[randomIndex])
                .drag('@firstElement');

            //Verify first element now has random src
            createUnitPage.elements.techPhotosArray()
                .first()
                .invoke('attr', 'src')
                .should('eq', randomSrc);

            //Verify random index now has original first src
            createUnitPage.elements.techPhotosArray()
                .eq(randomIndex)
                .invoke('attr', 'src')
                .should('eq', firstSrc);
        });

        createUnitPage.deleteAllImages()
    });
    it('C384: Verify same images uploading', () => {
        const testPhotoPath: string = "cypress/testData/validPhotos/photo_1.jpg"

        createUnitPage.uploadPhoto(testPhotoPath);

        closeStrategies.forEach(closeAction => {
            createUnitPage.elements.techPhotosArray()
                .filter('[src!=""]')
                .should('have.length', 1);

            createUnitPage.uploadPhoto(testPhotoPath);

            createUnitPage.elements.techPhotosErrorPopup().should('be.visible');
            createUnitPage.elements.techPhotosErrorPopupMsg()
                .should('be.visible')
                .and('have.text', errorMessages.techPhotosDuplicateImageMsg);
            createUnitPage.elements.techPhotosErrorPopupSaveBtn().should('have.text', createUnitFormFieldsText.techPhotosPopupSaveButtonText)

            closeAction();

            createUnitPage.elements.techPhotosErrorPopup().should('not.exist');
            createUnitPage.elements.techPhotosArray()
                .filter('[src!=""]')
                .should('have.length', 1);
        });
    });
    it('C401: Verify uploading of invalid file type', () => {
        const invalidPhotoType: string = "cypress/testData/invalidPhotos/invalidPhotoType.webp"

        closeStrategies.forEach(closeAction => {
            createUnitPage.uploadPhoto(invalidPhotoType)

            createUnitPage.elements.techPhotosErrorPopup().should('be.visible');
            createUnitPage.elements.techPhotosErrorPopupMsg()
                .should('be.visible')
                .and('have.text', errorMessages.techPhotosInvalidTypeMsg);

            closeAction();

            createUnitPage.elements.techPhotosErrorPopup().should('not.exist');
            createUnitPage.elements.techPhotosArray()
                .filter('[src!=""]')
                .should('have.length', 0);
        })
    });
    it('C405: Verify uploading of invalid size file', () => {
        const invalidPhotoSize: string = "cypress/testData/invalidPhotos/invalidPhotoType.webp" //temporary solution while looking for test data

        closeStrategies.forEach(closeAction => {
            createUnitPage.uploadPhoto(invalidPhotoSize)

            createUnitPage.elements.techPhotosErrorPopup().should('be.visible');
            createUnitPage.elements.techPhotosErrorPopupMsg()
                .should('be.visible')
                .and('have.text', errorMessages.techPhotosInvalidTypeMsg);

            closeAction();

            createUnitPage.elements.techPhotosErrorPopup().should('not.exist');
            createUnitPage.elements.techPhotosArray()
                .filter('[src!=""]')
                .should('have.length', 0);
        })
    });
});