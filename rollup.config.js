export default {
  input: "lib/index.js",
  output: {
    file: "lib/xenk.umd.js",
    format: "umd"
  },
  sourcemap: true,
  name: "xenk",
  onwarn,
};

function onwarn(message) {
  const suppressed = ["UNRESOLVED_IMPORT", "THIS_IS_UNDEFINED"];

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message);
  }
}
