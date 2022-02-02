const localStorage = window.localStorage;

let count = 1;
let gridView = true;
let borderView = true;
let canvasRoot = "";
let page = [0, 0];

function allowDrop(event) {
  event.preventDefault();
}

function drag(event, isNav) {
  event.dataTransfer.setData(
    "targetNodeId",
    event.target.id || event.target.children[1].id
  );
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
    newDiv.addEventListener("click", (event) => {
      event.path.forEach((item) => {
        if (/web-component/.test(item.id)) {
          localStorage.setItem("selectedComponentId", item.id);
        }
      });
    });

    event.target.appendChild(newDiv);
    count++;
  } else {
    const chartToMove = canvasRoot
      .getElementById("canvas")
      .shadowRoot.getElementById(nodeId);

    chartToMove.addEventListener("mouseup", (event) => {
      const canvasRoot = document
        .querySelector("app-container")
        .shadowRoot.querySelector("router-outlet")
        .querySelector("cdc-page").shadowRoot;

      const page = canvasRoot
        .querySelector("#canvas")
        .shadowRoot.querySelector("#page");

      const chart = page.querySelector("#canvas").querySelector(`#${nodeId}`);

      // need to make a wildcard
      const dimensions =
        chart.children[0].shadowRoot.querySelector("vaadin-chart");

      let height = dimensions.style.height;
      let width = dimensions.style.width;

      const svg = dimensions.shadowRoot
        .querySelector("#chart")
        .querySelector("svg");

      svg.setAttribute("height", `${height}`);
      svg.setAttribute("width", `${width}`);

      // svg.setAttribute("viewBox", `0 0 ${widthNopx} ${heightNopx}`);
    });
    event.target.appendChild(chartToMove);
  }
}

function remove(event) {
  const canvas = document
    .querySelector("app-container")
    .shadowRoot.querySelector("router-outlet")
    .querySelector("cdc-page").shadowRoot;
  const nodeId = event.dataTransfer.getData("targetNodeId");
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
  console.log(page);
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
      jsPDF: {
        unit: "mm",
        format: [page[0], page[1]],
        orientation: page[2],
      },
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

// pageLayout { orientation: "portrait", width: 224, height: 280 }
// const pageLayout = localStorage.getItem("pageLayout")
// const width = pageLayout.width

function clearCanvas() {
  localStorage.clear();
  const canvas = document
    .querySelector("app-container")
    .shadowRoot.querySelector("router-outlet")
    .querySelector("cdc-page")
    .shadowRoot.querySelector("canvas-component");

  const canvasGridSlots = canvas.shadowRoot.getElementById("canvas").children;

  const gridSlotKeys = Object.keys(canvasGridSlots);

  gridSlotKeys.forEach((gridSlot) => {
    if (canvasGridSlots[gridSlot].children.length !== 0) {
      canvasGridSlots[gridSlot].children[0].remove();
    }
  });
}
