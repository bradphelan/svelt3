<script context="module" lang="ts">
    import * as three from "three"
    // Something to use when no mesh is supplied
    let emptyGeometry = new three.BufferGeometry();
</script>

<script lang="ts">
    import Context from "./context"
    import { createEventDispatcher, onDestroy } from "svelte";
    import { log } from "../demo/Console.svelte";
    import type { InteractionEvent} from 'three.interaction'
    import {InteractionEventTypes} from './three.interaction'


    let context = Context.GetContext()

    export let geometry:three.Geometry
    export let position: three.Vector3 = new three.Vector3(0,0,0);
    export let rotation: three.Euler = new three.Euler(0,0,0,'XYZ');
    export let receiveShadow: boolean = true;
    export let castShadow: boolean = true;
    export let name:string ="";

    let mesh = new three.Mesh(undefined,context.material)



    const dispatch = createEventDispatcher();
    const dispatch_ = (name:string, ev:InteractionEvent)=>{
        dispatch(name, ev)
    }

    //@ts-ignore:
    mesh.cursor="pointer";
    InteractionEventTypes.forEach(event => {
       mesh.on(event,(ev: InteractionEvent)=>(dispatch_(event,ev)))
    });

    export const object3d: three.Object3D = mesh


    let meshContext = context.pushObject3D(mesh);

    onDestroy(()=>{
        context.container.remove(mesh);
        // mouseDownDestroy();
        context.render();
    })

    $: {
        try{
            if(geometry)
                mesh.geometry = geometry;
            else
                mesh.geometry = emptyGeometry;

            mesh.castShadow = castShadow; //default is false
            mesh.receiveShadow = receiveShadow; //default
            mesh.name = name;
                
                mesh.position.copy(position);
                mesh.rotation.copy(rotation);
            context.render();
        }catch(e){
            console.error(e);
        }
    }

    Context.SetContext(meshContext)

</script>

<slot/>