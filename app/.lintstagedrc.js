export default {
  "**/*.{ts,tsx}": (stagedFiles) => [
    `eslint --fix . ${stagedFiles.join(' --file')}`,
    `prettier --write ${stagedFiles.join(" ")}`,
  ],
};
  