import path from "path";
import pluginUtils from "@rollup/pluginutils";
import { lint, LinterOptions, LinterResult } from "stylelint";

function resultHasErrors(result: LinterResult) {
  return result.results.some(res => res.errored);
}

function resultHasWarnings(result: LinterResult) {
  return result.results.some(res => res.warnings.length !== 0);
}

function normalizePath(id: string) {
  return path
    .relative(process.cwd(), id)
    .split(path.sep)
    .join("/");
}

interface StylintPluginOptions extends Partial<LinterOptions> {
  include?: Array<string | RegExp> | string | RegExp | null;
  exclude?: Array<string | RegExp> | string | RegExp | null;

  throwOnError?: boolean;
  throwOnWarning?: boolean;
}

export default function stylelintPlugin({
  include,
  exclude = "node_modules/**",
  formatter = "string",
  throwOnError,
  throwOnWarning,
  ...options
}: StylintPluginOptions = {}) {
  const filter = pluginUtils.createFilter(
    include,
    exclude || "node_modules/**"
  );

  return {
    name: "stylelint",
    transform(code: string, id: string) {
      if (!filter(id)) return;
      return lint({
        code,
        codeFilename: normalizePath(id),
        formatter,
        ...options
      })
        .then(result => {
          if (!result.output) {
            return;
          }

          process.stdout.write(result.output);

          if (resultHasWarnings(result) && throwOnWarning) {
            throw new Error("Warning(s) were found");
          }

          if (resultHasErrors(result) && throwOnError) {
            throw new Error("Error(s) were found");
          }
        })
        .catch(error => {
          throw Error(error);
        });
    }
  };
}
