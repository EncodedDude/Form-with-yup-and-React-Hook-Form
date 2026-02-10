import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./App.module.css";
import { fieldSchemes } from "./ValidationForm";
import { useEffect, useRef } from "react";

const initialValues = {
    email: "",
    password: "",
    passwordConfirm: "",
};

const sendFormData = ({email, password}, reset) => {
    console.log({email, password});
    reset();
};

function App() {
    const {
        register,
        handleSubmit,
        reset,
        trigger,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(fieldSchemes),
    });
    const submitButtonRef = useRef(null);

    let formErrors = [errors.email?.message, errors.password?.message, errors.passwordConfirm?.message];

    let isFormValid = formErrors.every(error => !!error === false);

    const handlePasswordConfirm = () => {
        trigger('passwordConfirm');
    }

    useEffect(() => {
        if (isFormValid) {
            submitButtonRef.current.focus();
        }
    }, [isFormValid]);

    return (
        <>
            <div className={styles["page-form"]}>
                <h1 className={styles.title}>Регистрация</h1>
                <form
                    className={styles.form}
                    onSubmit={handleSubmit((data) => sendFormData(data, reset))}
                >
                    {!isFormValid && (
                        <div className={styles.errors}>
                            {formErrors.map((error, index) => (
                                <div className={styles.error} key={index}>{error}</div>
                            ))}
                        </div>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Почта"
                        {...register("email")}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        {...register("password", {onChange: handlePasswordConfirm})}
                        className={styles.input}
                    />
                    <input
                        type="password"
                        name="passwordConfirm"
                        placeholder="Подтвердите пароль"
                        {...register("passwordConfirm")}
                        className={styles.input}
                    />
                    <button ref={submitButtonRef} type="submit" className={styles.button} disabled={!isFormValid}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </>
    );
}

export default App;
