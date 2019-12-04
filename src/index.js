const path = require('path');
const pluginUtils = require("rollup-pluginutils");
const stylelint = require("stylelint");

function resultHasErrors(result) {
  return result.results.some(res => res.errored);
}

function resultHawWarnings(result) {
  return result.results.some(res => res.warnings.length !== 0);
}

function normalizePath(id) {
  return path
    .relative(process.cwd(), id)
    .split(path.sep)
    .join("/");
}

function stylelintPlugin(options = {}) {
  const filter = pluginUtils.createFilter(options.include, options.exclude || "node_modules/**");


  return {
    name: "stylelint",
    transform(code, id) {
      if (!filter(id)) return;
      return stylelint
        .lint({
          code,
          codeFilename: normalizePath(id),
          formatter: "string",
          ...options,
        })
        .then(result => {
          if (result.output) {
            process.stdout.write(result.output);

            if (resultHawWarnings(result) && options.throwOnWarning) {
              throw new Error('Warning(s) were found');
            }

            if (resultHasErrors(result) && options.throwOnError) {
              throw new Error('Error(s) were found');
            }
          }
        })
        .catch(error => {
          throw Error(error);
        });
    }
  };
}

module.exports = stylelintPlugin;
