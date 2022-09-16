// I'm using an attribute/event on a DOM element and it throws a type error
// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
declare namespace svelte.JSX {
  interface SVGAttributes<T> {
    onhold?: () => void
    onrelease?: () => void
  }
}
