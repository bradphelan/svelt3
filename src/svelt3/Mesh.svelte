<script context="module" lang="ts">
    import * as t$ from "three"
    // Something to use when no mesh is supplied
    let emptyGeometry = new t$.BufferGeometry();
</script>

<script lang="ts">
    import Context from "./context"
    import { createEventDispatcher, onDestroy } from "svelte";

    const dispatch = createEventDispatcher();

    let context = Context.GetContext()

    export let geometry:t$.Geometry
    export let position: t$.Vector3 = new t$.Vector3(0,0,0);
    export let rotation: t$.Euler = new t$.Euler(0,0,0,'XYZ');
    export let receiveShadow: boolean = true;
    export let castShadow: boolean = true;
    export let name:string ="";

    let mesh = new t$.Mesh(undefined,context.material)
    export const object3d: t$.Object3D = mesh

    let mouseDownDestroy = context.addEventListener("pointerdown",(e:t$.Vector2)=>{
        let i = context.rayIntersect(e, mesh)
        if(i.length>0){
            dispatch("click", i[0])
        }
    })

    let meshContext = context.pushObject3D(mesh);

    onDestroy(()=>{
        context.container.remove(mesh);
        mouseDownDestroy();
        context.render();
    })

    $: {
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
    }

    Context.SetContext(meshContext)

</script>

<slot/>