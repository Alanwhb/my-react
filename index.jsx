/* 原始jsx
const element = <h1 title="foo">Hello</h1>
const container = document.getElementById("root")
ReactDOM.render(element, container)
*/

/** 转换为原生js
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}
​
const container = document.getElementById("root")
​
const node = document.createElement(element.type)
node["title"] = element.props.title
​
const text = document.createTextNode("")
text["nodeValue"] = element.props.children
​
node.appendChild(text)
container.appendChild(node)
*/

// myReact - 创建节点
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

// 创建文本节点
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

// render函数 - 将element渲染到container dom内
function render(element, container) {
  // create new dom from element
  const dom =
    element.type == "TEXT_ELEMENT" // 判断是否是文本节点
      ? document.createTextNode("")
      : document.createElement(element.type);
  // add dom props
  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  // add children recursively
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}

// my React for stydy
const Didact = {
  createElement,
  render,
};

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
const container = document.getElementById("root");
// ReactDOM.render(element, container);
Didact.render(element, container); // use my React
