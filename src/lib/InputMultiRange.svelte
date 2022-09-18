<script lang="ts">
  import { onMount, afterUpdate, createEventDispatcher } from 'svelte'
  import type RangeChanged from './range-changed'

  const dispatch = createEventDispatcher<{
    'range-changed': RangeChanged
  }>()

  /**
   * Properties
   *
   * - barWidth: the width of the range bar
   * - knobSize: the diameter of the range-control knobs
   * - rangeMin,rangeMax: the available range max and min value
   * - defaultFrom, defaultTo: initial from and to values of the range
   * - rangeMinColor,rangeMaxColor: color range from min to max
   * - throttole: throttle for a emits event 'change-range'
   */
  export let key = ''
  export let barWidth = 20
  export let knobSize = 20
  export let rangeMin = 0
  export let rangeMax = 100
  export let defaultFrom = 0
  export let defaultTo = 100
  export let rangeMinColor = '#00bc9b'
  export let rangeMaxColor = '#5eaefd'
  export let useDarkMode = false
  export let throttole = 0

  // prevent invalid props
  if (barWidth < 0) {
    barWidth = 0
  }
  if (knobSize <= 0) {
    knobSize = 1
  }

  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/globalThis
  const isTouchDevice = 'ontouchstart' in globalThis

  // A unique key for using different styles in each component
  const styleKey = `${Date.now().toString(16)}-${Math.floor(Math.random() * 50)}`
  // Inner bar color when setting invalid color for gradient
  const noneGradientBarColor = '#b1b6bd'

  let clientWidth = 0
  let isActiveL = false
  let isActiveR = false
  let stateFrom: number
  let stateTo: number
  let viewBox = `0 0 ${clientWidth} ${barWidth}`
  let throttoleTimer = false

  /**
   * Knob
   */
  const knobRadius = knobSize / 2
  $: barLength = clientWidth - knobSize * 3

  type SVGCircleProps = {
    cx: number
    cy: number
    r: number
  }

  interface CircleKnob {
    circle: SVGCircleProps
    xMin: number
    xMax: number
  }

  let knobLeft: CircleKnob
  $: knobLeft = {
    circle: {
      cx: knobSize,
      cy: barWidth / 2,
      r: knobRadius,
    },
    xMin: knobSize,
    xMax: clientWidth - knobSize * 2,
  } as CircleKnob

  let knobRight: CircleKnob
  $: knobRight = {
    circle: {
      cx: clientWidth - knobSize,
      cy: barWidth / 2,
      r: knobRadius,
    },
    xMin: knobSize * 2,
    xMax: clientWidth - knobSize,
  } as CircleKnob

  /**
   * Bar
   */
  $: outerBarProps = {
    x1: barWidth / 2,
    y1: barWidth / 2,
    x2: clientWidth - barWidth / 2,
    y2: barWidth / 2,
  }

  $: innerBarProps = {
    x1: knobLeft.circle.cx,
    y1: barWidth / 2,
    x2: knobRight.circle.cx,
    y2: barWidth / 2,
  }

  onMount(() => {
    initialize()
  })

  afterUpdate(() => {
    // adject knob position
    if (knobLeft.circle.cx <= knobLeft.xMin) {
      knobLeft.circle.cx = knobLeft.xMin
    }
    if (knobRight.circle.cx >= knobRight.xMax) {
      knobRight.circle.cx = knobRight.xMax
    }

    if (throttoleTimer) return
    throttoleTimer = true
    setTimeout(() => {
      dispatch('range-changed', { key: key, from: stateFrom, to: stateTo } as RangeChanged)
      throttoleTimer = false
    }, throttole)
  })

  function initialize() {
    // validate props
    if (rangeMin > rangeMax) {
      rangeMin = rangeMax
    }
    if (defaultFrom > defaultTo) {
      defaultFrom = defaultTo
    }
    if (Math.min(defaultFrom, defaultTo, rangeMin) !== rangeMin) {
      defaultFrom = Math.max(rangeMin, defaultFrom)
      defaultTo = Math.max(rangeMin, defaultTo)
    }
    if (Math.max(defaultFrom, defaultTo, rangeMax) !== rangeMax) {
      defaultFrom = Math.min(rangeMax, defaultFrom)
      defaultTo = Math.min(rangeMax, defaultTo)
    }
    knobLeft.circle.cx = valueToPosition(defaultFrom, knobLeft.xMin, knobLeft.xMax, true)
    knobRight.circle.cx = valueToPosition(defaultTo, knobRight.xMin, knobRight.xMax)
    stateFrom = defaultFrom
    stateTo = defaultTo
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function render(_node: HTMLElement, _clientWidth?: number) {
    return {
      update(clientWidth?: number) {
        if (!clientWidth) {
          return
        }
        viewBox = `0 0 ${clientWidth} ${barWidth}`
        initialize()
      },
    }
  }

  function valueToPosition(value: number, min: number, max: number, isLeft = false) {
    if (rangeMax - rangeMin === 0) {
      return isLeft ? min : max
    }

    let x = Math.round(barLength * (Math.abs(value - rangeMin) / Math.abs(rangeMax - rangeMin)))
    x += isLeft ? knobSize : knobSize * 2
    if (x >= max) {
      return max
    }
    if (x <= min) {
      return min
    }
    return x
  }

  function positionToValue(position: number, min: number, max: number) {
    if (position >= max) {
      return rangeMax
    }
    if (position <= min) {
      return rangeMin
    }
    return rangeMin + Math.round(Math.abs(rangeMax - rangeMin) * (position / barLength))
  }

  function grab(node: Element) {
    const handleHold = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      if (node.contains(e.target as Node)) {
        node.dispatchEvent(new CustomEvent('hold'))
      }
    }

    const handleRelease = (e: MouseEvent | TouchEvent) => {
      if (node.contains(e.target as Node)) {
        node.dispatchEvent(new CustomEvent('release'))
      }
    }

    if (isTouchDevice) {
      document.addEventListener('touchstart', handleHold, { passive: false })
    } else {
      document.addEventListener('mousedown', handleHold, true)
      document.addEventListener('mouseup', handleRelease, true)
    }

    return {
      destroy() {
        document.removeEventListener('mousedown', handleHold, true)
        document.removeEventListener('mouseup', handleRelease, true)
        document.removeEventListener('touchstart', handleHold, {
          passive: false,
        } as EventListenerOptions)
      },
    }
  }

  function swipe(node: Element) {
    const handleMove = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      const gaugeContainer = node.getBoundingClientRect()
      if (isActiveL) {
        let x = Math.max(knobLeft.xMin, Math.round(getScreenX(e) - gaugeContainer.left))
        if (x >= knobRight.circle.cx - knobSize) {
          // too close
          x = knobRight.circle.cx - knobSize
        }
        if (x >= knobLeft.xMax) {
          x = knobLeft.xMax
        }
        stateFrom = positionToValue(x - knobSize, knobLeft.xMin - knobSize, knobLeft.xMax)
        knobLeft.circle.cx = x
      }
      if (isActiveR) {
        let x = Math.min(knobRight.xMax, Math.round(getScreenX(e) - gaugeContainer.left))
        if (x <= knobLeft.circle.cx + knobSize) {
          x = knobLeft.circle.cx + knobSize
        }
        if (x <= knobRight.xMin) {
          x = knobRight.xMin
        }
        stateTo = positionToValue(x - knobSize * 2, knobRight.xMin - knobSize * 2, knobRight.xMax)
        knobRight.circle.cx = x
      }
    }

    const handleMoveEnd = (e: Event) => {
      handleMove(e)
      isActiveL = false
      isActiveR = false
    }

    const getScreenX = (e: Event): number => {
      if (isTouchDevice && e instanceof TouchEvent) {
        return e.changedTouches[0].clientX
      } else if (e instanceof MouseEvent) {
        return e.clientX
      }
      return 0
    }

    if (isTouchDevice) {
      document.addEventListener('touchmove', handleMove, { passive: false })
      document.addEventListener('touchend', handleMoveEnd, true)
    } else {
      document.addEventListener('mousemove', handleMove, true)
      document.addEventListener('mouseup', handleMoveEnd, true)
    }

    return {
      destroy() {
        document.removeEventListener('mousemove', handleMove, true)
        document.removeEventListener('mouseup', handleMoveEnd, true)
        document.removeEventListener('touchmove', handleMove, {
          passive: false,
        } as EventListenerOptions)
        document.removeEventListener('touchend', handleMoveEnd, true)
      },
    }
  }
</script>

<div class="input-multi-range" bind:clientWidth use:render={clientWidth}>
  <svg {viewBox} use:swipe width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
    <title>Range Controller</title>
    <desc>Manipulate range from {rangeMin} to {rangeMax}</desc>
    <defs>
      <linearGradient id="range-gradient-{styleKey}" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color={rangeMinColor} />
        <stop offset="100%" stop-color={rangeMaxColor} />
      </linearGradient>
    </defs>
    <filter id="knob__shadow" width="160%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
      <feOffset dx="2" dy="2" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <line
      {...outerBarProps}
      stroke-linecap="round"
      stroke-width={barWidth}
      class={`input-multi-range__outer-bar${useDarkMode ? '--dark' : ''}`}
    />
    <line
      {...innerBarProps}
      stroke-width={barWidth * 0.8}
      stroke="#cccccc"
      style="stroke: url(#range-gradient-{styleKey}) {noneGradientBarColor}"
      class="input-multi-range__inner-bar"
    />
    <g role="button" aria-pressed={isActiveL}>
      <title>Knob Left</title>
      <circle
        {...knobLeft.circle}
        use:grab
        on:hold={() => (isActiveL = true)}
        on:release={() => (isActiveL = false)}
        class="input-multi-range__knob"
        class:input-multi-range__knob--active={isActiveL}
        filter="url(#knob__shadow)"
        role="meter"
        aria-valuenow={stateFrom}
        aria-valuemin={rangeMin}
        aria-valuemax={stateTo}
      />
    </g>
    <g role="button" aria-pressed={isActiveR}>
      <title>Knob Right</title>
      <circle
        {...knobRight.circle}
        use:grab
        on:hold={() => (isActiveR = true)}
        on:release={() => (isActiveR = false)}
        class="input-multi-range__knob"
        class:input-multi-range__knob--active={isActiveR}
        filter="url(#knob__shadow)"
        role="meter"
        aria-valuenow={stateTo}
        aria-valuemin={stateFrom}
        aria-valuemax={rangeMax}
      />
    </g>
  </svg>
</div>

<style global>
  .input-multi-range {
    width: 100%;
    height: 100%;
  }

  .input-multi-range__outer-bar {
    stroke: #e9e9e9;
  }

  .input-multi-range__outer-bar--dark {
    stroke: #808080;
  }

  .input-multi-range__knob {
    fill: #d4d4d4;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }

  .input-multi-range__knob--active {
    fill: #fba9a9;
    transition: fill 0.2s ease-out;
  }
</style>
