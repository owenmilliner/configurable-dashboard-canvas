const canvas = document.querySelector("canvas-component");
let canvasRoot = "";

function allowDrop(event) {
  event.preventDefault();
}

function drag(event, isNav) {
  canvasRoot = canvas.shadowRoot;
  event.dataTransfer.setData("targetNodeId", event.target.id);
  event.dataTransfer.setData("isNav", isNav);
}

let count = 1;
function drop(event) {
  event.preventDefault();
  const fromNav = event.dataTransfer.getData("isNav");
  const nodeId = event.dataTransfer.getData("targetNodeId");

  if (fromNav === "true") {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = nodeId;
    newDiv.id = `web-component-${count}`;
    newDiv.draggable = true;
    newDiv.ondragstart = function (ev) {
      drag(ev);
    };
    newDiv.style.cssText = `
    height: fit-content;
    width: fit-content;
    border: 10px solid black;
    `;

    formPopUp();

    event.target.appendChild(newDiv);
    count++;
  } else {
    const chartToMove = canvasRoot.getElementById(nodeId);
    event.target.appendChild(chartToMove);
  }
}

function remove(event) {
  const nodeId = event.dataTransfer.getData("targetNodeId");
  const chartToDelete = canvasRoot.getElementById(nodeId);
  chartToDelete.remove();
}

function formPopUp() {
  const chartInputForm = document.createElement("div");
  chartInputForm.innerHTML = `<chart-form></chart-form>`;
  chartInputForm.id = "chartInputForm";
  canvasRoot = canvas.shadowRoot;
  const page = canvasRoot.getElementById("page");
  page.style.opacity = 0.2;
  canvasRoot.appendChild(chartInputForm);
}
