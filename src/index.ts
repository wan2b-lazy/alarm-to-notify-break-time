const greet: () => string = () => "hello world";
const divElem = document.createElement("div");
const p = document.createElement("p");

p.textContent = greet();
divElem.appendChild(p);
document.body.appendChild(divElem);
