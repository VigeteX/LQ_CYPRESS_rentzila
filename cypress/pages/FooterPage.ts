export class FooterPage {
  
  elements ={
    logo:() => cy.get('div[data-testid="logo"]').first(),

    content:() => cy.get('div[data-testid="content"]'),
    politikaKonfidenciinosti:() => cy.get('div[data-testid="politika-konfidenciinosti"]'),
    pravilaVikoristannyaFailivCookie:() => cy.get('div[data-testid="pravila-vikoristannya-failiv-cookie"]'),
    umoviDostupuTaKoristuvannya:() => cy.get('div[data-testid="umovi-dostupu-ta-koristuvannya"]'),
    
    toUsers:() => cy.get('div').contains("Користувачам"),
    ogoloshennya:() => cy.get('div[data-testid="ogoloshennya"]'),
    tenderi:() => cy.get('div[data-testid="tenderi"]'),
    zapitiNaRobotu:() => cy.get('div[data-testid="zapiti-na-robotu"]'),
    
    contacts:() => cy.get('div').contains("Контакти"),
    email:() => cy.get('a[href="mailto:info@rentzila.com.ua"]').contains("info@rentzila.com.ua"),

    futterLogo:() => cy.get('div[data-testid="content"]').parent().parent().find('div[data-testid="logo"]'),
    copyright:() => cy.get('div[data-testid="copyright"]'),

    politikaKonfidenciinostiLabel:() => cy.get('h1').contains("Політика конфіденційності"), // /privacy-policy/
    pravilaVikoristannyaFailivCookieLabel:() => cy.get('h1').contains("Політика використання файлів cookie"), // /cookie-policy/
    umoviDostupuTaKoristuvannyaLabel:() => cy.get('h1').contains("Угода користувача"), // /terms-conditions/
    searchInputAnnouncement:() => cy.get('input[data-testid="searchInput"]'), //Пошук оголошень або послуг /map/
    
    searchInputTenders:() => cy.get('input[placeholder="Пошук тендера за ключовими словами"]'), // Пошук тендера за ключовими словами /tenders-map/
    
  }
}

export default new FooterPage();