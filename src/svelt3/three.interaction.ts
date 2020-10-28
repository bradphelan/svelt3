
import type * as three from 'three'
import type {InteractionEvent} from 'three.interaction'

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

export const forwardEventsToSvelte = (
  object:three.Mesh, 
  dispatch:<EventKey extends string>(type: EventKey, detail?: any) => void)=>
{

    //@ts-ignore
    object.cursor="pointer";

    InteractionEventTypes.forEach(event => {
        const dispatch_ = (name:string, ev:InteractionEvent)=>{
            dispatch(name, ev)
        }

       // @ts-ignore
       object.on(event,(ev: InteractionEvent)=>(dispatch_(event,ev)))
    });

}