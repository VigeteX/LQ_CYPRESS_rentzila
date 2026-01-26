import { isEmpty } from "cypress/types/lodash";

export const validUser = {
    email: 'tttest0tttest@gmail.com',
    password: 'Tttest0tttest@gmail.com',
};
export const validPhones = [
    '+380509998667',
    '380509998667',
    '0509998667',
];

export const invalidEmails = [
    'tttest 0tttest@gmail.com',
    'еуіегіуккутеяшдф',
    'еееуіе0еееуіе',
    'tttest0tttestgmail.com',
    'tttest0tttest@gmailcom',
    'tttest0tttest@gmail',
    'tttest0tttest@.com',
    'tttest0tttest',
    'tttest0tttest@@gmail.com',
];

export const invalidPasswords = [
    'Tttest0tttest@gmail.com ',
    ' Tttest0tttest@gmail.com',
    'tttest0tttest@gmail.com',
    'TTTEST0TTTSET@GMAIL.COM',
    'Еееуіе0еееуіе@пьфшд.сщь',
];

export const invalidPhones = [
    '509998667',
    '050999866',
    '+380-50-999-8667',
    '+380 50 999 8667',
    '+380(50)9998667',
    '05099986677',
    '+10509998667',
    '+0509998667',
]

export const wrongPassword = 'Tttest1tttest@gmail.com';

export const errorMessages = {
    emptyField: 'Поле не може бути порожнім',
    invalidEmeilOrPhone: 'Неправильний формат email або номера телефону',
    invalidPassword: 'Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли',
    wrongEmeilOrPassword: 'Невірний e-mail або пароль',
};