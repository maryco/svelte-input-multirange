<script lang="ts">
  import InputMultiRange from '$lib/InputMultiRange.svelte'
  import type { DemoProps } from './PropertyExamples.svelte'

  export let props: DemoProps

  const minHeight = Math.max(props.barHeight || 20, props.knobSize || 20)

  $: from = props.defaultFrom || 0
  $: to = props.defaultTo || 0
</script>

<div>
  {#if props.showLabel}
    <div class="flex justify-between text-lg text-app-text opacity-70">
      <span>{from}</span>
      <span>{to}</span>
    </div>
  {/if}
  <div style:height={`${minHeight + 8}px`}>
    <InputMultiRange
      {...props}
      on:range-changed={(e) => {
        from = e.detail.from
        to = e.detail.to
      }}
    />
  </div>
</div>
