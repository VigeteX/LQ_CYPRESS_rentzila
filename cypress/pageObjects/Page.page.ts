export class Page {
    url = "/";

    readonly textBasic = {
        emptyFieldError: "Поле не може бути порожнім",
        requiredFieldError: "Це поле обов’язкове"
    };

    open() {
        cy.visit(this.url);
    }

    verifyUrlContains(path: string) {
        cy.url().should("include", path);
    }

    verifyOnPage() {
        this.verifyUrlContains(this.url);
    }

    click(elementFn: () => Cypress.Chainable, force = false) {
        elementFn().click({ force });
    }

    type(elementFn: () => Cypress.Chainable, text: string, clearFirst = true) {
        const element = elementFn();
        if (clearFirst) {
            element.clear();
        }
        element.type(text);
    }

    clear(elementFn: () => Cypress.Chainable) {
        elementFn().clear();
    }

    paste(elementFn: () => Cypress.Chainable, text: string) {
        elementFn().then(($input) => {
            const pasteEvent = new ClipboardEvent("paste", {
                bubbles: true,
                cancelable: true,
                clipboardData: new DataTransfer()
            });
            pasteEvent.clipboardData.setData("text/plain", text);
            $input[0].dispatchEvent(pasteEvent);
        });
    }

    scrollIntoView(elementFn: () => Cypress.Chainable) {
        elementFn().scrollIntoView();
    }

    shouldBeVisible(elementFn: () => Cypress.Chainable) {
        elementFn().should("be.visible");
    }

    shouldContainText(elementFn: () => Cypress.Chainable, text: string) {
        elementFn().should("contain.text", text);
    }

    shouldHaveText(elementFn: () => Cypress.Chainable, text: string) {
        elementFn().should("have.text", text);
    }

    shouldHaveAttribute(elementFn: () => Cypress.Chainable, attr: string, value: string) {
        elementFn().should("have.attr", attr, value);
    }

    shouldHavePlaceholder(elementFn: () => Cypress.Chainable, text: string) {
        this.shouldHaveAttribute(elementFn, "placeholder", text);
    }

    shouldHaveValue(elementFn: () => Cypress.Chainable, value: string) {
        elementFn().should("have.value", value);
    }

    shouldNotExist(elementFn: () => Cypress.Chainable) {
        elementFn().should("not.exist");
    }

    shouldHaveLength(elementFn: () => Cypress.Chainable, length: number) {
        elementFn().should("have.length", length);
    }

    shouldHaveLengthGreaterThan(elementFn: () => Cypress.Chainable, minLength: number) {
        elementFn().should("have.length.greaterThan", minLength);
    }

    getByIndex(elementFn: () => Cypress.Chainable, index: number) {
        return elementFn().eq(index);
    }

    shouldShowTitleWithAsterisk(
        titleFn: () => Cypress.Chainable,
        asteriskFn: () => Cypress.Chainable,
        titleText: string
    ) {
        this.shouldBeVisible(titleFn);
        this.shouldContainText(titleFn, titleText);
        this.shouldBeVisible(asteriskFn);
        this.shouldContainText(asteriskFn, "*");
    }

    shouldShowRequiredError = (errorFn: () => Cypress.Chainable) => {
        this.shouldBeVisible(errorFn);
        this.shouldContainText(errorFn, this.textBasic.requiredFieldError);
    }

    shouldShowEmptyFieldError(errorFn: () => Cypress.Chainable) {
        this.shouldBeVisible(errorFn);
        this.shouldContainText(errorFn, this.textBasic.emptyFieldError);
    }

    shouldShowErrorWithText(errorFn: () => Cypress.Chainable, errorText: string) {
        this.shouldBeVisible(errorFn);
        this.shouldContainText(errorFn, errorText);
    }

    shouldNotContainSpecialSymbols(elementFn: () => Cypress.Chainable, pattern = /[<>{};^]/) {
        elementFn().invoke("val").then((value: string) => {
            expect(value).not.to.match(pattern);
        });
    }

    shouldHaveMaxLength(elementFn: () => Cypress.Chainable, maxLength: number) {
        elementFn()
            .invoke("val")
            .should((val: any) => {
                expect(val.length).to.be.lte(maxLength);
            });
    }

    getElementsText(elementFn: () => Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable<string[]> {
        return elementFn().then($els =>
            [...$els].map(el => el.textContent?.trim() || "")
        );
    }

    clickFirst(elementFn: () => Cypress.Chainable) {
        elementFn().first().click();
    }

    getFirstElementText(
        elementFn: () => Cypress.Chainable,
        callback: (text: string) => void
    ) {
        elementFn().first().invoke("text").then((text) => {
            callback(text.trim());
        });
    }

    clickOutside() {
        cy.get("body").click(0, 0);
    }

    shouldShowAlert(expectedText: string) {
        cy.on("window:alert", (text) => {
            expect(text).to.eq(expectedText);
        });
    }

    shouldShowMultipleErrors(errorConfigs: Array<{ errorFn: () => Cypress.Chainable; text: string }>) {
        cy.wrap(errorConfigs).each((_, index) => {
            const { errorFn, text } = errorConfigs[index];
            this.shouldContainText(errorFn, text);
        });
    }

    shouldShowOneButNotAnother(
        visibleFn: () => Cypress.Chainable,
        notVisibleFn: () => Cypress.Chainable,
        visibleText?: string
    ) {
        this.shouldBeVisible(visibleFn);
        if (visibleText) {
            this.shouldContainText(visibleFn, visibleText);
        }
        this.shouldNotExist(notVisibleFn);
    }
}
