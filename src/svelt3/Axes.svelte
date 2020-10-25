<script lang="ts">
    import * as t$ from "three"
    import Context from "./context"
    import {  onDestroy } from "svelte";

    let context = Context.GetContext()

    export let position: t$.Vector3 = new t$.Vector3(0,0,0);
    export let rotation: t$.Euler = new t$.Euler(0,0,0,'XYZ');
    export const size = 5;

    let axis = new t$.AxesHelper(size)
    export const object3d: t$.Object3D = axis 

    let axisContext = context.pushObject3D(axis);

    onDestroy(()=>{
        context.container.remove(axis);
        context.render();
    })

    $: {
        axis.position.copy(position)
        axis.rotation.copy(rotation)
        context.render();
    }

    Context.SetContext(axisContext)

</script>

<slot/>