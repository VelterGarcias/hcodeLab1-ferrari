const authPage = document.querySelector("main#auth");

if (authPage) {
  console.log("aqui");
  const hideAuthForms = () => {
    document.querySelectorAll("#auth form").forEach((el) => {
      el.classList.add("hide");
    });
  };

  const showAuthForm = (id) => {
    document.getElementById(id).classList.remove("hide");
  };

  const authHash = () => {
    hideAuthForms();
    switch (window.location.hash) {
      case "#register":
        showAuthForm("register");
        break;

      case "#login":
        showAuthForm("login");
        if (sessionStorage.getItem("email")) {
            // document.querySelector("#email-login").value = sessionStorage.getItem(
            //   "email"
            // );

          document
            .querySelectorAll("[name=email]")
            .forEach((el) => (el.value = sessionStorage.getItem("email")));
        }

        break;

      case "#forget":
        showAuthForm("forget");
        break;

      case "#reset":
        showAuthForm("reset");
        break;

      default:
        showAuthForm("auth-email");
        break;
    }
  };

  window.addEventListener("load", (e) => {
    authHash();
  });

  window.addEventListener("hashchange", (e) => {
    authHash();
  });

  const formAuthEmail = document.querySelector("#auth-email");

  formAuthEmail.addEventListener("submit", (e) => {
    e.preventDefault();
    //   e.stopPropagation() // para evitar propagações caso precise
    const btnSubmit = e.target.querySelector("[type=submit]");

    btnSubmit.disabled = true;

    sessionStorage.setItem("email", formAuthEmail.email.value);
    location.hash = "#login";
    btnSubmit.disabled = false;
  });
}
// sessionStorage.getItem('email')
