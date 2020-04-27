import { NodePlopAPI } from "plop";

module.exports = function (plop: NodePlopAPI) {
  // We declare a new generator called "module"
  plop.setGenerator("component", {
    // Succintly describes what generator does.
    description: "Create a new react functional component",

    // Get inputs from the user.
    // That's Inquirer.js doing the job behind the hood.
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],

    // List of actions to take.
    // Here we "add" new files from our templates.
    actions: [
      {
        type: "add",
        path: "src/components/{{ pascalCase name }}/index.tsx",
        templateFile: "plop/templates/component/index.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{ pascalCase name }}/style.tsx",
        templateFile: "plop/templates/component/style.tsx.hbs",
      },
    ],
  });
};
