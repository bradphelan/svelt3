import * as t$ from 'three'
import { getContext, setContext} from 'svelte'

let contextKey = {};

export class Context {
    renderer: t$.Renderer
    camera:t$.Camera
    container:t$.Object3D
    material: t$.Material
    rayCaster:t$.Raycaster
    constructor(renderer:t$.Renderer,camera:t$.Camera,container:t$.Object3D, material:t$.Material)
    {
        this.renderer=renderer
        this.camera=camera
        this.container=container
        this.material=material
        this.rayCaster = new t$.Raycaster();
    }

    /// Changes the object 3D context
    pushObject3D(child:t$.Object3D)
    {
        this.container.add(child);
        return new Context(this.renderer, this.camera, child, this.material);
    }

    /// Changes the material context
    pushMaterial(material:t$.Material):Context{
        return new Context(this.renderer, this.camera, this.container, material);
    }

    render() {
        this.renderer.render(this.container,this.camera)
    }

    /// Get the current context accessor
    static GetContext = ():Context =>{
        return <Context>getContext(contextKey)
    }

    /// Set the current context
    static SetContext(context:Context){
        setContext(contextKey,context);
    }

    addEventListener(e:string, handler:((arg:t$.Vector2)=>void)):(()=>void){
        let realHandler = (e:any) => {
            let w = this.renderer.domElement.clientWidth;
            let h = this.renderer.domElement.clientHeight;
            var rect = e.target.getBoundingClientRect();
            var xx = e.clientX - rect.left; //x position within the element.
            var yy = e.clientY - rect.top;  //y position within the element.
            let x = ( xx / w) * 2 - 1;
            let y = -( yy / h) * 2 + 1;
            let v = new t$.Vector2(x,y)
            handler(v);
        }
        this.renderer.domElement.addEventListener(e,realHandler)
        return ()=>{
            this.renderer.domElement.removeEventListener(e,realHandler)
        }
    }
    rayIntersect(m:t$.Vector2, obj:t$.Object3D):t$.Intersection[]
    {
        this.rayCaster.setFromCamera( m, this.camera );
        return this.rayCaster.intersectObject(obj)
    }
} 

export default Context;