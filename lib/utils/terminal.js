const {spawn} = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    //打印子进程的输出的信息
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    //监听子进程关闭，关闭后让父进程继续执行
    childProcess.on("close", () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn,
};
