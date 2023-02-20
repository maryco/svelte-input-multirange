# Svelte Input Multi Range

## Create a new project (If you have not created one yet)

Create new Svelte-kit project [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte) or [Svelte](https://svelte.dev/) project

## Install

```bash
npm i svelte-input-multirange
```

## Usage

Import component and custom event.

```typescript
import InputMultiRange from 'svelte-input-multirange'
import type RangeChanged from 'svelte-input-multirange/range-changed'
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
<div style="height: 48px; width:200px;">
  <InputMultiRange
    key={'1'}
    barHeight={40}
    knobSize={42}
    rangeMin={-100}
    rangeMax={100}
    defaultFrom={10}
    defaultTo={25}
    throttole={10}
    on:range-changed={handleChangeRange}
  />
</div>
```

NOTE: The display size depends on the parent tag, so wrap it in any tag to control the size. (It is better to set the height slightly larger than the size of the bar or knob.)

## Properties

properties are all optional.
|name|type|description|default|
|---|---|---|---|
|key|string|Sets the identifying value when using multiple components|empty string|
|barHeight|number|Bar height|20|
|knobSize|number|Range control knob diameter|20|
|rangeMin|number|Minimum value available in the range|0|
|rangeMax|number|Maximum value available in the range|100|
|defaultFrom|number|The initial value for the start of the range|0|
|defaultTo|number|The initial value for the end of the range|100|
|rangeMinColor|string|Range minimum color (hex)|<span style="color:#00bc9b">#00bc9b</span>|
|rangeMaxColor|string|Range maximum color (hex)|<span style="color:#5eaefd">#5eaefd</span>|
|useDarkMode|bool|If set to `true`, color of the basebar will be dark|false|
|throttole|number|Throttle on emits event 'change-range'|0|

## Events

NOTE: The 'from' and 'to' values are calculated by the actual bar width and range values, so if the width and range are significantly different, it will be difficult to tweak the knobs.

| event name   |                                                                                                                                                             | dispatch values example            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| change-range | dispatches when the left or right knob position changes.<br><li>'key' is same of the own property value</li><li>'from' and 'to' are the current values</li> | { key: 'input1', from: 3, to: 20 } |
