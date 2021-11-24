const path = require("path");
const fs = require("fs");

const ejs = require("ejs");
//解析文件
const compile = (templateName, data) => {
  const temPosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, temPosition);

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, {}, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
};

//判断路径是否存在，不存在就创建路径
function createDir(pathName) {
  if (fs.existsSync(pathName)) {
    //存在直接返回
    return true;
  } else {
    //不存在，判断它的父文件夹是否存在
    //如果父文件夹也不存在，继续向上层文件夹递归，
    //直到上层文件夹存在后，创建文件夹
    if (createDir(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
}

//写入相应的文件
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content);
};

module.exports = {
  compile,
  writeToFile,
  createDir,
};
