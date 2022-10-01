<script lang="ts">
  import InputMultiRange from '$lib/InputMultiRange.svelte'
  import type RangeChanged from '$lib/range-changed'
  import { onMount } from 'svelte'
  import Logo from './Logo.svelte'

  let eyeLeft = 0
  let eyeRight = 20
  function handleEyeMove(e: CustomEvent<RangeChanged>) {
    eyeLeft = e.detail.from
    eyeRight = e.detail.to
  }

  let isDarkMode = false
  onMount(() => {
    isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  })
</script>

<div class="md:h-screen flex flex-col flex-nowrap justify-center items-center">
  <!-- Hero visual & logo -->
  <div class="w-full md:w-10/12 flex justify-center flex-wrap md:flex-nowrap">
    <div
      class="w-[292px] h-[380px] md:h-[410px] relative lg:mr-12 md:mt-24 bg-[url('/img-robot.png')] bg-no-repeat bg-contain bg-[center_top_-1rem] lg:bg-top md:bg-bottom"
    >
      <div
        class="hero-image__eye w-[200px] h-[48px] relative top-[96px] lg:top-[112px] md:top-[146px] mx-auto"
      >
        {#key eyeLeft + eyeRight}
          <InputMultiRange
            barHeight={26}
            knobSize={40}
            rangeMin={0}
            rangeMax={20}
            defaultFrom={eyeLeft}
            defaultTo={eyeRight}
            useDarkMode={isDarkMode}
          />
        {/key}
      </div>
    </div>
    <div class="w-10/12 lg:max-w-[458px] md:max-w-[390px] order-first md:order-last mt-36 md:mt-0">
      <Logo />
    </div>
  </div>
  <!-- //Hero visual & logo -->
  <!-- Bar -->
  <div class="w-10/12 h-12 lg:mt-20 md:mt-16 sm:mt-32">
    <InputMultiRange
      barHeight={40}
      knobSize={40}
      rangeMin={0}
      rangeMax={20}
      throttole={100}
      on:range-changed={handleEyeMove}
      useDarkMode={isDarkMode}
    />
  </div>
</div>

<style global>
  /* NOTE: eslint warns 'css-unused-selector' if not :global() */
  .hero-image__eye :global(.input-multi-range__knob) {
    fill: #edef95;
  }
</style>
