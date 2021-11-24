const program = require("commander");

const {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addstoreAction,
} = require("./actions");

const createCommands = () => {
  //创建项目
  program
    .command("create <project> [others...]")
    .description("clone a repository into a folder")
    .action(createProjectAction);

  //添加components
  program
    .command("addcpn <name>")
    .description(
      "add  a vue component, 例如: Lz addcpn HelloWorld [-d src/components]"
    )
    .action((name) => {
      addComponentAction(name, program.dest || "src/components");
    });

  //添加页面addpage
  program
    .command("addpage <page>")
    .description("add  a vue page,例如: Lz addpage user [-d src/pages]")
    .action((page) => {
      addPageAction(page, program.dest || `src/pages/${page.toLowerCase()}`);
    });

  program
    .command("addstore <store>")
    .description("add  a vue store,例如: Lz addstore user [-d src/store]")
    .action((store) => {
      addstoreAction(store, program.dest || `src/store/modules/${store.toLowerCase()}`);
    });
};

module.exports = createCommands;
