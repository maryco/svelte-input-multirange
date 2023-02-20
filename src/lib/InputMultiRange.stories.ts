import InputMultiRange from './InputMultiRange.svelte'

export default {
  title: 'InputMultiRange',
  component: InputMultiRange,
  parameters: {
    docs: {
      description: {
        component: 'Component description',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    // Prpos
    key: {
      description: 'Sets the identifying value when using multiple components',
      type: { name: 'text', required: false },
      control: { type: 'text' },
    },
    barHeight: {
      description: 'Bar height(px)',
      type: { name: 'number', required: false },
      control: { type: 'number' },
      table: {
        defaultValue: { summary: 20 },
      },
    },
    knobSize: {
      description: 'Range control knob diameter',
      type: { name: 'number', required: false },
      control: { type: 'number' },
      table: {
        defaultValue: { summary: 20 },
      },
    },
    rangeMin: {
      description: 'Minimum value available in the range',
      type: { name: 'number', required: false },
      control: { type: 'number' },
      table: {
        defaultValue: { summary: 0 },
      },
    },
    rangeMax: {
      description: 'Maximum value available in the range',
      type: { name: 'number', required: false },
      control: { type: 'number' },
      table: {
        defaultValue: { summary: 100 },
      },
    },
    defaultFrom: {
      description: 'The initial value for the start of the range',
      type: { name: 'number', required: false },
      control: { type: 'number' },
      table: {
        defaultValue: { summary: 0 },
      },
    },
    defaultTo: {
      description: 'The initial value for the end of the range',
      type: { name: 'number', required: false },
      control: { type: 'number' },
      table: {
        defaultValue: { summary: 100 },
      },
    },
    rangeMinColor: {
      description: 'Range minimum color (hex)',
      type: { name: 'color', required: false },
      control: { type: 'color' },
      table: {
        defaultValue: { summary: '#00bc9b' },
      },
    },
    rangeMaxColor: {
      description: 'Range maximum color (hex)',
      type: { name: 'color', required: false },
      control: { type: 'color' },
      table: {
        defaultValue: { summary: '#5eaefd' },
      },
    },
    throttole: {
      description: 'Throttle on emits event `change-range`',
      type: { name: 'number', required: false },
      control: { type: 'number' },
      table: {
        defaultValue: { summary: 0 },
      },
    },
    useDarkMode: {
      description: 'If set to `true`, color of the basebar will be dark',
      type: { name: 'boolean', required: false },
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: false },
      },
    },
    // Actions
    onRangeChanged: {
      action: 'onRangeChanged',
      table: {
        disable: true,
      },
    },
  },
}

type Parameters = {
  docs: Record<string, object>
}
type TemplateArgs = {
  parameters?: Parameters
  onRangeChanged?: Record<string, object>
}

const Template = (args: TemplateArgs) => ({
  Component: InputMultiRange,
  props: args,
  on: {
    'range-changed': args?.onRangeChanged,
  },
})

// FIXME: Does Storybook not fully support typescript for the Svelte?
// ```Property 'args' does not exist on type ... ts(2339)```
// ```Property 'parameters' does not exist on type```
export const Default = Template.bind({})
Default.args = {
  barHeight: 20,
  knobSize: 18,
  rangeMin: -100,
  rangeMax: 0,
  defaultFrom: -100,
  defaultTo: 0,
  throttole: 100,
}
Default.parameters = {
  docs: {
    description: { story: 'Story description' },
    source: {
      code: '<InputMultiRange />',
      type: 'auto',
    },
  },
}
