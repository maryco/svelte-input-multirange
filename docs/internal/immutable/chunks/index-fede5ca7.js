function v() {}
function J(t, e) {
  for (const n in e) t[n] = e[n]
  return t
}
function T(t) {
  return t()
}
function M() {
  return Object.create(null)
}
function p(t) {
  t.forEach(T)
}
function B(t) {
  return typeof t == 'function'
}
function dt(t, e) {
  return t != t ? e == e : t !== e || (t && typeof t == 'object') || typeof t == 'function'
}
function K(t) {
  return Object.keys(t).length === 0
}
function Q(t, ...e) {
  if (t == null) return v
  const n = t.subscribe(...e)
  return n.unsubscribe ? () => n.unsubscribe() : n
}
function _t(t, e, n) {
  t.$$.on_destroy.push(Q(e, n))
}
function ht(t, e, n, i) {
  if (t) {
    const r = O(t, e, n, i)
    return t[0](r)
  }
}
function O(t, e, n, i) {
  return t[1] && i ? J(n.ctx.slice(), t[1](i(e))) : n.ctx
}
function mt(t, e, n, i) {
  if (t[2] && i) {
    const r = t[2](i(n))
    if (e.dirty === void 0) return r
    if (typeof r == 'object') {
      const s = [],
        o = Math.max(e.dirty.length, r.length)
      for (let u = 0; u < o; u += 1) s[u] = e.dirty[u] | r[u]
      return s
    }
    return e.dirty | r
  }
  return e.dirty
}
function pt(t, e, n, i, r, s) {
  if (r) {
    const o = O(e, n, i, s)
    t.p(o, r)
  }
}
function yt(t) {
  if (t.ctx.length > 32) {
    const e = [],
      n = t.ctx.length / 32
    for (let i = 0; i < n; i++) e[i] = -1
    return e
  }
  return -1
}
function gt(t) {
  return t && B(t.destroy) ? t.destroy : v
}
let $ = !1
function R() {
  $ = !0
}
function U() {
  $ = !1
}
function V(t, e, n, i) {
  for (; t < e; ) {
    const r = t + ((e - t) >> 1)
    n(r) <= i ? (t = r + 1) : (e = r)
  }
  return t
}
function X(t) {
  if (t.hydrate_init) return
  t.hydrate_init = !0
  let e = t.childNodes
  if (t.nodeName === 'HEAD') {
    const c = []
    for (let l = 0; l < e.length; l++) {
      const f = e[l]
      f.claim_order !== void 0 && c.push(f)
    }
    e = c
  }
  const n = new Int32Array(e.length + 1),
    i = new Int32Array(e.length)
  n[0] = -1
  let r = 0
  for (let c = 0; c < e.length; c++) {
    const l = e[c].claim_order,
      f = (r > 0 && e[n[r]].claim_order <= l ? r + 1 : V(1, r, (y) => e[n[y]].claim_order, l)) - 1
    i[c] = n[f] + 1
    const a = f + 1
    ;(n[a] = c), (r = Math.max(a, r))
  }
  const s = [],
    o = []
  let u = e.length - 1
  for (let c = n[r] + 1; c != 0; c = i[c - 1]) {
    for (s.push(e[c - 1]); u >= c; u--) o.push(e[u])
    u--
  }
  for (; u >= 0; u--) o.push(e[u])
  s.reverse(), o.sort((c, l) => c.claim_order - l.claim_order)
  for (let c = 0, l = 0; c < o.length; c++) {
    for (; l < s.length && o[c].claim_order >= s[l].claim_order; ) l++
    const f = l < s.length ? s[l] : null
    t.insertBefore(o[c], f)
  }
}
function Y(t, e) {
  t.appendChild(e)
}
function Z(t, e) {
  if ($) {
    for (
      X(t),
        (t.actual_end_child === void 0 ||
          (t.actual_end_child !== null && t.actual_end_child.parentNode !== t)) &&
          (t.actual_end_child = t.firstChild);
      t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

    )
      t.actual_end_child = t.actual_end_child.nextSibling
    e !== t.actual_end_child
      ? (e.claim_order !== void 0 || e.parentNode !== t) && t.insertBefore(e, t.actual_end_child)
      : (t.actual_end_child = e.nextSibling)
  } else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e)
}
function bt(t, e, n) {
  $ && !n ? Z(t, e) : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null)
}
function W(t) {
  t.parentNode.removeChild(t)
}
function D(t) {
  return document.createElement(t)
}
function tt(t) {
  return document.createElementNS('http://www.w3.org/2000/svg', t)
}
function A(t) {
  return document.createTextNode(t)
}
function xt() {
  return A(' ')
}
function wt() {
  return A('')
}
function z(t, e, n, i) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i)
}
function et(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
}
function vt(t, e) {
  for (const n in e) et(t, n, e[n])
}
function nt(t) {
  return Array.from(t.childNodes)
}
function it(t) {
  t.claim_info === void 0 && (t.claim_info = { last_index: 0, total_claimed: 0 })
}
function I(t, e, n, i, r = !1) {
  it(t)
  const s = (() => {
    for (let o = t.claim_info.last_index; o < t.length; o++) {
      const u = t[o]
      if (e(u)) {
        const c = n(u)
        return c === void 0 ? t.splice(o, 1) : (t[o] = c), r || (t.claim_info.last_index = o), u
      }
    }
    for (let o = t.claim_info.last_index - 1; o >= 0; o--) {
      const u = t[o]
      if (e(u)) {
        const c = n(u)
        return (
          c === void 0 ? t.splice(o, 1) : (t[o] = c),
          r ? c === void 0 && t.claim_info.last_index-- : (t.claim_info.last_index = o),
          u
        )
      }
    }
    return i()
  })()
  return (s.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), s
}
function q(t, e, n, i) {
  return I(
    t,
    (r) => r.nodeName === e,
    (r) => {
      const s = []
      for (let o = 0; o < r.attributes.length; o++) {
        const u = r.attributes[o]
        n[u.name] || s.push(u.name)
      }
      s.forEach((o) => r.removeAttribute(o))
    },
    () => i(e)
  )
}
function $t(t, e, n) {
  return q(t, e, n, D)
}
function Et(t, e, n) {
  return q(t, e, n, tt)
}
function rt(t, e) {
  return I(
    t,
    (n) => n.nodeType === 3,
    (n) => {
      const i = '' + e
      if (n.data.startsWith(i)) {
        if (n.data.length !== i.length) return n.splitText(i.length)
      } else n.data = i
    },
    () => A(e),
    !0
  )
}
function kt(t) {
  return rt(t, ' ')
}
function Nt(t, e) {
  ;(e = '' + e), t.wholeText !== e && (t.data = e)
}
function At(t, e, n, i) {
  n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, i ? 'important' : '')
}
let g
function ot() {
  if (g === void 0) {
    g = !1
    try {
      typeof window < 'u' && window.parent && window.parent.document
    } catch {
      g = !0
    }
  }
  return g
}
function St(t, e) {
  getComputedStyle(t).position === 'static' && (t.style.position = 'relative')
  const i = D('iframe')
  i.setAttribute(
    'style',
    'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;'
  ),
    i.setAttribute('aria-hidden', 'true'),
    (i.tabIndex = -1)
  const r = ot()
  let s
  return (
    r
      ? ((i.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>"),
        (s = z(window, 'message', (o) => {
          o.source === i.contentWindow && e()
        })))
      : ((i.src = 'about:blank'),
        (i.onload = () => {
          s = z(i.contentWindow, 'resize', e)
        })),
    Y(t, i),
    () => {
      ;(r || (s && i.contentWindow)) && s(), W(i)
    }
  )
}
function jt(t, e, n) {
  t.classList[n ? 'add' : 'remove'](e)
}
function ct(t, e, { bubbles: n = !1, cancelable: i = !1 } = {}) {
  const r = document.createEvent('CustomEvent')
  return r.initCustomEvent(t, n, i, e), r
}
let m
function h(t) {
  m = t
}
function S() {
  if (!m) throw new Error('Function called outside component initialization')
  return m
}
function Ct(t) {
  S().$$.on_mount.push(t)
}
function Mt(t) {
  S().$$.after_update.push(t)
}
function zt() {
  const t = S()
  return (e, n, { cancelable: i = !1 } = {}) => {
    const r = t.$$.callbacks[e]
    if (r) {
      const s = ct(e, n, { cancelable: i })
      return (
        r.slice().forEach((o) => {
          o.call(t, s)
        }),
        !s.defaultPrevented
      )
    }
    return !0
  }
}
const _ = [],
  L = [],
  x = [],
  P = [],
  F = Promise.resolve()
let k = !1
function H() {
  k || ((k = !0), F.then(G))
}
function Lt() {
  return H(), F
}
function N(t) {
  x.push(t)
}
const E = new Set()
let b = 0
function G() {
  const t = m
  do {
    for (; b < _.length; ) {
      const e = _[b]
      b++, h(e), st(e.$$)
    }
    for (h(null), _.length = 0, b = 0; L.length; ) L.pop()()
    for (let e = 0; e < x.length; e += 1) {
      const n = x[e]
      E.has(n) || (E.add(n), n())
    }
    x.length = 0
  } while (_.length)
  for (; P.length; ) P.pop()()
  ;(k = !1), E.clear(), h(t)
}
function st(t) {
  if (t.fragment !== null) {
    t.update(), p(t.before_update)
    const e = t.dirty
    ;(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(N)
  }
}
const w = new Set()
let d
function Pt() {
  d = { r: 0, c: [], p: d }
}
function Tt() {
  d.r || p(d.c), (d = d.p)
}
function ut(t, e) {
  t && t.i && (w.delete(t), t.i(e))
}
function Bt(t, e, n, i) {
  if (t && t.o) {
    if (w.has(t)) return
    w.add(t),
      d.c.push(() => {
        w.delete(t), i && (n && t.d(1), i())
      }),
      t.o(e)
  } else i && i()
}
function Ot(t, e) {
  const n = {},
    i = {},
    r = { $$scope: 1 }
  let s = t.length
  for (; s--; ) {
    const o = t[s],
      u = e[s]
    if (u) {
      for (const c in o) c in u || (i[c] = 1)
      for (const c in u) r[c] || ((n[c] = u[c]), (r[c] = 1))
      t[s] = u
    } else for (const c in o) r[c] = 1
  }
  for (const o in i) o in n || (n[o] = void 0)
  return n
}
function Wt(t) {
  return typeof t == 'object' && t !== null ? t : {}
}
function Dt(t) {
  t && t.c()
}
function It(t, e) {
  t && t.l(e)
}
function lt(t, e, n, i) {
  const { fragment: r, on_mount: s, on_destroy: o, after_update: u } = t.$$
  r && r.m(e, n),
    i ||
      N(() => {
        const c = s.map(T).filter(B)
        o ? o.push(...c) : p(c), (t.$$.on_mount = [])
      }),
    u.forEach(N)
}
function at(t, e) {
  const n = t.$$
  n.fragment !== null &&
    (p(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []))
}
function ft(t, e) {
  t.$$.dirty[0] === -1 && (_.push(t), H(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31)
}
function qt(t, e, n, i, r, s, o, u = [-1]) {
  const c = m
  h(t)
  const l = (t.$$ = {
    fragment: null,
    ctx: null,
    props: s,
    update: v,
    not_equal: r,
    bound: M(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (c ? c.$$.context : [])),
    callbacks: M(),
    dirty: u,
    skip_bound: !1,
    root: e.target || c.$$.root,
  })
  o && o(l.root)
  let f = !1
  if (
    ((l.ctx = n
      ? n(t, e.props || {}, (a, y, ...j) => {
          const C = j.length ? j[0] : y
          return (
            l.ctx &&
              r(l.ctx[a], (l.ctx[a] = C)) &&
              (!l.skip_bound && l.bound[a] && l.bound[a](C), f && ft(t, a)),
            y
          )
        })
      : []),
    l.update(),
    (f = !0),
    p(l.before_update),
    (l.fragment = i ? i(l.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      R()
      const a = nt(e.target)
      l.fragment && l.fragment.l(a), a.forEach(W)
    } else l.fragment && l.fragment.c()
    e.intro && ut(t.$$.fragment), lt(t, e.target, e.anchor, e.customElement), U(), G()
  }
  h(c)
}
class Ft {
  $destroy() {
    at(this, 1), (this.$destroy = v)
  }
  $on(e, n) {
    const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = [])
    return (
      i.push(n),
      () => {
        const r = i.indexOf(n)
        r !== -1 && i.splice(r, 1)
      }
    )
  }
  $set(e) {
    this.$$set && !K(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1))
  }
}
export {
  v as A,
  ht as B,
  pt as C,
  yt as D,
  mt as E,
  Z as F,
  _t as G,
  J as H,
  tt as I,
  Et as J,
  vt as K,
  jt as L,
  N as M,
  St as N,
  gt as O,
  z as P,
  Ot as Q,
  B as R,
  Ft as S,
  p as T,
  zt as U,
  Wt as V,
  xt as a,
  bt as b,
  kt as c,
  Tt as d,
  wt as e,
  ut as f,
  Pt as g,
  W as h,
  qt as i,
  Mt as j,
  D as k,
  $t as l,
  nt as m,
  et as n,
  Ct as o,
  At as p,
  A as q,
  rt as r,
  dt as s,
  Bt as t,
  Nt as u,
  Dt as v,
  It as w,
  lt as x,
  at as y,
  Lt as z,
}
