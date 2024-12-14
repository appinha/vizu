export default {
  "**/*.{ts,tsx}": (stagedFiles) => [
    `eslint --fix . ${stagedFiles.join(" ")}`,
    `prettier --write ${stagedFiles.join(" ")}`,
  ],
};
  