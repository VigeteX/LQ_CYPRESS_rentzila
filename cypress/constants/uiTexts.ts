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

export const messages = {
  noUnitsByName: (name: string) =>
    `Оголошення за назвою "${name}" не знайдені`,
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

export const allowedCategories = {
  municipal: /Аварійні машини|Дорожньо-прибиральна техніка|Клінінгове обладнання|Комунальні контейнери|Комунальні машини|Обладнання для комунальної техніки/,
  
  warehouse: /- Категорія 1|Обладнання для навантажувачів|Техніка для складування/,
};