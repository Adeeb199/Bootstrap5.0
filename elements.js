// ----- Div Classes -----
export const divClasses = [
  "container", "container-sm", "container-md", "container-lg", "container-xl", "container-xxl",
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

// ----- Row Classes -----
export const rowClasses = [
  "row","row-cols-1","row-cols-2","row-cols-3","row-cols-4","row-cols-5","row-cols-6",
  "g-0","g-1","g-2","g-3","g-4","g-5",
  "align-items-start","align-items-center","align-items-end","align-items-baseline","align-items-stretch",
  "justify-content-start","justify-content-center","justify-content-end","justify-content-between","justify-content-around","justify-content-evenly",
  "flex-row","flex-row-reverse","flex-column","flex-column-reverse","flex-wrap","flex-nowrap"
];

// ----- Column Classes -----
export const colClasses = [
  "col","col-auto","col-1","col-2","col-3","col-4","col-5","col-6","col-7","col-8","col-9","col-10","col-11","col-12",
  "p-0","p-1","p-2","p-3","p-4","p-5",
  "m-0","m-1","m-2","m-3","m-4","m-5",
  "d-block","d-flex","d-inline","d-inline-block","d-inline-flex",
  "bg-primary","bg-secondary","bg-success","bg-danger","bg-warning","bg-info","bg-light","bg-dark","bg-white","bg-transparent",
  "border","border-0","border-top","border-end","border-bottom","border-start","rounded","rounded-top","rounded-end","rounded-bottom","rounded-start","rounded-circle","rounded-pill",
  "shadow","shadow-sm","shadow-lg"
];

// ----- Image Classes -----
export const imgClasses = [
  "img-fluid","img-thumbnail","img-rounded","rounded","rounded-circle","rounded-pill",
  "d-block","d-inline-block","mx-auto","img-fit","img-cover",
  "border","border-0","border-top","border-end","border-bottom","border-start",
  "shadow","shadow-sm","shadow-lg"
];

// ----- Text Classes -----
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

// ----- Element Factory -----
export function createElement(type, content = "", elementIdCounter, deletedIds) {
    let id = deletedIds.length ? deletedIds.shift() : elementIdCounter++;
    let el = { id, type, children: [], classes: [], content };

    if (type === "div") el.classes.push("container");
    if (type === "row") el.classes.push("row","align-items-center");
    if (type === "col") el.classes.push("col");
    if (type === "title") el.classes.push("fs-4","fw-bold");
    if (type === "desc") el.classes.push("fs-6");
    if (type === "img") el.classes.push("img-box","img-fluid","d-block");

    return el;
}
