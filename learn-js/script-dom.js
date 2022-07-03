const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";

container.appendChild(content);

/*
1. a <p> with red text that says “Hey I’m red!”
2. an <h3> with blue text that says “I’m a blue h3!”
3. a <div> with a black border and pink background color 
with the following elements inside of it:
- another <h1> that says “I’m in a div”
- a <p> that says “ME TOO!”
- Hint for this one: after creating the <div> with createElement, 
append the <h1> and <p> to it before adding it to the container.
*/

const redText = document.createElement("p");
redText.setAttribute("style", "color: red;");
redText.textContent = "Hey I’m red!";

container.appendChild(redText);

const blueText = document.createElement("h3");
blueText.setAttribute("style", "color: blue");
blueText.textContent = "I’m a blue h3!";

container.appendChild(blueText);

const div = document.createElement("div");
// parent.setAttribute('');
div.style.border = "solid black";
div.style.backgroundColor = "pink";

const h1 = document.createElement("h1");
h1.textContent = "I’m in a div";

const p = document.createElement('p');
p.textContent='ME TOO!';

div.appendChild(h1);
div.appendChild(p);

container.appendChild(div);