const path = require("path");
const fs = require("fs/promises");
const template = require("lodash/template");
const { validate } = require("schema-utils");
const svgTemplate = require("./lib/svgTemplate");
const imgTemplate = require("./lib/imgTemplate");
const {getSvgelemenData, encodeSvg} = require("./lib/helpers")

const loaderValidateSchema = {
  title: "Svg Loader options",
  properties: {
    applyCurrentColor: {
      description:
        "It finds all fill attributes and replace value on currentColor. It will be as fill='currentColor'. If transformIntoDataURI is true, it will not clear color.",
      type: "boolean",
    },
    transformIntoDataURI: {
      description: "The svg file will be transformed in to data uri",
      type: "boolean",
    },
  },
  additionalProperties: false,
};


const lightSvgLoader = async function (source) {
  const options = this.getOptions();

  validate(loaderValidateSchema, options);

  const filename = path.basename(this.resourcePath);

  const svgFile = await fs.readFile(`${this.resourcePath}`);

  const assetInfo = { sourceFilename: filename };

  this.emitFile(filename, source, null, assetInfo);

  const { innerItems, width, height, viewBox } = getSvgelemenData(
    svgFile,
    options
  );

  if(options?.transformIntoDataURI) {
    return template(imgTemplate)({
      imgSrc: encodeSvg(svgFile)
    });
  } else {
     return template(svgTemplate)({
      innerItems,
      width,
      height,
      viewBox,
    });
  }
};

module.exports = lightSvgLoader

module.exports.raw = true;
