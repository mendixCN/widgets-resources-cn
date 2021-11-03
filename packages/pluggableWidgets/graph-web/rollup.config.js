export default args => {
    const result = args.configDefaultConfig;
    result.forEach(config => {
        const onwarn = config.onwarn;
        config.onwarn = warning => {
            if (
                warning.loc &&
                warning.loc.file &&
                warning.loc.file.includes("node_modules\\@antv")
            ) {
                return;
            }
            if (warning.code === 'NAMESPACE_CONFLICT') return;
            // console.log(warning);
            onwarn(warning);
        };
    });
    return result;
};
