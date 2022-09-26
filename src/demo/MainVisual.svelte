<script lang="ts">
  import InputMultiRange from '$lib/InputMultiRange.svelte'
  import type RangeChanged from '$lib/range-changed'
  import Logo from './Logo.svelte'

  let eyeLeft = 0
  let eyeRight = 20
  function handleEyeMove(e: CustomEvent<RangeChanged>) {
    eyeLeft = e.detail.from
    eyeRight = e.detail.to
  }
</script>

<div class="md:h-screen flex flex-col flex-nowrap justify-center items-center">
  <!-- Hero for screen md lg -->
  <div class="hidden md:flex justify-center w-10/12">
    <div
      class="hero-image lg:mr-12 md:mt-24 relative bg-[url('/img-robot.png')] bg-no-repeat bg-contain lg:bg-top md:bg-bottom"
    >
      <div class="hero-image__eye relative lg:top-[112px] md:top-[146px] mx-auto">
        {#key eyeLeft + eyeRight}
          <InputMultiRange
            barHeight={26}
            knobSize={40}
            rangeMin={0}
            rangeMax={20}
            defaultFrom={eyeLeft}
            defaultTo={eyeRight}
          />
        {/key}
      </div>
    </div>
    <Logo />
  </div>
  <!-- //Hero for screen md lg -->
  <!-- Hero for screen sm -->
  <div class="md:hidden sm:flex justify-center w-10/12 pt-36">
    <div><Logo /></div>
    <div
      class="h-[380px] relative bg-[url('/img-robot.png')] bg-no-repeat bg-contain bg-[center_top_-1rem]"
    >
      <div class="hero-image__eye relative top-[96px] mx-auto">
        {#key eyeLeft + eyeRight}
          <InputMultiRange
            barHeight={26}
            knobSize={40}
            rangeMin={0}
            rangeMax={20}
            defaultFrom={eyeLeft}
            defaultTo={eyeRight}
          />
        {/key}
      </div>
    </div>
  </div>
  <!-- //Hero for screen sm -->

  <!-- Bar -->
  <div class="w-10/12 h-12 lg:mt-20 md:mt-16 sm:mt-32">
    <InputMultiRange
      barHeight={40}
      knobSize={40}
      rangeMin={0}
      rangeMax={20}
      throttole={100}
      on:range-changed={handleEyeMove}
    />
  </div>
</div>

<style global>
  .hero-image {
    height: 410px;
    width: 292px;
  }

  .hero-image__eye {
    width: 200px;
    height: 48px;
  }

  /* NOTE: eslint warns 'css-unused-selector' if not :global() */
  .hero-image__eye :global(.input-multi-range__knob) {
    fill: #edef95;
  }
</style>
