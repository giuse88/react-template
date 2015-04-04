var React = require("react");
var Component = require("./components/Component");

function render(element, id) {
  React.render(<Component />, document.getElementById(id));
}

render(Component, "content");
