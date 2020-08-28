const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const templates = fs.readdirSync(path.join(__dirname, "../templates"));

templates.forEach(function (tmplFile) {
  const content = fs.readFileSync(
    path.join(__dirname, "../templates", tmplFile)
  );

  const template = ejs.compile(content.toString());

  exports[tmplFile.slice(0, -4)] = template;
});
