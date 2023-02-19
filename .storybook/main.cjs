module.exports = {
  stories: [
    // Introduction and sample stories
    '../src/stories/*.stories.@(mdx|js)',
    '../src/lib/**/*.stories.ts',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-svelte-csf',
  ],
  framework: '@storybook/svelte',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  svelteOptions: {
    preprocess: import('../svelte.config.js').then((config) => config.preprocess),
  },
}
