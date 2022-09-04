import * as yup from "yup";
import regex from "../libs/regexValidators";

async function userValidator(request, response, next) {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido.")
      .required("Um email é obrigatório."),
    password: yup
      .string()
      .required("Uma senha é obrigatória.")
      .matches(
        regex.password,
        "Sua senha deve ter um mínimo de 8 caracteres com letras e números."
      ),
    passwordConfirmation: yup
      .string()
      .required.oneOf(
        [yup.ref("password"), null],
        "As senhas devem ser iguais"
      ),
  });

  await schema
    .validate(request.body)
    .then(() => next())
    .catch((err) => {
      return response.status(400).json({
        error: err.errors,
      });
    });
}

export default userValidator;
