const hello = () => alert("Hello!");

//add onclick method to #btn
const btn = document.querySelector("#btn");
// btn.onclick = () => alert("Hi :)");

// add eventListener when user click -> do the function
const btn2 = document.querySelector("#btn2");
btn2.addEventListener("click", () => alert("Hello! It's me again."));

btn.addEventListener('click', function (e) {
    console.log(e.target);
    e.target.style.background = 'blue';
  });
