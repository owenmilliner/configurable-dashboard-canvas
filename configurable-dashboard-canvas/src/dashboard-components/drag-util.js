
let count = 1;
let gridView = true;
let canvasRoot = "";

function allowDrop(event) {
  event.preventDefault();
}

function drag(event, isNav) {
  event.dataTransfer.setData("targetNodeId", event.target.id);
  event.dataTransfer.setData("isNav", isNav);
}

function drop(event) {
    const canvasRoot = document.querySelector("app-container").shadowRoot.querySelector("router-outlet").querySelector("cdc-page").shadowRoot
  event.preventDefault();
  const fromNav = event.dataTransfer.getData("isNav");
  const nodeId = event.dataTransfer.getData("targetNodeId");
  console.log(nodeId)

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
    const chartToMove = canvasRoot.getElementById("canvas").shadowRoot.getElementById(nodeId)
    event.target.appendChild(chartToMove);
  }
}

function remove(event) {
    const canvas = document.querySelector("app-container").shadowRoot.querySelector("router-outlet").querySelector("cdc-page").shadowRoot
  const nodeId = event.dataTransfer.getData("targetNodeId");
  const chartToDelete = canvas.getElementById("canvas").shadowRoot.getElementById(nodeId)
  chartToDelete.remove();
}

function toggleGrid() {
    
    const canvas = document.querySelector("app-container").shadowRoot.querySelector("router-outlet").querySelector("cdc-page").shadowRoot
    console.log(canvas)
  gridView = !gridView;
  const page = canvas.querySelector("#canvas").shadowRoot.getElementById("canvas");
  console.log(page)
  const gridSlots = canvas.querySelector("#canvas").shadowRoot.querySelectorAll(".canvas__gridSlot");
  console.log(gridSlots)
  if (!gridView) {
    gridSlots.forEach((slot) => {
      slot.style.border = "none";
    });
    page.style.border = "none";
  } else {
    gridSlots.forEach((slot) => {
      slot.style.border = "0.5px solid #06152c";
    });
    page.style.border = "2px solid #06152c";
  }
}
function pdf() {
  html2canvas(
    document.querySelector("app-container").shadowRoot.querySelector("router-outlet").querySelector("cdc-page").shadowRoot.querySelector("canvas-component").shadowRoot.getElementById("page")
  ).then((image) => {
    const opt = {
      margin: 0,
      filename: "myfile.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 1, allowTaint: true },
      jsPDF: { unit: "mm", format: [231, 319], orientation: "portrait" },
    };
    html2pdf().set(opt).from(image).save();
  });
}