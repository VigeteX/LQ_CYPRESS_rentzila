import header from '../pages/HeaderPage';
import footer from '../pages/FooterPage';
import { routes } from '../constants/routes';
import { footerPlaceholders } from '../constants/uiTexts';

describe('Login flow', () => {   
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
    });

    it('C212 Checking "Послуги" section on the main page', () => {
        header.elements.servicesSectionCategoriesList().children('div').then($cats => {
            
            for (let i = 0; i < $cats.length; i++) {
                header.elements.servicesSectionProposesList().children('div').then($props => {
                    
                    for (let j = 0; j < $props.length; j++) {
                        header.elements.servicesSectionTitle().scrollIntoView();
                        header.elements.servicesSectionCategoriesList().children('div',).eq(i).click();
                        header.elements.servicesSectionProposesList().children('div',).eq(j).click();

                        header.elements.logo().click();
                    }
                });
            }
        });
    });
    it('C213 Checking "Спецтехніка" section on the main page', () => {
        header.elements.equipmentSectionTitle().scrollIntoView();
        header.elements.equipmentSectionCategoriesList().children('h3').then($cats => {
            
            for (let i = 0; i < $cats.length; i++) {
                header.elements.equipmentSectionProposesList().children('div').then($props => {
                    
                    for (let j = 0; j < $props.length; j++) {
                        header.elements.equipmentSectionTitle().scrollIntoView();
                        header.elements.equipmentSectionCategoriesList().children('h3',).eq(i).click();
                        header.elements.equipmentSectionProposesList().children('div',).eq(j).click();

                        header.elements.logo().click();
                    }
                });
            }
        });
    });
    it('C214 Verify that all elements on the footer are displayed and all links are clickable', () => {
        footer.elements.content().scrollIntoView();

        footer.elements.content().should('be.visible');
        footer.elements.politikaKonfidenciinosti().should('be.visible');
        footer.elements.pravilaVikoristannyaFailivCookie().should('be.visible');
        footer.elements.umoviDostupuTaKoristuvannya().should('be.visible');
        
        footer.elements.toUsers().should('be.visible');
        footer.elements.ogoloshennya().should('be.visible');
        footer.elements.tenderi().should('be.visible');
        footer.elements.zapitiNaRobotu().should('be.visible');
        
        footer.elements.contacts().should('be.visible');
        footer.elements.email().should('be.visible');
        footer.elements.futterLogo().should('be.visible');
        footer.elements.copyright().should('be.visible');

        footer.elements.politikaKonfidenciinosti().click();
        footer.elements.politikaKonfidenciinostiLabel().should('be.visible');
        cy.url().should('include', routes.PRIVACY_POLICY)

        footer.elements.content().scrollIntoView();
        footer.elements.pravilaVikoristannyaFailivCookie().click();
        footer.elements.pravilaVikoristannyaFailivCookieLabel().should('be.visible');
        cy.url().should('include', routes.COOKIE_POLICY)

        footer.elements.content().scrollIntoView();
        footer.elements.umoviDostupuTaKoristuvannya().click();
        footer.elements.umoviDostupuTaKoristuvannyaLabel().should('be.visible');
        cy.url().should('include', routes.TERMS_CONDITIONS)

        footer.elements.content().scrollIntoView();
        footer.elements.ogoloshennya().click();
        cy.url().should('include', routes.PRODUCTS) 
        footer.elements.searchInputAnnouncement().should('be.visible');
        footer.elements.searchInputAnnouncement().should('have.attr', 'placeholder', footerPlaceholders.announcementSearch);

        header.elements.logo().click();

        footer.elements.content().scrollIntoView();
        footer.elements.tenderi().find('a').click();
        cy.url().should('include', routes.TENDERS_MAP)
        footer.elements.searchInputTenders().should('be.visible');
        footer.elements.searchInputTenders().should('have.attr', 'placeholder', footerPlaceholders.tendersSearch);

        header.elements.logo().click();

        footer.elements.content().scrollIntoView(); 
    });

});