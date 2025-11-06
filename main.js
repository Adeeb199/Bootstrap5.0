// ----- Classes for different types -----
export const divClasses = [
  "container","container-sm","container-md","container-lg","container-xl","container-xxl",
  "g-0","g-1","g-2","g-3","g-4","g-5",
  "mt-0","mt-1","mt-2","mt-3","mt-4","mt-5",
  "mb-0","mb-1","mb-2","mb-3","mb-4","mb-5",
  "ms-0","ms-1","ms-2","ms-3","ms-4","ms-5",
  "me-0","me-1","me-2","me-3","me-4","me-5",
  "p-0","p-1","p-2","p-3","p-4","p-5",
  "d-block","d-flex","d-inline","d-inline-block","d-inline-flex",
  "justify-content-start","justify-content-center","justify-content-end","justify-content-between","justify-content-around","justify-content-evenly",
  "align-items-start","align-items-center","align-items-end","align-items-baseline","align-items-stretch",
  "flex-row","flex-row-reverse","flex-column","flex-column-reverse","flex-wrap","flex-nowrap",
  "position-relative","position-absolute","position-fixed","position-sticky",
  "bg-primary","bg-secondary","bg-success","bg-danger","bg-warning","bg-info","bg-light","bg-dark","bg-white","bg-transparent",
  "border","border-0","border-top","border-end","border-bottom","border-start","rounded","rounded-top","rounded-end","rounded-bottom","rounded-start","rounded-circle","rounded-pill",
  "shadow","shadow-sm","shadow-lg"
];

export const rowClasses = [
  "row","row-cols-1","row-cols-2","row-cols-3","row-cols-4","row-cols-5","row-cols-6",
  "g-0","g-1","g-2","g-3","g-4","g-5",
  "align-items-start","align-items-center","align-items-end","align-items-baseline","align-items-stretch",
  "justify-content-start","justify-content-center","justify-content-end","justify-content-between","justify-content-around","justify-content-evenly",
  "flex-row","flex-row-reverse","flex-column","flex-column-reverse","flex-wrap","flex-nowrap"
];

export const colClasses = [
  "col","col-auto","col-1","col-2","col-3","col-4","col-5","col-6","col-7","col-8","col-9","col-10","col-11","col-12",
  "p-0","p-1","p-2","p-3","p-4","p-5",
  "m-0","m-1","m-2","m-3","m-4","m-5",
  "d-block","d-flex","d-inline","d-inline-block","d-inline-flex",
  "bg-primary","bg-secondary","bg-success","bg-danger","bg-warning","bg-info","bg-light","bg-dark","bg-white","bg-transparent",
  "border","border-0","border-top","border-end","border-bottom","border-start","rounded","rounded-top","rounded-end","rounded-bottom","rounded-start","rounded-circle","rounded-pill",
  "shadow","shadow-sm","shadow-lg"
];

export const imgClasses = [
  "img-fluid","img-thumbnail","img-rounded","rounded","rounded-circle","rounded-pill",
  "d-block","d-inline-block","mx-auto","img-fit","img-cover",
  "border","border-0","border-top","border-end","border-bottom","border-start",
  "shadow","shadow-sm","shadow-lg"
];

export const textClasses = [
  "text-start","text-center","text-end",
  "text-primary","text-secondary","text-success","text-danger","text-warning","text-info","text-light","text-dark","text-body","text-muted","text-white","text-black-50","text-white-50",
  "fw-light","fw-normal","fw-bold",
  "fst-italic","fst-normal",
  "fs-1","fs-2","fs-3","fs-4","fs-5","fs-6",
  "lh-1","lh-sm","lh-base","lh-lg",
  "text-decoration-none","text-decoration-underline","text-decoration-line-through",
  "text-wrap","text-nowrap","text-break",
  "text-lowercase","text-uppercase","text-capitalize"
];

// ----- DOM Elements -----
const previewBox = document.getElementById("previewBox");
const codeBlock = document.getElementById("codeBlock");
const parentSelect = document.getElementById("parentSelect");
const elementTypeSelect = document.getElementById("elementType");
const elementContentInput = document.getElementById("elementContent");

// ----- Layout State -----
let layout = JSON.parse(localStorage.getItem("layout")) || [];
let deletedIds = JSON.parse(localStorage.getItem("deletedIds")) || [];
let elementIdCounter = layout.length ? Math.max(...getAllIds(layout)) + 1 : 1;

// Restore classes for persisted elements
function restoreClasses(arr) {
  arr.forEach(el => {
    if (!Array.isArray(el.classes)) el.classes = [];
    if (!el.children) el.children = [];
    if (el.children.length) restoreClasses(el.children);
  });
}
restoreClasses(layout);

// ----- Helper Functions -----
function getAllIds(arr) {
  let ids = [];
  arr.forEach(e => {
    ids.push(e.id);
    if (e.children && e.children.length) ids.push(...getAllIds(e.children));
  });
  return ids;
}

function findElementById(arr, id) {
  for (let el of arr) {
    if (el.id === id) return el;
    if (el.children && el.children.length) {
      let f = findElementById(el.children, id);
      if (f) return f;
    }
  }
  return null;
}

function getAllDivs(arr) {
  let divs = [];
  arr.forEach(e => {
    if (["div","row","col"].includes(e.type)) divs.push(e);
    if (e.children && e.children.length) divs.push(...getAllDivs(e.children));
  });
  return divs;
}

function updateParentOptions() {
  parentSelect.innerHTML = "";
  const rootOption = document.createElement("option");
  rootOption.value = "root";
  rootOption.text = "-- Root --";
  parentSelect.appendChild(rootOption);

  getAllDivs(layout).forEach(d => {
    const o = document.createElement("option");
    o.value = d.id;
    o.text = `${d.type} (ID:${d.id})`;
    parentSelect.appendChild(o);
  });
}

function saveLayout() {
  localStorage.setItem("layout", JSON.stringify(layout));
  localStorage.setItem("deletedIds", JSON.stringify(deletedIds));
}

// ----- Element Factory -----
function createElement(type, content = "") {
  const id = deletedIds.length ? deletedIds.shift() : elementIdCounter++;
  const el = { id, type, children: [], classes: [], content };

  if (type === "div") el.classes = ["container"];
  if (type === "row") el.classes = ["row","align-items-center"];
  if (type === "col") el.classes = ["col"];
  if (type === "title") el.classes = ["fs-4","fw-bold"];
  if (type === "desc") el.classes = ["fs-6"];
  if (type === "img") el.classes = ["img-box","img-fluid","d-block"];

  return el;
}

// ----- Rendering -----
// ----- Rendering -----
function renderElement(el) {
  let box;

  if (el.type === "title" || el.type === "desc") {
    // ✅ wrapper div for controls and label
    box = document.createElement("div");
    box.classList.add("element-box", "position-relative", "p-2");

    const tag = el.type === "title" ? "h3" : "p";
    const textEl = document.createElement(tag);
    textEl.textContent = el.content;
    el.classes.forEach(cls => textEl.classList.add(cls));
    textEl.dataset.innerEl = "true"; // marker for identification
    box.appendChild(textEl);

  } else if (el.type === "img") {
    box = document.createElement("div");
    box.classList.add("element-box", "position-relative", "text-center", "p-2");

    const img = document.createElement("img");
    img.src = el.content;
    el.classes.forEach(cls => img.classList.add(cls));
    img.dataset.innerEl = "true";
    box.appendChild(img);

  } else {
    box = document.createElement("div");
    box.classList.add("element-box");
    el.classes.forEach(cls => box.classList.add(cls));
  }

  // Add class label
  const clsLabel = document.createElement("span");
  clsLabel.className = "element-class-label";
  clsLabel.textContent = "Classes: " + el.classes.join(" ");
  box.appendChild(clsLabel);

  // Render children recursively
  if (el.children && el.children.length) {
    el.children.forEach(c => box.appendChild(renderElement(c)));
  }

  // Controls
  const controls = document.createElement("div");
  controls.className = "element-controls";

  const classBtn = document.createElement("button");
  classBtn.textContent = "Classes";
  classBtn.className = "btn btn-sm btn-secondary";
  classBtn.onclick = e => { e.stopPropagation(); openClassSelector(el, box, clsLabel); };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "btn btn-sm btn-danger";
  deleteBtn.onclick = e => { e.stopPropagation(); deleteElement(el); };

  controls.appendChild(classBtn);
  controls.appendChild(deleteBtn);
  box.appendChild(controls);

  return box;
}
// ----- Class Selector -----
function openClassSelector(el, box, clsLabel) {
  document.querySelectorAll(".class-popup").forEach(p => p.remove());
  const popup = document.createElement("div");
  popup.className = "class-popup";

  const header = document.createElement("div");
  header.className = "class-popup-header";
  const title = document.createElement("span");
  title.textContent = el.type.toUpperCase() + " Classes";
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => popup.remove();
  header.appendChild(title);
  header.appendChild(closeBtn);
  popup.appendChild(header);

  let classesList = [];
  if (el.type === "div") classesList = divClasses;
  else if (el.type === "row") classesList = rowClasses;
  else if (el.type === "col") classesList = colClasses;
  else if (el.type === "img") classesList = imgClasses;
  else if (el.type === "title" || el.type === "desc") classesList = textClasses;

  const container = document.createElement("div");
  container.className = "class-container";

  classesList.forEach(cls => {
    const btn = document.createElement("span");
    btn.textContent = cls;
    btn.className = "class-btn" + (el.classes.includes(cls) ? " active" : "");
    btn.onclick = () => {
      // toggle class
      if (el.classes.includes(cls)) el.classes = el.classes.filter(c => c !== cls);
      else el.classes.push(cls);

      Array.from(container.children).forEach(c =>
        c.classList.toggle("active", el.classes.includes(c.textContent))
      );

      // ✅ Apply updated classes correctly
      let targetEl = box.querySelector("[data-inner-el='true']");
      if (targetEl) {
        targetEl.className = "";
        el.classes.forEach(c => targetEl.classList.add(c));
      } else {
        // for div, row, col
        box.className = "element-box";
        el.classes.forEach(c => box.classList.add(c));
      }

      // Update label + HTML code
      clsLabel.textContent = "Classes: " + el.classes.join(" ");
      saveLayout();
      codeBlock.textContent = sortElementsRecursively(layout).map(generateHTML).join("\n");
    };
    container.appendChild(btn);
  });

  popup.appendChild(container);
  document.body.appendChild(popup);
  const rect = box.getBoundingClientRect();
  popup.style.top = window.scrollY + rect.top + rect.height + 5 + "px";
  popup.style.left = window.scrollX + rect.left + "px";
}

// ----- Delete Element -----
function deleteElement(el) {
  function removeById(arr,id){
    for(let i=arr.length-1;i>=0;i--){
      if(arr[i].id===id){ deletedIds.push(arr[i].id); arr.splice(i,1); return true; }
      if(arr[i].children && arr[i].children.length){ if(removeById(arr[i].children,id)) return true; }
    }
    return false;
  }
  removeById(layout,el.id);
  updateParentOptions();
  saveLayout();
  renderPreview();
}

function renderPreview() {
  previewBox.innerHTML = "";
  const sortedLayout = sortElementsRecursively(layout);
  sortedLayout.forEach(el => previewBox.appendChild(renderElement(el)));
  codeBlock.textContent = sortedLayout.map(generateHTML).join("\n");
}

function sortElementsRecursively(arr) {
  return arr.slice().sort((a,b)=>a.id-b.id)
    .map(el=>({...el, children: sortElementsRecursively(el.children||[])}));
}

function generateHTML(el){
  if(el.type==="title") return `<h3 id="id-${el.id}" class="${el.classes.join(" ")}">${el.content}</h3>`;
  if(el.type==="desc") return `<p id="id-${el.id}" class="${el.classes.join(" ")}">${el.content}</p>`;
  if(el.type==="img") return `<div id="id-${el.id}-box" class="img-box text-center"><img id="id-${el.id}" src="${el.content}" class="${el.classes.join(" ")}" alt="Image"></div>`;
  if(["div","row","col"].includes(el.type)) return `<div id="id-${el.id}" class="${el.classes.join(" ")}">\n${el.children.map(generateHTML).join("\n")}\n</div>`;
  return "";
}



// ----- Event Listeners -----
elementTypeSelect.addEventListener("change",()=>{
  elementContentInput.style.display=(["title","desc","img"].includes(elementTypeSelect.value))?"inline-block":"none";
});

document.getElementById("addElement").onclick=()=>{
  const type=elementTypeSelect.value;
  const content=elementContentInput.value.trim();
  if((type==="title"||type==="desc"||type==="img")&&!content){ alert("Enter text or image URL!"); return; }
  const el=createElement(type,content);
  const parentId=parentSelect.value;
  if(parentId==="root") layout.push(el);
  else{
    const parent=findElementById(layout,Number(parentId));
    if(parent){
      if(parent.type==="row" && ["title","desc","img"].includes(type)){
        const colEl=createElement("col"); colEl.children.push(el); parent.children.push(colEl);
      } else parent.children.push(el);
    }
  }
  elementContentInput.value="";
  updateParentOptions();
  saveLayout();
  renderPreview();
};

document.getElementById("resetLayout").onclick=()=>{
  layout=[]; deletedIds=[]; elementIdCounter=1;
  updateParentOptions(); saveLayout(); renderPreview();
};

document.getElementById("copyCode").onclick=()=>{
  navigator.clipboard.writeText(codeBlock.textContent); alert("HTML copied!");
};

// ----- Init -----
updateParentOptions();
renderPreview();
