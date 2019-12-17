var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import path from "path";
import pluginUtils from "@rollup/pluginutils";
import { lint } from "stylelint";
function resultHasErrors(result) {
    return result.results.some(res => res.errored);
}
function resultHasWarnings(result) {
    return result.results.some(res => res.warnings.length !== 0);
}
function normalizePath(id) {
    return path
        .relative(process.cwd(), id)
        .split(path.sep)
        .join("/");
}
export default function stylelintPlugin(_a = {}) {
    var { include, exclude = "node_modules/**", formatter = "string", throwOnError, throwOnWarning } = _a, options = __rest(_a, ["include", "exclude", "formatter", "throwOnError", "throwOnWarning"]);
    const filter = pluginUtils.createFilter(include, exclude || "node_modules/**");
    return {
        name: "stylelint",
        transform(code, id) {
            if (!filter(id))
                return;
            return lint(Object.assign({ code, codeFilename: normalizePath(id), formatter }, options))
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
