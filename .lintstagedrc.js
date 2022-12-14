import { ESLint } from 'eslint'

// https://github.com/okonet/lint-staged#how-can-i-ignore-files-from-eslintignore
const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    })
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles.join(' ')
}

export default {
  '**/*.{ts,tsx,cjs,js,jsx,svelte}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [`npm run format ${filesToLint}`, `eslint ${filesToLint}`]
  },
}
