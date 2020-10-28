/* Use this file to declare any custom file extensions for importing */
/* Use this folder to also add/extend a package d.ts file, if needed. */

declare module '*.css';
declare module '*.svg' {
  const ref: string;
  export default ref;
}
declare module '*.bmp' {
  const ref: string;
  export default ref;
}
declare module '*.gif' {
  const ref: string;
  export default ref;
}
declare module '*.jpg' {
  const ref: string;
  export default ref;
}
declare module '*.jpeg' {
  const ref: string;
  export default ref;
}
declare module '*.png' {
  const ref: string;
  export default ref;
}
declare module '*.webp' {
  const ref: string;
  export default ref;
}
declare module '*.avif' {
  const ref: string;
  export default ref;
}


declare module 'three.interaction' {

  export interface InteractionData {
    button: number
    buttons: number
    global: three.Vector2
    height: number
    identifier: number
    isPrimary: boolean
    originalEvent: MouseEvent | TouchEvent | PointerEvent
    pointerId: number
    pointerType: string
    pressure: number
    rotationAngle: number
    tangentialPressure: number
    target: three.Object3D
    tiltX: number
    tiltY: number
    twist: number
    width: number
  }



  export interface InteractionEvent {
    currentTarget: three.Object3D
    data: InteractionData
    intersects: three.Intersection[]
    stopped: boolean
    target: Object3D
    type: string
    stopPropogation: () => void
  }

}