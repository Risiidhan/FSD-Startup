const config = {
  "*.{js,jsx,ts,tsx,mjs}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"],
  // Function form: runs once for the whole project instead of per file
  "*.{ts,tsx}": () => "tsc --noEmit",
};

export default config;
