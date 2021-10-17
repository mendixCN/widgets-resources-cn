import command from "rollup-plugin-command";
import { cp } from "shelljs";
import { join } from "path";


export default args => {
    const result = args.configDefaultConfig;
    let done = false;
    result.forEach(config => {
        const plugins = config.plugins || [];
        config.plugins = [
            done ? null : (done = true, command([() => {
                cp('-R', join(__dirname, `resources`), join(__dirname, `dist/tmp/widgets/resources`));
            }])),
            ...plugins
        ];
    });
    return result;
};
