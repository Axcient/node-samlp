"use strict";

const xmldom = require("xmldom");

const DOMParser = xmldom.DOMParser;
const XMLSerializer = xmldom.XMLSerializer;
const whitespace = /^\s+$/;

function removeEmptyNodes(node) {
  for (let index = 0; index < node.childNodes.length; index += 1) {
    const current = node.childNodes[index];

    if (current.nodeType === 3 && whitespace.test(current.nodeValue)) {
      node.removeChild(current);
    } else if (current.nodeType === 1) {
      removeEmptyNodes(current); //remove whitespace on child element's children
    }
  }
}

module.exports = function trimXML(xml) {
  const dom = new DOMParser().parseFromString(xml);
  const serializer = new XMLSerializer();

  removeEmptyNodes(dom);

  return serializer.serializeToString(dom);
};
