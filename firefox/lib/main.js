var data = require("self").data;
var pageMod = require("page-mod");
pageMod.PageMod({
  include: "*",
  contentScriptFile: data.url("var_dumpling.js"),
  contentStyleFile: data.url("var_dumpling.css")
});
