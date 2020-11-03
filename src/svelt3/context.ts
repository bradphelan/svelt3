import type * as three from 'three'
import { getContext, setContext } from 'svelte'
//@ts-ignore
import { Interaction } from 'three.interaction'
import type CameraControls from 'camera-controls'

let contextKey = {};

export class Context {
    renderer: three.Renderer
    camera: three.Camera
    container: three.Object3D
    material: three.Material
    //rayCaster:three.Raycaster
    interaction: Interaction
    cameraControls: CameraControls

    constructor(renderer: three.Renderer, camera: three.Camera, container: three.Object3D, material: three.Material, cameraControls: CameraControls) {
        this.renderer = renderer
        this.camera = camera
        this.container = container
        this.material = material
        //this.rayCaster = new three.Raycaster();
        this.interaction = new Interaction(this.renderer, this.container, this.camera)
        this.cameraControls = cameraControls
    }

    /// Changes the object 3D context
    pushObject3D(child: three.Object3D) {
        this.container.add(child);
        return new Context(this.renderer, this.camera, child, this.material, this.cameraControls);
    }

    /// Changes the material context
    pushMaterial(material: three.Material): Context {
        return new Context(this.renderer, this.camera, this.container, material, this.cameraControls);
    }

    render() {
        this.renderer.render(this.container, this.camera)
    }

    /// Get the current context accessor
    static GetContext = (): Context => {
        return <Context>getContext(contextKey)
    }

    /// Set the current context
    static SetContext(context: Context) {
        setContext(contextKey, context);
    }

    // addEventListener(e:string, handler:((arg:three.Vector2)=>void)):(()=>void){
    //     let realHandler = (e:any) => {
    //         let w = this.renderer.domElement.clientWidth;
    //         let h = this.renderer.domElement.clientHeight;
    //         var rect = e.target.getBoundingClientRect();
    //         var xx = e.clientX - rect.left; //x position within the element.
    //         var yy = e.clientY - rect.top;  //y position within the element.
    //         let x = ( xx / w) * 2 - 1;
    //         let y = -( yy / h) * 2 + 1;
    //         let v = new three.Vector2(x,y)
    //         handler(v);
    //     }
    //     this.renderer.domElement.addEventListener(e,realHandler)
    //     return ()=>{
    //         this.renderer.domElement.removeEventListener(e,realHandler)
    //     }
    // }
    // rayIntersect(m:three.Vector2, obj:three.Object3D):three.Intersection[]
    // {
    //     this.rayCaster.setFromCamera( m, this.camera );
    //     return this.rayCaster.intersectObject(obj)
    // }
}

export default Context;