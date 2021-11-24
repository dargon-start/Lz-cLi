//导入内置模块
const {promisify} = require("util");
const path = require("path");
//导入第三方库
//转为promise形式
const download = promisify(require("download-git-repo"));
const open = require("open");
//导入自己的文件
const {repoVue} = require("../config/repo-config");
const {commandSpawn} = require("../utils/terminal");
const {compile, writeToFile, createDir} = require("../utils/util");

//创建项目
const createProjectAction = async function (project) {
  console.log("Lz helps you create your project , please wait a momont~");
  //1.克隆项目
  await download(repoVue, project, {clone: true});
  //执行npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], {cwd: `./${project}`});
  //运行npm run serve
  commandSpawn(command, ["run", "serve"], {cwd: `./${project}`});
  //打开浏览器
  open("http://localhost:8080/");
};

//创建components
const addComponentAction = async (name, dest) => {
  //1.模板
  //2.编译模板
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  //3.将模板添加到vue文件中
  //4.将vue文件添加到相应的文件夹中
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, result);
};

//添加页面page
const addPageAction = async (page, dest) => {
  //1.模板
  //2.编译模板
  const pageCpnResult = await compile("vue-component.ejs", {
    name: page,
    lowerName: page.toLowerCase(),
  });
  const pageRouterResult = await compile("vue-router.ejs", {
    name: page,
    lowerName: page.toLowerCase(),
  });
  //3.将模板添加到vue文件中
  //4.将vue文件添加到相应的文件夹中
  //先判断路径是否存在，不存在创建相应的文件夹，然后在写入
  // const targetDest = path.resolve(dest, page);
  const targetDest = dest;
  if (createDir(targetDest)) {
    const cpnTargetPath = path.resolve(targetDest, `${page}.vue`);
    const routerTargetPath = path.resolve(targetDest, "router.js");
    writeToFile(cpnTargetPath, pageCpnResult);
    writeToFile(routerTargetPath, pageRouterResult);
  }
};

//addstore
const addstoreAction = async (store, dest) => {
  //解析文件
  const storeResult = await compile("vue-store.ejs", {
    name:store,
    lowerName: store.toLowerCase(),
  });
  const typeResult = await compile("vue-types.ejs", {
    name:store,
    lowerName: store.toLowerCase(),
  });
  //写入文件
  // const targetDest = path.resolve(dest, store);
  const targetDest = dest;
  if (createDir(targetDest)) {
    const storePath = path.resolve(targetDest, `${store}.js`);
    const typesPath = path.resolve(targetDest, "types.js");
    writeToFile(storePath, storeResult);
    writeToFile(typesPath, typeResult);
  }
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addstoreAction,
};
