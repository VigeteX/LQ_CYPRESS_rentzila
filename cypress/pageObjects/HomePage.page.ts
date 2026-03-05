import { Page } from "./Page.page";

class HomePage extends Page {
    url = "/";

    readonly texts = {
        emptyFieldError: "Поле не може бути порожнім",
        invalidPhoneError: "Телефон не пройшов валідацію",
        successfulSubmissionText: "Ви успішно відправили заявку"
    };

    elements = {
        questionsForm: () => cy.get("div[class*=ConsultationForm_container]"),
        nameInput: () => cy.get('input[name="name"]'),
        phoneInput: () => cy.get('input[type="tel"]'),
        submitButton: () => cy.get("div[class*=ConsultationForm_container] button"),
        nameError: () => cy.get("div[class*=ConsultationForm_name] p[class*=error_message]"),
        phoneError: () => cy.get("div[class*=ConsultationForm_phone] p[class*=error_message]"),
        successModal: () => cy.get('[role="alert"]')
    };

    scrollToForm() {
        this.scrollIntoView(this.elements.questionsForm);
    }

    verifyFormVisible() {
        this.shouldBeVisible(this.elements.questionsForm);
    }

    enterName(name: string) {
        this.type(this.elements.nameInput, name);
    }

    clearName() {
        this.clear(this.elements.nameInput);
    }

    enterPhone(phone: string) {
        this.type(this.elements.phoneInput, phone);
    }

    clearPhone() {
        this.clear(this.elements.phoneInput);
    }

    clickPhone() {
        this.click(this.elements.phoneInput);
    }

    submit() {
        this.click(this.elements.submitButton);
    }

    shouldShowBothEmptyErrors() {
        this.shouldShowMultipleErrors([
            { errorFn: this.elements.nameError, text: this.texts.emptyFieldError },
            { errorFn: this.elements.phoneError, text: this.texts.emptyFieldError }
        ]);
    }

    shouldShowOnlyPhoneEmptyError() {
        this.shouldShowOneButNotAnother(
            this.elements.phoneError,
            this.elements.nameError,
            this.texts.emptyFieldError
        );
    }

    shouldShowOnlyNameEmptyError() {
        this.shouldShowOneButNotAnother(
            this.elements.nameError,
            this.elements.phoneError,
            this.texts.emptyFieldError
        );
    }

    shouldShowInvalidPhoneError() {
        this.shouldShowErrorWithText(
            this.elements.phoneError,
            this.texts.invalidPhoneError
        );
    }

    shouldHavePrefilledCountryCode() {
        this.shouldHaveValue(this.elements.phoneInput, "+380");
    }

    shouldShowSuccessModal() {
        this.shouldShowAlert(this.texts.successfulSubmissionText);
    }
}

export default new HomePage();