import { Page } from "./Page.page";

class CreateUnitPage extends Page {
    url = "/create-unit/";

    readonly texts = {
        pageTitle: "Створити оголошення",

        categorySection: {
            title: "Категорія",
            placeholder: "Виберіть категорію"
        },

        unitNameSection: {
            title: "Назва оголошення",
            placeholder: "Введіть назву оголошення",
            minLengthError: "не менше 10 символів",
            maxLengthError: "не більше 100 символів"
        },

        manufacturerSection: {
            title: "Виробник транспортного засобу",
            placeholder: "Введіть виробника транспортного засобу"
        }
    };

    readonly tabNames = [
        "Основна інформація",
        "Фотографії",
        "Послуги",
        "Вартість",
        "Контакти"
    ];

    elements = {
        bodyTitle: () => cy.get("div[class*=CreateEditFlowLayout_title]"),

        tabs: () => cy.get('[role="tab"]'),
        tabByIndex: (index: number) => this.getByIndex(this.elements.tabs, index),
        tabLabel: (index: number) => this.elements.tabByIndex(index).find("[class*=labelTitle]"),
        tabNumber: (index: number) => this.elements.tabByIndex(index).find('span[data-testid="labelNumber"]'),

        categoryTitle: () => cy.get("div[class*=CategorySelect_title]"),
        categoryAsterisk: () => this.elements.categoryTitle().find("span"),
        categoryInput: () => cy.get('[data-testid="categoryName"]'),
        categoryArrow: () => cy.get('[data-testid="buttonDiv"] img[alt=Arrow-down]'),
        categoryError: () => cy.get("[class*=CategorySelect_errorText]"),

        categoryPopup: () => cy.get('[class*=CategoryPopup_content]'),
        popupTitle: () => cy.contains("div[class*=CategoryPopup_title]"),
        popupCloseButton: () => cy.get('[data-testid="closeIcon"]'),
        firstColumnOptions: () => cy.get('[class*=FirstCategory_wrapper]'),
        secondColumnOptions: () => cy.get('[class*=SecondCategory_wrapper]'),
        thirdColumnOptions: () => cy.get('[class*=ThirdCategory_wrapper]'),

        unitNameTitle: () => cy.get("div[class*=CustomInput_title]").first(),
        unitNameAsterisk: () => cy.get("div[class*=CustomInput_title] span"),
        unitNameInput: () => cy.get('input[data-testid=custom-input]').first(),
        unitNameError: () => cy.get("input ~ div[data-testid=descriptionError]"),

        manufacturerTitle: () => cy.get("div[class*=SelectManufacturer_title]"),
        manufacturerAsterisk: () => this.elements.manufacturerTitle().find("span"),
        manufacturerInput: () => cy.get('[data-testid="input-customSelectWithSearch"]'),
        manufacturerValue: () => cy.get('div[class*=CustomSelectWithSearch_serviceText]'),
        manufacturerLoupeIcon: () => this.elements.manufacturerInput().parent().find("svg"),
        manufacturerError: () => cy.get("div[class*=CustomSelectWithSearch_errorText]"),
        manufacturerDropdown: () => cy.get("div[class*=CustomSelectWithSearch_searchResult]"),
        manufacturerOptions: () => cy.get("div[data-testid=item-customSelectWithSearch]"),
        manufacturerNotFoundText: () => cy.get("p[data-testid*=notFound-addNewItem]"),
        manufacturerClearButton: () => cy.get('button[data-testid="closeButton"]'),

        nextButton: () => cy.get("[data-testid=nextButton]")
    };

    shouldShowBodyTitle() {
        this.shouldBeVisible(this.elements.bodyTitle);
        this.shouldHaveText(this.elements.bodyTitle, this.texts.pageTitle);
    }

    shouldHaveTabsCount(expectedCount: number) {
        this.shouldHaveLength(this.elements.tabs, expectedCount);
    }

    shouldTabHaveLabel(index: number, expectedText: string) {
        this.shouldBeVisible(() => this.elements.tabLabel(index));
        this.shouldContainText(() => this.elements.tabLabel(index), expectedText);
    }

    shouldTabHaveNumber(index: number, expectedNumber: number) {
        this.shouldBeVisible(() => this.elements.tabNumber(index));
        this.shouldContainText(() => this.elements.tabNumber(index), expectedNumber.toString());
    }

    isTabActive(index: number) {
        this.shouldHaveAttribute(() => this.elements.tabByIndex(index), "aria-selected", "true");
    }

    isTabInactive(index: number) {
        this.shouldHaveAttribute(() => this.elements.tabByIndex(index), "aria-selected", "false");
    }

    shouldShowCategoryTitleWithAsterisk() {
        this.shouldShowTitleWithAsterisk(
            this.elements.categoryTitle,
            this.elements.categoryAsterisk,
            this.texts.categorySection.title
        );
    }

    shouldShowCategoryPlaceholder() {
        this.shouldContainText(this.elements.categoryInput, this.texts.categorySection.placeholder);
    }

    shouldShowArrowInCategoryInput() {
        this.shouldBeVisible(this.elements.categoryArrow);
    }

    shouldShowCategoryRequiredError() {
        this.shouldShowRequiredError(this.elements.categoryError);
    }

    clickCategoryInput() {
        this.click(this.elements.categoryInput);
    }

    shouldShowCategoryPopup() {
        this.shouldBeVisible(this.elements.categoryPopup);
        this.shouldBeVisible(this.elements.popupCloseButton);
    }

    closePopup() {
        this.click(this.elements.popupCloseButton, true);
    }

    shouldPopupBeClosed() {
        this.shouldNotExist(this.elements.categoryPopup);
    }

    shouldFirstColumnHaveOptions() {
        this.shouldHaveLengthGreaterThan(this.elements.firstColumnOptions, 0);
    }

    shouldSecondColumnHaveOptions() {
        this.shouldHaveLengthGreaterThan(this.elements.secondColumnOptions, 0);
    }

    shouldThirdColumnHaveOptions() {
        this.shouldHaveLengthGreaterThan(this.elements.thirdColumnOptions, 0);
    }

    selectFirstOptionFromFirstColumn() {
        this.clickFirst(this.elements.firstColumnOptions);
    }

    selectFirstOptionFromSecondColumn() {
        this.clickFirst(this.elements.secondColumnOptions);
    }

    selectFirstOptionFromThirdColumn() {
        this.clickFirst(this.elements.thirdColumnOptions);
    }

    shouldCategoryInputContainValue(value: string) {
        this.shouldContainText(this.elements.categoryInput, value);
    }

    clickOutsidePopup() {
        this.clickOutside();
    }

    shouldShowUnitNameTitleWithAsterisk() {
        this.shouldShowTitleWithAsterisk(
            this.elements.unitNameTitle,
            this.elements.unitNameAsterisk,
            this.texts.unitNameSection.title
        );
    }

    shouldShowUnitNamePlaceholder() {
        this.shouldHavePlaceholder(this.elements.unitNameInput, this.texts.unitNameSection.placeholder);
    }

    typeUnitName(text: string) {
        this.type(this.elements.unitNameInput, text);
    }

    pasteUnitName(text: string) {
        this.paste(this.elements.unitNameInput, text);
    }

    clearUnitName() {
        this.clear(this.elements.unitNameInput);
    }

    shouldShowUnitNameRequiredError() {
        this.shouldShowRequiredError(this.elements.unitNameError);
    }

    shouldShowUnitNameMinLengthError() {
        this.shouldShowErrorWithText(this.elements.unitNameError, this.texts.unitNameSection.minLengthError);
    }

    shouldShowUnitNameMaxLengthError() {
        this.shouldShowErrorWithText(this.elements.unitNameError, this.texts.unitNameSection.maxLengthError);
    }

    shouldNotContainSpecialSymbolsInUnitName() {
        this.shouldNotContainSpecialSymbols(this.elements.unitNameInput);
    }

    shouldUnitNameBeValid() {
        this.elements.unitNameInput()
            .should("have.css", "border-color")
            .and("not.eq", "rgb(255, 0, 0)");
        this.shouldNotExist(this.elements.unitNameError);
    }

    shouldShowManufacturerTitleWithAsterisk() {
        this.shouldShowTitleWithAsterisk(
            this.elements.manufacturerTitle,
            this.elements.manufacturerAsterisk,
            this.texts.manufacturerSection.title
        );
    }

    shouldShowManufacturerPlaceholder() {
        this.shouldHavePlaceholder(
            this.elements.manufacturerInput,
            this.texts.manufacturerSection.placeholder
        );
    }

    shouldShowLoupeIconInManufacturerInput() {
        this.shouldBeVisible(this.elements.manufacturerLoupeIcon);
    }

    shouldShowManufacturerRequiredError() {
        this.shouldShowRequiredError(this.elements.manufacturerError);
    }

    typeManufacturer(text: string) {
        this.type(this.elements.manufacturerInput, text);
    }

    pasteManufacturer(text: string) {
        this.paste(this.elements.manufacturerInput, text);
    }

    shouldShowManufacturerDropdown() {
        this.shouldBeVisible(this.elements.manufacturerDropdown);
    }

    getManufacturerOptionsText(): Cypress.Chainable<string[]> {
        return this.getElementsText(this.elements.manufacturerOptions);
    }

    shouldShowManufacturerNotFoundMessage(searchText: string) {
        this.shouldBeVisible(this.elements.manufacturerNotFoundText);
        this.shouldContainText(this.elements.manufacturerNotFoundText, searchText);
    }

    shouldManufacturerDropdownNotBeClickable() {
        this.shouldHaveLength(this.elements.manufacturerOptions, 0);
    }

    shouldManufacturerInputHaveMaxLength(max: number) {
        this.shouldHaveMaxLength(this.elements.manufacturerInput, max);
    }

    selectFirstManufacturerOption() {
        this.clickFirst(this.elements.manufacturerOptions);
    }

    shouldManufacturerInputContainValue(value: string) {
        this.shouldHaveText(this.elements.manufacturerValue, value);
    }

    shouldShowManufacturerClearButton() {
        this.shouldBeVisible(this.elements.manufacturerClearButton);
    }

    clickManufacturerClearButton() {
        this.click(this.elements.manufacturerClearButton);
    }

    shouldManufacturerInputBeEmpty() {
        this.shouldHaveValue(this.elements.manufacturerInput, "");
    }

    clickNextButton() {
        this.click(this.elements.nextButton);
    }
}

export default new CreateUnitPage();
