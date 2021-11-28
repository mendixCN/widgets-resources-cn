export default args => {
  const result = args.configDefaultConfig;
  result.forEach(config => {
    const onwarn = config.onwarn;
    config.onwarn = warning => {
      if (
        warning.loc &&
        warning.loc.file &&
        warning.loc.file.includes("node_modules")
      ) {
        return;
      }
      if (warning.code === 'NAMESPACE_CONFLICT') return;

      if (warning.code === 'CIRCULAR_DEPENDENCY') return;

      onwarn(warning);
    };
  });
  return result;
};
