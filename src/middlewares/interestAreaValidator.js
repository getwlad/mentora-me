import * as yup from "yup";
import regex from "../libs/regexValidators";

async function interestAreaValidator(request, response, next) {
  const schema = yup.object().shape({
    mentoringArea: yup
      .string()
      .required("Nome obrigatório.")

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

export default interestAreaValidator;
