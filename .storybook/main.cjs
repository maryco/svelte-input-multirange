module.exports = {
  stories: [
    // Introduction and sample stories
    '../src/lib/**/*.stories.@(ts|js|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // uncomfortable
    //'@storybook/addon-svelte-csf',
  ],
  framework: '@storybook/svelte',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    // Error 'Cannot process .svelte file with storyStoreV7' when create a story with '.svelte'
    storyStoreV7: true,
  },
  svelteOptions: {
    preprocess: import('../svelte.config.js').then((config) => config.preprocess),
  },
}
