/* eslint-disable quotes */
/* eslint-disable no-multi-str */
const imgTemplate = `
import React from 'react'

const ImgComponent = (props) =>  <img src="<%= imgSrc %>" {...props} />

export default ImgComponent`;

module.exports = imgTemplate;
