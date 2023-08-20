/* eslint-disable quotes */
/* eslint-disable no-multi-str */
const svgTemplate = `
import React from 'react'


const SvgComponent = (props) => {
    return (
        <svg {...props}>
          <%= innerItems %>
        </svg>
    )
}

SvgComponent.defaultProps = {
  height: '<%= height %>',
  width: '<%= width %>',
  viewBox: '<%= viewBox %>',
}

export default SvgComponent`;

module.exports = svgTemplate;
