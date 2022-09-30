<script lang="ts" context="module">
  export interface DemoProps {
    showLabel: boolean
    barHeight?: number
    knobSize?: number
    rangeMin?: number
    rangeMax?: number
    defaultFrom?: number
    defaultTo?: number
    rangeMinColor?: string
    rangeMaxColor?: string
  }
</script>

<script lang="ts">
  import InputRangeWithLabel from './InputRangeWithLabel.svelte'

  const sizeDemo1: DemoProps = {
    barHeight: 60,
    knobSize: 28,
    rangeMin: -100,
    rangeMax: 0,
    defaultFrom: -100,
    defaultTo: 0,
    rangeMinColor: '#00BC9B',
    rangeMaxColor: '#00BC9B',
    showLabel: true,
  }
  const sizeDemo2: DemoProps = {
    barHeight: 16,
    knobSize: 36,
    rangeMinColor: '#00BC9B',
    rangeMaxColor: '#00BC9B',
    showLabel: true,
  }

  const colorDemo1: DemoProps = {
    barHeight: 36,
    knobSize: 36,
    rangeMinColor: '#FFFBE3',
    rangeMaxColor: '#DE3227',
    showLabel: false,
  }
  const colorDemo2: DemoProps = {
    barHeight: 36,
    knobSize: 36,
    rangeMinColor: '#EEA484',
    rangeMaxColor: '#5CE77B',
    showLabel: false,
  }
  const colorDemo3: DemoProps = {
    barHeight: 36,
    knobSize: 36,
    rangeMinColor: '#2199A0',
    rangeMaxColor: '#E472D9',
    showLabel: false,
  }
  const colorDemo4: DemoProps = {
    barHeight: 36,
    knobSize: 36,
    rangeMinColor: '#A9A9A9',
    rangeMaxColor: '#A9A9A9',
    showLabel: false,
  }

  const styleExample = `
/* EXAMPLE */
&lt;style global&gt;
  .my-range .input-multi-range__knob {
    /* knob color inactive */
    fill: #4c455c;
  }
  .my-range .input-multi-range__knob--active {
    /* knob color active */
    fill: #fffdb7;
  }
&lt;/style&gt;`
</script>

<div class="pt-32 flex flex-wrap md:flex-nowrap md:flex-row-reverse">
  <div class="block-caption">
    <h2 class="text-3xl">Customize Appearance</h2>
    <p class="mt-8">You can change the height of the bar and the size of the knob.</p>
  </div>
  <div class="md:basis-3/5 lg:basis-1/2 px-10">
    <ul>
      <li>
        <InputRangeWithLabel props={sizeDemo1} />
      </li>
      <li class="mt-4">
        <InputRangeWithLabel props={sizeDemo2} />
      </li>
    </ul>
  </div>
</div>

<div class="mt-16 flex flex-wrap md:flex-nowrap">
  <div class="block-caption">
    <p class="mt-8">You can change the color of the range minimum and maximum values.</p>
    <p class="mt-8">If you want a solid color, set the same color for the min and max values.</p>
  </div>
  <div class="md:basis-3/5 lg:basis-1/2 p-10">
    <ul>
      <li>
        <InputRangeWithLabel props={colorDemo1} />
      </li>
      <li class="mt-8">
        <InputRangeWithLabel props={colorDemo2} />
      </li>
      <li class="mt-8">
        <InputRangeWithLabel props={colorDemo3} />
      </li>
      <li class="mt-12">
        <InputRangeWithLabel props={colorDemo4} />
      </li>
    </ul>
  </div>
</div>

<div class="pb-32 mt-16 flex flex-wrap md:flex-nowrap md:flex-row-reverse">
  <div class="block-caption min-w-0">
    <!-- min-w-0 = able to scroll pre in flex -->
    <p>You can also apply your own style to change the color of the knobs.</p>
    <pre class="mt-4 p-4 bg-slate-100 text-sm overflow-x-auto">
      <code class="">{@html styleExample}</code>
    </pre>
  </div>
  <div class="md:basis-3/5 lg:basis-1/2 p-10">
    <ul>
      <li class="my-range">
        <InputRangeWithLabel props={colorDemo4} />
      </li>
    </ul>
  </div>
</div>

<style global>
  /* NOTE: eslint warns 'css-unused-selector' if not :global() */
  .my-range :global(.input-multi-range__knob) {
    fill: #4c455c;
  }
  .my-range :global(.input-multi-range__knob--active) {
    fill: #fffdb7;
  }
</style>
