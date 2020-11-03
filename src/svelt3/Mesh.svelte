<script context="module" lang="ts">
    import * as three from "three";
    // Something to use when no mesh is supplied
    let emptyGeometry = new three.BufferGeometry();
</script>

<script lang="ts">
    import Context from "./context";
    import { createEventDispatcher, onDestroy } from "svelte";
    import { forwardEventsToSvelte } from "./three.interaction";
import type { InteractionEvent } from "three.interaction";

    let context = Context.GetContext();

    export let geometry: three.Geometry;
    export let position: three.Vector3 = new three.Vector3(0, 0, 0);
    export let rotation: three.Euler = new three.Euler(0, 0, 0, "XYZ");
    export let receiveShadow: boolean = true;
    export let castShadow: boolean = true;
    export let name: string = "";

    export let enableDrag = false;

    let mesh = new three.Mesh(undefined, context.material);

    const dispatch = createEventDispatcher();
    forwardEventsToSvelte(mesh, dispatch);

    export const object3d: three.Object3D = mesh;

    let meshContext = context.pushObject3D(mesh);

    onDestroy(() => {
        context.container.remove(mesh);
        // mouseDownDestroy();
        context.render();
    });

    enum DragState {
        NoDrag = "No drag",
        DragMaybe = "Drag maybe",
        Dragging = "Dragging"
    }

    let dragState:DragState = DragState.NoDrag;

    interface DragEvent {
        currentTarget: three.Object3D
        type: string
    }

    let cameraControlsEnabled = false;

    //@ts-ignore
    mesh.on("mousedown",(e:InteractionEvent)=>{
        if(enableDrag){
            cameraControlsEnabled = context.cameraControls.enabled;
            context.cameraControls.enabled = false;
            if(dragState==DragState.NoDrag){
                dragState = DragState.DragMaybe;
                window.addEventListener("mousemove", dragMouseMove)
                window.addEventListener("mouseup", dragMouseUp)
            }
        }
    });

    let dragMouseMove = (e:any)=>{
        if(enableDrag){
            if(dragState==DragState.DragMaybe){
                dragState = DragState.Dragging
                dispatch("startdrag", {currentTarget: mesh, type:"startdrag"})
                dispatch("drag", {currentTarget: mesh, type:"drag"})
            }else if(dragState==DragState.Dragging)
            {
                dispatch("drag", {currentTarget: mesh, type:"drag"})
            }
        }
    }

    
    let dragMouseUp = (e:any)=>{
        if(enableDrag){
            context.cameraControls.enabled = cameraControlsEnabled;
            if(dragState!=DragState.NoDrag){
                dragState = DragState.NoDrag;
                dispatch("stopdrag", {currentTarget: mesh, type:"stopdrag"})
                window.removeEventListener("mousemove",dragMouseMove)
                window.removeEventListener("mouseUp",dragMouseUp)
            }
        }
    }


    $: {
        try {
            if (geometry) mesh.geometry = geometry;
            else mesh.geometry = emptyGeometry;

            mesh.castShadow = castShadow; //default is false
            mesh.receiveShadow = receiveShadow; //default
            mesh.name = name;

            mesh.position.copy(position);
            mesh.rotation.copy(rotation);
            context.render();
        } catch (e) {
            console.error(e);
        }
    }

    Context.SetContext(meshContext);
</script>

<slot />
