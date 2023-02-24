const esbuild = require("esbuild");
const inlineImage = require("esbuild-plugin-inline-image");
const postcss = require("esbuild-postcss");
//const { copy } = require("esbuild-plugin-copy");

esbuild
  .build({
    entryPoints: ["./src/Index.bs.js"],
    outfile: "index.js",
    minify: true,
    bundle: true,
    loader: {
      ".js": "jsx",
    },
    format: "esm",
    external: ["react", "react-dom"],
    plugins: [
      inlineImage(),
      postcss(),
      // copy({
      //   assets: {
      //     from: ["./public/**/*"],
      //     to: ["../"],
      //     keepStructure: true,
      //   },
      // }),
    ],
  })
  .catch(() => process.exit(1));
