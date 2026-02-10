import * as yup from "yup";

export const fieldSchemes = yup.object().shape({
    email: yup
        .string()
        .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Упс... Убедитесь в правильности формата почты. Например: qwerty123@qwerty.ru",
        ),
    password: yup
        .string()
        // .oneOf([yup.ref('passwordConfirm')], 'Упс... Пароли должны совпадать')
        .matches(
            /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
            "Упс... Пароль должен состоять из латинских букв и содержать хотя бы одну заглавную букву и цифру",
        ),
    passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Упс... Пароли должны совпадать'),
});