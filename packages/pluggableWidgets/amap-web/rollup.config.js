export default args => {
    debugger
    const result = args.configDefaultConfig;
    result.forEach(config => {
        const onwarn = config.onwarn;
        config.onwarn = warning => {
            if (
                warning.loc &&
                warning.loc.file.includes("AMapSDK.js")
            ) {
                return;
            }
            onwarn(warning);
        };
    });
    return result;
};
