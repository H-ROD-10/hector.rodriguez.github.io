const forms = document.getElementById("form-contact");
const inputs = document.querySelectorAll("#form-contact #inputs");

const expressions = {
  user: /^[a-zA-ZA-ÿ\s]{4,50}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  content: /^[a-zA-Z0-9_.,+-\s]{4,160}$/,
};

const fields = {
  user: false,
  email: false,
  message: false,
};

const validatedForm = (e) => {
  switch (e.target.name) {
    case "user":
      fieldValidate(expressions.user, e.target, "user");
      break;
    case "email":
      fieldValidate(expressions.email, e.target, "email");
      break;
    case "content":
      fieldValidate(expressions.content, e.target, "message");
      break;
  }
};

function fieldValidate(expresion, input, field) {
  if (expresion.test(input.value)) {
    document.getElementById(`${field}`).classList.remove("error_validate");
    document.getElementById("form_error").classList.remove("error_validate");
    fields[field] = true;
  } else {
    document.getElementById(`${field}`).classList.add("error_validate");
    fields[field] = false;
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", validatedForm);
  input.addEventListener("blur", validatedForm);
});

forms.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (fields.user && fields.email && fields.message) {
    await emailjs
      .sendForm("portafolio_hector", "template_kqimwvr", e.target)
      .then(
        function (response) {
          if (response.status === 200) {
            forms.reset();
            document
              .getElementById("form_success")
              .classList.add("message_success");
            setTimeout(() => {
              document
                .getElementById("form_success")
                .classList.remove("message_success");
            }, 4000);
          }
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  } else {
    document.getElementById("form_error").classList.add("error_validate");
  }
});
