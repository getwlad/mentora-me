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
      .required("Necessário confirmar a senha.")
      .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
    user_type: yup
      .string()
      .required("Campo obrigatório")
      .test("test-user-type", "Entre um tipo de usuário correto", (value) => {
        return value !== "STUDENT" && value !== "MENTOR" ? false : true;
      }),
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
