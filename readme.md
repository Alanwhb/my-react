# My React - 自定义 React 学习项目

这是一个用于学习 React 核心原理的自定义实现项目，实现了类似 React 的基本功能。

## 项目结构

```
my-react/
├── index.jsx      # 自定义 React 实现代码
├── index.html     # HTML 入口文件
└── readme.md      # 项目说明文档
```

## 运行步骤

### 1. 安装依赖

首先需要全局安装 `http-server`：

```bash
npm install -g http-server
```

### 2. 启动服务器

在项目根目录下运行：

```bash
http-server
```

### 3. 访问应用

打开浏览器访问：

```
http://localhost:8080/
```

默认情况下，`http-server` 会在 8080 端口启动服务。如果 8080 端口被占用，可能会使用其他端口，具体端口号会在终端中显示。

### 4. 对比排查

页面将显示一个简单的 DOM 结构：
访问 http://localhost:8080/ditact.html，复制了官方教程的文件

## 技术特点

- 使用原生 JavaScript 实现
- 支持 JSX 语法（通过 Babel 转换）
- 实现了 Fiber 架构
- 支持基本的 DOM 更新和事件处理
- 不依赖真实的 React 库

## 学习资源

该项目基于 [Build your own React](https://pomb.us/build-your-own-react/) 教程实现，用于深入理解 React 的工作原理。