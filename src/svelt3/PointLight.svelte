<script lang="ts">
    import Context from "./context"
    import { onDestroy } from "svelte";
    import * as t$ from "three"

    let context = Context.GetContext()

    export let color: t$.Color | string | number = new t$.Color("white");
    export let intensity:  number = 1;
    export let distance: number=0;
    export let decay: number=1;
    export let position: t$.Vector3 = new t$.Vector3(0,0,0);
    export let rotation: t$.Euler = new t$.Euler(0,0,0,'XYZ');
    export let castShadow: boolean = true;

    let light = new t$.PointLight(color,intensity,distance,decay);

    // Visualize point light location.
    let helper = new t$.PointLightHelper(light, 0.1);

    let lightContext = context.pushObject3D(light);
    context.pushObject3D(helper);

    onDestroy(()=>{
        context.container.remove(light);
        context.container.remove(helper);
    })

    $: {
        light.color = new t$.Color(color);
        light.intensity = intensity;
        light.distance = distance;
        light.decay = decay;
        light.position.copy(position);
        light.rotation.copy(rotation);
        light.castShadow = castShadow
        context.render();
    }

    Context.SetContext(lightContext)

</script>