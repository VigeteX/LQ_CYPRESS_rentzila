export const footerPlaceholders = {
  announcementSearch: "Пошук оголошень або послуг",
  tendersSearch: "Пошук тендера за ключовими словами",
};

export const unitsPlaceholders = {
  unitTitle: 'Заголовок оголошення',
};

export const searchMessages = {
  zeroResults: "Знайдено 0",
};

export const unitButtons = {
  active: "Активні",
  deactivated: "Деактивовані",
  waiting: "Очікуючі",
  rejected: "Відхилені",
}
export const emptyUnitsTitles = {
  active: "У Вас поки немає активних оголошень",
  deactivated: "У Вас поки немає деактивованих оголошень",
  waiting: "На жаль, у Вас поки немає поданих оголошень",
  rejected: "У Вас поки немає відхилених оголошень",
}
export const emptyCategoryUnitsTitles = {
  construction: 'Оголошення в категорії "Будівельна техніка" не знайдені',
  municipal: 'Оголошення в категорії "Комунальна техніка" не знайдені',
  warehouse: 'Оголошення в категорії "Складська техніка" не знайдені',
  
}


export const messages = {
  noUnitsByName: (name: string) => {
    let processedName = name.replace(/\s{2,}/g, ' ');

    if (processedName.length > 50) {
      processedName = processedName.substring(0, 50) + '...';
    }
    return `Оголошення за назвою "${processedName}" не знайдені`;
  },
};

export const authErrorMessages = {
  emptyField: "Поле не може бути порожнім",
  invalidEmailOrPhone: "Неправильний формат email або номера телефону",
  invalidPassword: "Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли",
  wrongEmailOrPassword: "Невірний e-mail або пароль",
};


export const categoryLabels = {
  all: 'Всі категорії',
  construction: 'Будівельна техніка',
  municipal: 'Комунальна техніка',
  warehouse: 'Складська техніка',
};

export const sortLabels = {
  name: 'по назві',
  data: 'по даті створення',
};

export const allowedCategories = {
  construction : /Бурові установки|Крани|Навантажувачі|Обладнання для спецтехніки|Підйомники|Техніка для земляних робіт/,
  municipal: /Аварійні машини|Дорожньо-прибиральна техніка|Клінінгове обладнання|Комунальні контейнери|Комунальні машини|Обладнання для комунальної техніки/,
  warehouse: /- Категорія 1|Обладнання для навантажувачів|Техніка для складування/,
  agricultural: /Ґрунтообробна техніка|Жатки|Інша сільгосптехніка|Картопляна техніка|Комбайни|Лісозаготівельна техніка|Обладнання|Післязбиральна техніка|Посівна та садильна техніка|Сільськогосподарська нерухомість|Техніка для внесення добрив|Техніка для заготівлі сіна|Техніка для поливу та зрошення|Техніка для саду та городу|Техніка для тваринництва|Техніка для транспортування|Трактори|/,
};

