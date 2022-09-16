import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/svelte'
import InputMultiRange from '../lib/InputMultiRange.svelte'
import { getCtxProperties } from './test-helpers'

type ChangeRange = {
  key: string
  from: number
  to: number
}

describe('Grab Knob UI', () => {
  const clientWidth = 360

  beforeEach(() => {
    jest.spyOn(Element.prototype, 'clientWidth', 'get').mockImplementation(() => clientWidth)
  })

  test('should grab knob left', async () => {
    const { container } = render(InputMultiRange)
    const [knobLeft, knobRight] = container.getElementsByTagName('circle')
    await fireEvent(
      knobLeft,
      new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(knobLeft).toHaveClass('input-multi-range__knob--active')
    expect(knobRight).not.toHaveClass('input-multi-range__knob--active')

    await fireEvent(
      knobLeft,
      new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(knobLeft).not.toHaveClass('input-multi-range__knob--active')
    expect(knobRight).not.toHaveClass('input-multi-range__knob--active')
  })

  test('should grab knob right', async () => {
    const { container } = render(InputMultiRange)
    const [knobLeft, knobRight] = container.getElementsByTagName('circle')
    await fireEvent(
      knobRight,
      new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(knobLeft).not.toHaveClass('input-multi-range__knob--active')
    expect(knobRight).toHaveClass('input-multi-range__knob--active')

    await fireEvent(
      knobRight,
      new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
      })
    )
    expect(knobLeft).not.toHaveClass('input-multi-range__knob--active')
    expect(knobRight).not.toHaveClass('input-multi-range__knob--active')
  })
})

jest.useFakeTimers()
describe('Swipe Knob UI', () => {
  const clientWidth = 160

  beforeEach(() => {
    // Set up the virtual base container with mocks
    jest.spyOn(Element.prototype, 'clientWidth', 'get').mockImplementation(() => clientWidth)
    // @testing-library/jest-dom does not have a 'getBoundingClientRect'?
    // https://kuma-emon.com/it/pc/1539/
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
      jest.fn(
        () =>
          ({
            x: 0,
            y: 0,
            left: 0,
            bottom: 0,
            width: clientWidth,
            height: 50,
          } as DOMRect)
      )
    )
  })

  const dataForLeft = [
    // to right
    {
      props: {
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 0,
        defaultTo: 100,
      },
      moveX: 21,
    },
    // to left
    {
      props: {
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 50,
        defaultTo: 100,
      },
      moveX: 21,
    },
    // attempt over right knob
    {
      props: {
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 50,
        defaultTo: 50,
      },
      moveX: 81,
    },
    // out of min range
    {
      props: {
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 0,
        defaultTo: 50,
      },
      moveX: 0,
    },
  ]

  test.each(dataForLeft)('swipe left knob and it should work', async ({ props, moveX }) => {
    const { container, component } = render(InputMultiRange, { ...props })
    let rangeState: ChangeRange | any = {}
    component.$on('range-changed', (e) => {
      rangeState = { ...e.detail }
    })
    const ctxProps = getCtxProperties(component)

    const svg = container.getElementsByTagName('svg')[0]
    const [knobLeft, knobRight] = container.getElementsByTagName('circle')

    // before position
    const beforeRightCx = Number(knobRight.getAttribute('cx'))

    // swipe
    await fireEvent(knobLeft, new MouseEvent('mousedown'))
    await fireEvent(svg, new MouseEvent('mousemove', { clientX: moveX }))
    await fireEvent(svg, new MouseEvent('mouseup', { clientX: moveX }))

    // NOTE: cant't move less than knobSize
    const expectedX = Math.max(props.knobSize, Math.min(moveX, beforeRightCx))
    expect(Number(knobLeft.getAttribute('cx'))).toBeLessThanOrEqual(expectedX)
    expect(Number(knobRight.getAttribute('cx'))).toEqual(beforeRightCx)

    // NOTE: 'range-changed' events are dispatched with using setTimeout()
    jest.runAllTimers()
    // to value is not changed
    expect(rangeState.to).toEqual(+ctxProps['defaultTo'])
  })

  const dataForRight = [
    // to left
    {
      props: {
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 0,
        defaultTo: 100,
      },
      moveX: 80,
    },
    // to right
    {
      props: {
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 50,
        defaultTo: 80,
      },
      moveX: 60,
    },
    // attempt over left knob
    {
      props: {
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 50,
        defaultTo: 50,
      },
      moveX: 30,
    },
    // out of max range
    {
      props: {
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 0,
        defaultTo: 20,
      },
      moveX: 150,
    },
  ]

  test.each(dataForRight)('swipe right knob and it should work', async ({ props, moveX }) => {
    const { container, component } = render(InputMultiRange, { ...props })
    let rangeState: ChangeRange | any = {}
    component.$on('range-changed', (e) => {
      rangeState = { ...e.detail }
    })
    const ctxProps = getCtxProperties(component)

    const svg = container.getElementsByTagName('svg')[0]
    const [knobLeft, knobRight] = container.getElementsByTagName('circle')

    // before position
    const beforeLeftCx = Number(knobLeft.getAttribute('cx'))

    // swipe
    await fireEvent(knobRight, new MouseEvent('mousedown'))
    await fireEvent(svg, new MouseEvent('mousemove', { clientX: moveX }))
    await fireEvent(svg, new MouseEvent('mouseup', { clientX: moveX }))

    // NOTE: cant't move grater than (clientWidth - knobSize)
    const expectedX = Math.min(clientWidth - props.knobSize, Math.max(moveX, beforeLeftCx))
    expect(Number(knobLeft.getAttribute('cx'))).toEqual(beforeLeftCx)
    expect(Number(knobLeft.getAttribute('cx'))).toBeLessThanOrEqual(expectedX)

    jest.runAllTimers()
    // from value is not changed
    expect(rangeState.from).toEqual(+ctxProps['defaultFrom'])
  })
})
