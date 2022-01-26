const canvas = document.querySelector("canvas-component");
let count = 1;
let gridView = true;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event, isNav) {
  event.dataTransfer.setData("targetNodeId", event.target.id);
  event.dataTransfer.setData("isNav", isNav);
}

function drop(event) {
  const canvasRoot = canvas.shadowRoot;
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
    position: relative;
    `;
    event.target.appendChild(newDiv);
    count++;
  } else {
    const chartToMove = canvasRoot.getElementById(nodeId);
    event.target.appendChild(chartToMove);
  }
}

function remove(event) {
  const nodeId = event.dataTransfer.getData("targetNodeId");
  const chartToDelete = canvas.shadowRoot.getElementById(nodeId);
  chartToDelete.remove();
}

function loadFile(event) {
  const formRoot = canvas.shadowRoot.querySelector("img-upload").shadowRoot;
  var image = formRoot.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
  image.style.cssText = `
  overflow: auto;
    position: relative;
    width: 15vw;
    height:25vh;

  `;
  const imgInput = formRoot.getElementById("imgInput");
  imgInput.remove();
}

function toggleGrid() {
  gridView = !gridView;
  const page = canvas.shadowRoot.querySelector("#canvas");
  const gridSlots = canvas.shadowRoot.querySelectorAll(".canvas__gridSlot");
  if (!gridView) {
    gridSlots.forEach((slot) => {
      slot.style.border = "none";
    });
    page.style.border = "none";
  } else {
    gridSlots.forEach((slot) => {
      slot.style.border = "1px solid red";
    });
    page.style.border = "2px solid rgb(85, 179, 255)";
  }
}
