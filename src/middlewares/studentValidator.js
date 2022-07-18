const yup = require("yup");
const regex = require("../libs/regexValidators");

async function studentValidator(request, response, next) {
  const schema = yup.object().shape({
    name: yup.string().required("Seu nome é obrigatório."),
    email: yup
      .string()
      .email("Email inválido.")
      .required("Seu email é obrigatório."),
    password: yup
      .string()
      .required("Sua senha é obrigatória.")
      .min(8, "A senha deve ter um mínimo de 8 caracteres.")
      .matches(regex.password, "A senha deve conter letras e números."),
    CPF: yup
      .string()
      .required("Seu CPF é obrigatório")
      .matches(regex.validCPF, "CPF inválido"),
    phone: yup
      .string()
      .required("Seu telefone é obrigatório")
      .matches(regex.phoneNumber, "Telefone inválido"),
  });

  if (!(await schema.isValid(request.body))) {
    return response
      .status(400)
      .json({ error: "O cadastro não foi concluído. Tente novamente." });
  }
  next();
}

module.exports = studentValidator;
