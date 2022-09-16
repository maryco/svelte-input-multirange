import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import { getCtxProperties } from './test-helpers'
import InputMultiRange from '../lib/InputMultiRange.svelte'

describe('Render with various properties', () => {
  const clientWidth = 480

  beforeEach(() => {
    // @testing-library/jest-dom does not have a 'clientWidth'?
    jest.spyOn(Element.prototype, 'clientWidth', 'get').mockImplementation(() => clientWidth)
  })

  test('should be work default', () => {
    const { container } = render(InputMultiRange)
    expect(container.getElementsByTagName('svg')).toBeDefined()

    const outerBar: any = container.querySelector('.input-multi-range__outer-bar')
    expect(+outerBar.getAttribute('x1')).toBeGreaterThan(0)
    expect(+outerBar.getAttribute('x2')).toBeLessThan(clientWidth)

    const innerBar: any = container.querySelector('.input-multi-range__inner-bar')
    expect(+innerBar.getAttribute('x1')).toBeGreaterThan(+outerBar.getAttribute('x1'))
    expect(+innerBar.getAttribute('x2')).toBeLessThan(+outerBar.getAttribute('x2'))

    // Need '"lib": ["DOM.Iterable"]' to tsconfig compilerOptions to prevent errors below.
    // TS2488: Type 'HTMLCollectionOf<SVGCircleElement>' must have a '[Symbol.iterator]()' method that returns an iterator.
    const [knobLeft, knobRight] = container.getElementsByTagName('circle')
    expect(knobLeft).not.toHaveClass('input-multi-range__knob--active')
    expect(knobRight).not.toHaveClass('input-multi-range__knob--active')
  })

  const properties = [
    {
      props: {
        barWidth: 10,
        knobSize: 0,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 0,
        defaultTo: 100,
      },
    },
    // out of range
    {
      props: {
        barWidth: 15,
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: -1,
        defaultTo: 101,
      },
    },
    // from grater than to
    {
      props: {
        barWidth: 40,
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 50,
        defaultTo: 49,
      },
    },
    // from and to are same
    {
      props: {
        barWidth: 1,
        knobSize: 20,
        rangeMin: 0,
        rangeMax: 100,
        defaultFrom: 99,
        defaultTo: 99,
      },
    },
    // no range
    {
      props: {
        barWidth: 2,
        knobSize: 20,
        rangeMin: 1,
        rangeMax: 1,
        defaultFrom: 1,
        defaultTo: 1,
      },
    },
    // range min is negative
    {
      props: {
        barWidth: 1,
        knobSize: 20,
        rangeMin: -100,
        rangeMax: 100,
        defaultFrom: 99,
        defaultTo: 99,
      },
    },
    // range min and max is negative
    {
      props: {
        barWidth: 0,
        knobSize: 20,
        rangeMin: -2000,
        rangeMax: -99,
        defaultFrom: -1500,
        defaultTo: 0,
      },
    },
  ]

  test.each(properties)('should knob positions are correct', ({ props }) => {
    const { container, component } = render(InputMultiRange, { ...props })
    const ctxProps = getCtxProperties(component)

    const [knobLeft, knobRight] = container.getElementsByTagName('circle')
    expect(Number(knobLeft.getAttribute('cx'))).toBeGreaterThan(0)
    expect(Number(knobLeft.getAttribute('cx'))).toBeLessThanOrEqual(
      Number(knobRight.getAttribute('cx'))
    )
    expect(Number(knobRight.getAttribute('cx'))).toBeLessThan(clientWidth)
    //console.log(`${knobLeft.getAttribute('cx')} to ${knobRight.getAttribute('cx')}`)

    expect(ctxProps['defaultFrom']).toBeGreaterThanOrEqual(+ctxProps['rangeMin'])
    expect(ctxProps['defaultFrom']).toBeLessThanOrEqual(+ctxProps['defaultTo'])
    expect(ctxProps['defaultTo']).toBeLessThanOrEqual(+ctxProps['rangeMax'])
  })
})
