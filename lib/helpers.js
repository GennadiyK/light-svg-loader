const jsdom = require("jsdom");
const nodeBuffer = require("node:buffer");
const { optimize } = require("svgo");

const getInnerItems = (svg) => {
  const dom = new jsdom.JSDOM(svg, "text/xml");
  const svgEl = dom.window.document.querySelector("svg");
  const innerItems = Array.from(svgEl.childNodes)
    .map((e) => e.outerHTML)
    .filter(Boolean)
    .join("\n");

  return { innerItems, svgEl };
};

const getSvgelemenData = (svg, { applyCurrentColor }) => {
  const { innerItems, svgEl } = getInnerItems(svg);

  const oprimazedInnerItems = optimize(innerItems).data;
  const colorHexRegex = /#(?:[0-9a-fA-F]{3}){1,2}/;

  return {
    innerItems: applyCurrentColor
      ? oprimazedInnerItems.split(colorHexRegex).join("currentColor")
      : oprimazedInnerItems,
    width: svgEl.getAttribute("width"),
    height: svgEl.getAttribute("height"),
    viewBox: svgEl.getAttribute("viewBox"),
  };
};

const encodeSvg = (svg, encoding = "base64") => {
  const mime = "image/svg+xml";
  const data = nodeBuffer.Buffer(svg).toString(encoding);
  return `data:${mime};${encoding},${data}`;
};

module.exports = {
  getInnerItems,
  getSvgelemenData,
  encodeSvg
};
