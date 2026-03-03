import { formData } from "../fixtures/form.data.js";
import homePage from "../pageObjects/HomePage.page";

describe("Home page Question Form Tests", () => {

  beforeEach(() => {
    homePage.open();
    homePage.scrollToForm();
    homePage.verifyFormVisible();
  });

  it("C226 Form validation and successful submit", () => {
    const { validPhone, validName, invalidPhones } = formData;

    homePage.submit();
    homePage.shouldShowBothEmptyErrors();

    homePage.enterName(validName);
    homePage.submit();
    homePage.shouldShowOnlyPhoneEmptyError();

    homePage.clickPhone();
    homePage.shouldHavePrefilledCountryCode();

    homePage.enterPhone(validPhone);
    homePage.clearName();
    homePage.submit();
    homePage.shouldShowOnlyNameEmptyError();

    homePage.enterName(validName);

    cy.wrap(invalidPhones).each((_, index) => {
      const phone = invalidPhones[index];

      homePage.clearPhone();
      homePage.enterPhone(phone);
      homePage.submit();
      homePage.shouldShowInvalidPhoneError();
    });

    homePage.clearPhone();
    homePage.enterPhone(validPhone);
    homePage.submit();
    homePage.shouldShowSuccessModal();
  });
});
