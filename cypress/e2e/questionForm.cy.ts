import homePage from "../pageObjects/HomePage.page";

describe("Home page Question Form Tests", () => {
  const validPhone = "+380506743060";
  const invalidPhones = ["+38063 111 111", "+1 1111111111111"];
  const validName = "Test";

  beforeEach(() => {
    homePage.open();
    homePage.scrollToForm();
    homePage.verifyFormVisible();
  });

  it("C226 Form validation and successful submit", () => {
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

    invalidPhones.forEach(phone => {
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
