
  export const InteractionEventTypes = [
    'click',
    'touchstart',
    'touchcancel',
    'touchmove',
    'touchend',
    'mousedown',
    'mouseout',
    'mouseover',
    'mousemove',
    'mouseup'
  ] as const

  export type InteractionEventType = typeof InteractionEventTypes[number];