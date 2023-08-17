import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/zim.js"],
  splitting: true,
  sourcemap: false,
  clean: true,
  format: ["cjs", "esm"],
  minify: true,
  publicDir: "ts-src",
})