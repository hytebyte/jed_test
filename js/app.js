/* global requirejs */

requirejs.config({
  baseUrl: "js/src",
  paths: {
    vendor: "../vendor"
  }
});

requirejs(["main"]);
