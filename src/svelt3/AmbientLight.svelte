<script lang="ts">
    import Context from "./context"
    import { onDestroy } from "svelte";
    import * as t$ from "three"

    let context = Context.GetContext()

    export let color:t$.Color | string | number = "white";
    export let intensity:number = 1;
    export let position:t$.Vector3  = new t$.Vector3(0,0,0);
    export let rotation:t$.Euler = new t$.Euler(0,0,0,'XYZ');

    let light = new t$.AmbientLight(color,intensity);

    // Visualize point light location.

    let lightContext = context.pushObject3D(light);

    onDestroy(()=>{
        context.container.remove(light);
    })

    $: {
        light.color = new t$.Color(color);
        light.intensity = intensity;
        light.position.copy(position);
        light.rotation.copy(rotation);
        context.render();
    }

    Context.SetContext(lightContext)

</script>