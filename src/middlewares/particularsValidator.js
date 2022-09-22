import * as yup from "yup";
import regex from "../libs/regexValidators";

async function particularsValidator(request, response, next) {
  const schema = yup.object().shape({
    theory: yup
      .string()
      .required("Característica theory obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    practice: yup
      .string()
      .required("Característica practice obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    mentoringInGroup: yup
      .string()
      .required("Característica mentoring in group obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    mentoringIndividual: yup
      .string()
      .required("Característica mentoring individual obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    libras: yup
      .string()
      .required("Característica livras obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
    minorityGroups: yup
      .string()
      .required("Característica minority groups obrigatória.")
      .matches(regex.validScale, "Preencha numa escala de 1 a 3."),
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

export default particularsValidator;
