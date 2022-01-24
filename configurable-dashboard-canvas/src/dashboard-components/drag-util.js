const canvasRoot = document.querySelector("canvas-component");

function drag(event, isNav) {
  console.log(canvasRoot);
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.setData("isNav", isNav);
}

function allowDrop(event) {
  event.preventDefault();
}

let count = 1;
function drop(event) {
  event.preventDefault();
  const fromNav = event.dataTransfer.getData("isNav");
  const data = event.dataTransfer.getData("text");

  if (fromNav === "true") {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = data;
    newDiv.id = `chart${count}`;
    newDiv.draggable = true;
    newDiv.ondragstart = function (ev) {
      drag(ev);
    };
    newDiv.style.cssText = `
    height: fit-content;
    width: fit-content;
    border: 10px solid black;
    `;
    event.target.appendChild(newDiv);
    count++;
  } else {
    const chartToMove = canvasRoot.getElementById(data);
    event.target.appendChild(chartToMove);
  }
}

function remove(event) {
  const data = event.dataTransfer.getData("text");
  const chartToDelete = canvasRoot.getElementById(data);
  chartToDelete.remove();
}
