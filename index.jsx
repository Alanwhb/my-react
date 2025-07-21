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

// 根据fiber创建&返回dom节点
function createDom(fiber) {
  // create new dom from fiber
  const dom =
    fiber.type == "TEXT_ELEMENT" // 判断是否是文本节点
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  // add dom props
  const isProperty = (key) => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });
  return dom;
}

function render(element, container) { 
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };
}

// 下次要执行的渲染任务
let nextUnitOfWork = null;
// 将整个渲染过程从同步改成分片防止阻塞主线程
function workLoop(deadline) { 
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) { 
  // 1. add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  // 2. create new fibers - children fibers
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) { 
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }

  // 3. return next unit of work - child -> sibling -> uncle(parent's silbling)
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) { 
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
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
