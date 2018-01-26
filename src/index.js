import { createFilter } from "rollup-pluginutils";
import stylelint from "stylelint";

export default function stylelintPlugin(options = {}) {
    const filter = createFilter(options.include, options.exclude || "node_modules/**");

    return {
        name: "stylelint",
        transform(code, id) {
            if (!filter(id)) return;

            return stylelint
                .lint({...options, code, formatter: "verbose"})
                .then(result => {
                    if (result.errored) {
                        throw Error(result.output);
                    }
                })
                .catch(error => {
                        throw Error(error);
                });
        }
    };
}
