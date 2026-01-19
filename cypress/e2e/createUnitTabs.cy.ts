import createUnitPage from "../pageObjects/CreateUnitPage.page";

describe("Create Unit Tests", () => {
    const digitTestData = "123456789";
    const longText = "a".repeat(101);
    const symbolTestData = "<>{};^";
    const letterTestData = "abcdefghij";

    beforeEach(() => {
        createUnitPage.open();
        cy.login();
        createUnitPage.verifyOnPage();
    });

    
    it("C294 Body title and tabs validation", () => {
        createUnitPage.shouldShowBodyTitle();
        createUnitPage.shouldHaveTabsCount(createUnitPage.tabNames.length);

        createUnitPage.tabNames.forEach((tabName, index) => {
            createUnitPage.shouldTabHaveLabel(index, tabName);
            createUnitPage.shouldTabHaveNumber(index, index + 1);

            if (index === 0) {
                createUnitPage.isTabActive(index);
            } else {
                createUnitPage.isTabInactive(index);
            }
        });
    });


    it("C296 Verify category section", () => {
        createUnitPage.shouldShowCategoryTitleWithAsterisk();
        createUnitPage.shouldShowCategoryPlaceholder();
        createUnitPage.shouldShowArrowInCategoryInput();

        createUnitPage.clickNextButton();
        createUnitPage.shouldShowCategoryRequiredError();

        createUnitPage.clickCategoryInput();
        createUnitPage.shouldShowCategoryPopup();
        createUnitPage.closePopup();
        createUnitPage.shouldPopupBeClosed();

        createUnitPage.clickCategoryInput();
        createUnitPage.shouldShowCategoryPopup();
        createUnitPage.clickOutsidePopup();
        createUnitPage.shouldPopupBeClosed();

        createUnitPage.clickCategoryInput();
        createUnitPage.shouldShowCategoryPopup();
        createUnitPage.shouldFirstColumnHaveOptions();
        createUnitPage.selectFirstOptionFromFirstColumn();
        createUnitPage.shouldSecondColumnHaveOptions();
        createUnitPage.selectFirstOptionFromSecondColumn();
        createUnitPage.shouldThirdColumnHaveOptions();

        createUnitPage.elements.thirdColumnOptions().first().invoke("text").then((lastOptionText) => {
            createUnitPage.elements.thirdColumnOptions().first().click();
            createUnitPage.shouldPopupBeClosed();
            createUnitPage.shouldCategoryInputContainValue(lastOptionText.trim());
        });
    });

    it("C297 Verify unit name section", () => {
        createUnitPage.shouldShowUnitNameTitleWithAsterisk();
        createUnitPage.shouldShowUnitNamePlaceholder();

        createUnitPage.clickNextButton();
        createUnitPage.shouldShowUnitNameRequiredError();

        createUnitPage.typeUnitName(digitTestData);
        createUnitPage.clickNextButton();
        createUnitPage.shouldShowUnitNameMinLengthError();

        createUnitPage.pasteUnitName(digitTestData);
        createUnitPage.clickNextButton();
        createUnitPage.shouldShowUnitNameMinLengthError();

        createUnitPage.typeUnitName(longText);
        createUnitPage.clickNextButton();
        createUnitPage.shouldShowUnitNameMaxLengthError();

        createUnitPage.pasteUnitName(longText);
        createUnitPage.clickNextButton();
        createUnitPage.shouldShowUnitNameMaxLengthError();

        createUnitPage.typeUnitName(symbolTestData);
        createUnitPage.shouldNotContainSpecialSymbolsInUnitName();

        createUnitPage.pasteUnitName(symbolTestData);
        createUnitPage.shouldNotContainSpecialSymbolsInUnitName();

        createUnitPage.typeUnitName(letterTestData);
        createUnitPage.clickNextButton();
        createUnitPage.shouldUnitNameBeValid();

        createUnitPage.pasteUnitName(letterTestData);
        createUnitPage.clickNextButton();
        createUnitPage.shouldUnitNameBeValid();
    });

    it("C298 Verify vehicle manufacturer section", () => {
        const manufacturerName = "АТЭК";
        const letter = "А";
        const letters = "Abc";

        createUnitPage.shouldShowManufacturerTitleWithAsterisk();
        createUnitPage.shouldShowManufacturerPlaceholder();
        createUnitPage.shouldShowLoupeIconInManufacturerInput();

        createUnitPage.clickNextButton();
        createUnitPage.shouldShowManufacturerRequiredError();

        createUnitPage.typeManufacturer(letter);
        createUnitPage.shouldShowManufacturerDropdown();

        createUnitPage.pasteManufacturer(letter);
        createUnitPage.shouldShowManufacturerDropdown();

        createUnitPage.typeManufacturer(manufacturerName);
        createUnitPage.getManufacturerOptionsText().then(listUpper => {
            createUnitPage.typeManufacturer(manufacturerName.toLowerCase());
            createUnitPage.getManufacturerOptionsText().then(listLower => {
                expect(listUpper).to.deep.equal(listLower);
            });
        });

        createUnitPage.typeManufacturer(" ");
        createUnitPage.shouldManufacturerDropdownNotBeClickable();

        createUnitPage.typeManufacturer(symbolTestData);
        createUnitPage.shouldManufacturerDropdownNotBeClickable();

        createUnitPage.typeManufacturer(digitTestData);
        createUnitPage.shouldShowManufacturerNotFoundMessage(digitTestData);
        createUnitPage.shouldManufacturerDropdownNotBeClickable();

        createUnitPage.typeManufacturer(longText);
        createUnitPage.shouldManufacturerInputHaveMaxLength(100);

        createUnitPage.typeManufacturer(letters);
        createUnitPage.shouldShowManufacturerDropdown();
        createUnitPage.elements.manufacturerOptions().first().invoke("text").then(text => {
            createUnitPage.selectFirstManufacturerOption();
            createUnitPage.shouldManufacturerInputContainValue(text.trim());
        });

        createUnitPage.shouldShowManufacturerClearButton();
        createUnitPage.clickManufacturerClearButton();
        createUnitPage.shouldManufacturerInputBeEmpty();
    });
});
