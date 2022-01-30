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
    const canvasRoot = document.querySelector("canvas-component").shadowRoot;
    const chartToMove = canvasRoot.getElementById(nodeId);
    event.target.appendChild(chartToMove);
  }
}

function remove(event) {
  const nodeId = event.dataTransfer.getData("targetNodeId");
  const chartToDelete = document
    .querySelector("canvas-component")
    .shadowRoot.getElementById(nodeId);
  chartToDelete.remove();
}

function toggleGrid() {
  gridView = !gridView;
  const page = document
    .querySelector("canvas-component")
    .shadowRoot.querySelector("#canvas");
  const gridSlots = document
    .querySelector("canvas-component")
    .shadowRoot.querySelectorAll(".canvas__gridSlot");
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

function pdf() {
  html2canvas(
    document.querySelector("canvas-component").shadowRoot.getElementById("page")
  ).then((image) => {
    var opt = {
      margin: 0,
      filename: "myfile.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 1, allowTaint: true },
      jsPDF: { unit: "mm", format: [231, 319], orientation: "portrait" },
    };

    html2pdf().set(opt).from(image).save();
  });
}
