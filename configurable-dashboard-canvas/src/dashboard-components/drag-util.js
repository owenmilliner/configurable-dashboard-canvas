const localStorage = window.localStorage;

let count = 1;
let gridView = true;
let borderView = true;
let canvasRoot = "";

function allowDrop(event) {
  event.preventDefault();
}

function drag(event, isNav) {
  event.dataTransfer.setData("targetNodeId", event.target.children[1].id);
  event.dataTransfer.setData("isNav", isNav);
}

function drop(event) {
  const canvasRoot = document
    .querySelector("app-container")
    .shadowRoot.querySelector("router-outlet")
    .querySelector("cdc-page").shadowRoot;
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
    border: 10px solid #4bd8d4;
    position: relative;
    `;
    event.target.appendChild(newDiv);
    count++;
  } else {
    const chartToMove = canvasRoot
      .getElementById("canvas")
      .shadowRoot.getElementById(nodeId);
    event.target.appendChild(chartToMove);
  }
}

function remove(event) {
  const canvas = document
    .querySelector("app-container")
    .shadowRoot.querySelector("router-outlet")
    .querySelector("cdc-page").shadowRoot;
  const nodeId = event.dataTransfer.getData("targetNodeId");
  console.log(nodeId);
  const chartToDelete = canvas
    .getElementById("canvas")
    .shadowRoot.getElementById(nodeId);
  chartToDelete.remove();
}

function toggleGrid() {
  gridView = !gridView;
  const canvas = document
    .querySelector("app-container")
    .shadowRoot.querySelector("router-outlet")
    .querySelector("cdc-page").shadowRoot;
  const page = canvas
    .querySelector("#canvas")
    .shadowRoot.getElementById("canvas");
  const gridSlots = canvas
    .querySelector("#canvas")
    .shadowRoot.querySelectorAll(".canvas__gridSlot");
  if (!gridView) {
    gridSlots.forEach((slot) => {
      slot.style.border = "none";
    });
    page.style.border = "none";
  } else {
    gridSlots.forEach((slot) => {
      slot.style.border = "0.5px solid RGB(6, 21, 44,0.05)";
    });
    page.style.border = "2px solid RGB(6, 21, 44,0.05)";
  }
}

function toggleBorders() {
  borderView = !borderView;
  const canvas = document
    .querySelector("app-container")
    .shadowRoot.querySelector("router-outlet")
    .querySelector("cdc-page").shadowRoot;
  const componentsWithBorders = canvas
    .querySelector("#canvas")
    .shadowRoot.querySelectorAll("[id*='web-component']");
  if (!borderView) {
    componentsWithBorders.forEach((component) => {
      component.style.border = "none";
    });
  } else {
    componentsWithBorders.forEach((component) => {
      component.style.border = "10px solid #4bd8d4";
    });
  }
}

function pdf() {
  let gridChanged = false;
  let borderChanged = false;
  if (gridView) {
    toggleGrid();
    gridChanged = true;
  }
  if (borderView) {
    toggleBorders();
    borderChanged = true;
  }
  html2canvas(
    document
      .querySelector("app-container")
      .shadowRoot.querySelector("router-outlet")
      .querySelector("cdc-page")
      .shadowRoot.querySelector("canvas-component")
      .shadowRoot.getElementById("page")
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
  if (gridChanged) {
    toggleGrid();
  }
  if (borderChanged) {
    toggleBorders();
  }
}
function clearCanvas() {
  localStorage.clear();
  const canvas = document
    .querySelector("app-container")
    .shadowRoot.querySelector("router-outlet")
    .querySelector("cdc-page")
    .shadowRoot.querySelector("canvas-component");
  const canvasGridSlots = canvas.shadowRoot.children[1].children[0].children;
  const gridSlotKeys = Object.keys(canvasGridSlots);
  gridSlotKeys.forEach((gridSlot) => {
    if (canvasGridSlots[gridSlot].children.length !== 0) {
      console.log(canvasGridSlots[gridSlot].children[0]);
      canvasGridSlots[gridSlot].children[0].remove();
    }
  });
}
