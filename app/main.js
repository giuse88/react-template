var React = require("react");
var CommentBox = require("./components/CommentBox");

function render(element, id) {
  React.render(<CommentBox />, document.getElementById(id));
}

render(CommentBox, "content");
