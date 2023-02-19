import InputMultiRange from './InputMultiRange.svelte'

export default {
  component: InputMultiRange,
  title: 'Input-Multi-Range',
}

const Template = ({ ...args }) => ({
  Component: InputMultiRange,
  props: args,
})

export const Default = Template.bind({})
