export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // https://storybook.js.org/docs/react/configure/story-layout#global-layout
  //layout: 'centered', // | fullscreen | padded(default)
  docs: {
    // Opt-out of inline rendering
    // inlineStories: false,
  },
}
