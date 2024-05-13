const getById = id => {
  return document.getElementById(id);
};

const password = getById("password");
const confirmPassword = getById("confirm-password");
const form = getById("form");
const container = getById("container");
const loader = getById("loader");
const button = getById("submit");
const error = getById("error");
const success = getById("success");

error.style.display = "none";
success.style.display = "none";
container.style.display = "none";

let token, userId;

const passRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

window.addEventListener("DOMContentLoaded", async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => {
      return searchParams.get(prop);
    },
  });
  token = params.token;
  userId = params.userId;

  const res = await fetch("/auth/verify-pass-reset-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
      userId,
    }),
  });

  if (!res.ok) {
    const {error} = await res.json();
    loader.innerText = error;
    return;
  }

  loader.style.display = "none";
  container.style.display = "block";
});

const dispalyError = errorMessage => {
  success.style.display = "none";
  error.innerText = errorMessage;
  error.style.display = "block";
};
const dispalySuccess = successMessage => {
  error.style.display = "none";
  success.innerText = successMessage;
  success.style.display = "block";
};

//form submittion

const handleSubmit = async evt => {
  evt.preventDefault();
  //validate
  if (!password.value.trim()) {
    //render error
    return dispalyError("Password is missing");
  }
  if (!passRegex.test(password.value)) {
    //render error
    return dispalyError("password doesnot meet the requirement");
  }
  if (password.value !== confirmPassword.value) {
    //render error
    return dispalyError("password doesnot match");
  }
  button.disabled = true;
  button.innerText = "Please wait ...";

  const res = await fetch("/auth/update-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token,
      userId,
      password: password.value,
    }),
  });
  button.disabled = false;
  button.innerText = "Reset Password ";

  if (!res.ok) {
    const {error} = await res.json();
    return dispalyError(error);
  }

  dispalySuccess("Your password has been upadated!");
  password.value = "";
  confirmPassword.value = "";
};

form.addEventListener("submit", handleSubmit);
