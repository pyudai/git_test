const pwd = document.getElementById("pwd");
const confirmPwd = document.getElementById("confirm-pwd");
const err = document.createElement("div");
err.textContent = "* Passwords do not match";
err.style.color = "red";
err.style.fontSize = "0.6rem";

function checkPwdMatch() {
  pwd.addEventListener("input", checkPwdMatch);
  console.log("pwd", pwd.value);
  console.log(pwd.parentElement);
  if (confirmPwd.value === pwd.value) {
    pwd.classList.remove("error");
    pwd.parentElement.removeChild(err);
    confirmPwd.classList.remove("error");
  } else {
    pwd.classList.add("error");
    pwd.parentElement.appendChild(err);
    confirmPwd.classList.add("error");
  }
}

confirmPwd.addEventListener("input", checkPwdMatch);
