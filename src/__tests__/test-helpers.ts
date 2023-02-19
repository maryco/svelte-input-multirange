import type { SvelteComponent } from 'svelte'

export const getCtxProperties = (component: SvelteComponent): any => {
  // get actual property values in ctx
  // console.log(component.$$.ctx[component.$$.props.rangeMax])
  interface CtxProps {
    [key: string]: any
  }
  const ctxProps: CtxProps = {}
  Object.keys(component.$$.props).forEach((key: any) => {
    ctxProps[key] = component.$$.ctx[component.$$.props[key] as number]
  })
  return ctxProps
}
