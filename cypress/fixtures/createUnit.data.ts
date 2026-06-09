export const validUnit = {
    firstCategoryLabel: 'Будівельна техніка',
    secondCategoryLabel: 'Бурові установки',
    thirdCategoryLabel: 'палебійні установки',

    unitName: 'Namenamename',
    vehicleManufacturer: 'ABAC',
    adress: 'Київ,   Україна, Київська область',
};

export const images = ['1.png','2.jpg','3.png','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg', 'ks.jpg','rtx.jpg','water.png']
export const imagesRepeat = ['1.png','1.png']
export const notimage = ['0.txt']
export const bigimage = ['Bontecou_Lake_Milky_Way_panorama.jpg']
export const priceInputs = ['1234567890', '123 456', '123456  ', '  ', 'abc', '!@#$%.,']
export const priceInputExpect = ['123456789', '123456', '123456', '', '', '']

export const invalidInput = ['a', 'aaaaaaaaaaaaaaaaaaaaaaaaaa', '123456', '!@#$%', ' ', 'aaa ', 'aaa aaa']
export const surnameErrorResponse = [
    "Прізвище має містити щонайменше дві літери",
    "Введіть не більше 25 символів",
    "Прізвище має містити лише літери",
]
export const nameErrorResponse = [
    "Ім'я має містити щонайменше дві літери",
    "Введіть не більше 25 символів",
    "Ім'я має містити лише літери",
]
export const invalidPhoneInput = ['93', '9312345678', '!@#$%', ' ']
export const phoneErrorResponse = [
    "Введіть коректний мобільний номер телефону",
    "Це поле обов’язкове"
]

export const numberPrefix = '+380 '
export const phoneOperators = ['50', '66', '95', '99', '67', '68', '96', '97', '98', '63', '73', '93', '91', '92', '94'];
export const baseNumber = ' 123 4567';