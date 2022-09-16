# Svelte Input Multi Range

## Create a new project (If you have not created one yet)

Create new Svelte-kit project [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte) or [Svelte](https://svelte.dev/) project

## Install

```bash
npm i -D @maryco/svelte-input-multirange
```

## Usage

Import component and custom event.

```typescript
import InputMultiRange from '@maryco/svelte-input-multirange'
import type RangeChanged from '@maryco/svelte-input-multirange/range-changed'
```

When render by using default properties.

```html
<InputMultiRange />
```

When render with some properties and bind a event handler

```typescript
function handleChangeRange(e: CustomEvent<RangeChanged>) {
  console.log(e.detail.from)
  console.log(e.detail.to)
}
```

```html
<InputMultiRange key={'1'} barWidth={40} knobSize={42} rangeMin={-100} rangeMax={100}
defaultFrom={10} defaultTo={25} throttole={10} on:range-changed={handleChangeRange} />
```

## Properties

properties are all optional.
|name|type|description|default|
|---|---|---|---|
|key|string|sets value for identification, when using multiple components|empty string|
|barWidth|number|width of a bar|20|
|knobSize|number|diameter of the range-control knobs|20|
|rangeMin|number|available range max value|0|
|rangeMax|number|available range min value|100|
|defaultFrom|number|initial from value of the range|0|
|defaultTo|number|initial to values of the range|100|
|rangeMinColor|string|color of range max value (hex)|<span style="color:#00bc9b">#00bc9b</span>|
|rangeMaxColor|string|color of range max value (hex)|<span style="color:#5eaefd">#5eaefd</span>|
|useDarkMode|bool|if set to `true`, color of the basebar will be dark|false|
|throttole|number|throttle for a emits event 'change-range'|0|

## Events

NOTE: The 'from' and 'to' values are calculated by the actual bar width and range values, so if the width and range are significantly different, it will be difficult to tweak the knobs.

| event name   |                                                                                                                                                             | dispatch values example            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| change-range | dispatches when the left or right knob position changes.<br><li>'key' is same of the own property value</li><li>'from' and 'to' are the current values</li> | { key: 'input1', from: 3, to: 20 } |
