const canvas = document.querySelector("canvas-component");
var canvasRoot = "";

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
    position: relative;;
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
  const chartToDelete = canvasRoot.getElementById(nodeId);
  chartToDelete.remove();
}

// function loadFile(event) {
//   const formRoot = canvasRoot.querySelector("img-upload").shadowRoot;
//   var image = formRoot.getElementById("output");
//   image.src = URL.createObjectURL(event.target.files[0]);
//   console.log(formRoot);
//   const imgInput = formRoot.getElementById("imgFile");
//   imgInput.remove();
// }
