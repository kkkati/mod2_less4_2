import styles from "./app.module.css";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const fieldScheme = yup.object().shape({
  email: yup
    .string()
    .max(20, "Неверный email. Должно быть не более 20 символов")
    .min(7, "Неверный email. Должно быть не менее 7 символов")
    .email("Неверный email"),
  password1: yup
    .string()
    .min(3, "Неверный пароль, должно быть не менее 3 символов")
    .matches(
      /^[\w_]*$/,
      "Неверный пароль, можно использовать только латинские буквы, цифры, '_'"
    ),
  password2: yup
    .string()
    .min(3)
    .oneOf([yup.ref("password1")], "Набранные пароли отличаются"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password1: "",
      password2: "",
    },
    resolver: yupResolver(fieldScheme),
  });

  const emailError = errors.email?.message;
  const password1Error = errors.password1?.message;
  const password2Error = errors.password2?.message;

  const button = useRef(null);
  // useEffect(() => {
  if (isValid) {
    button.current.focus();
  }
  // }, [isValid]);

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        {emailError && <div className={styles.errorLabel}>{emailError}</div>}
        {password1Error && (
          <div className={styles.errorLabel}>{password1Error}</div>
        )}
        {password2Error && (
          <div className={styles.errorLabel}>{password2Error}</div>
        )}
        <input type="email" name="email" {...register("email")}></input>
        <input
          type="password"
          name="password"
          {...register("password1")}
        ></input>
        <input
          type="password"
          name="password"
          {...register("password2")}
        ></input>
        <button
          ref={button}
          type="submit"
          disabled={!!emailError || !!password1Error || password2Error}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default App;
