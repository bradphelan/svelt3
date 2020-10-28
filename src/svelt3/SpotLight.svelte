<script lang="ts">
    // Not sure if this is really working
    
    import Context from "./context"
    import { onDestroy } from "svelte";
    import * as three from "three"

    let context = Context.GetContext()

    export let color: three.Color | string | number = new three.Color("white");
    export let intensity:  number = 1;
    export let distance: number = 0;
    export let angle: number=  Math.PI/3;
    export let penumbra: number = 0;
    export let decay: number = 1;
    export let position: three.Vector3 = new three.Vector3(0,0,0);
    export let rotation: three.Euler = new three.Euler(0,0,0,'XYZ');
    export let castShadow: boolean = true;
    export let target: three.Object3D | null = null; 

    let light = new three.SpotLight(color,intensity);
    light.matrixAutoUpdate = true;

    // Visualize point light location.
    let helper = new three.SpotLightHelper(light, 0.1);

    let lightContext = context.pushObject3D(light);
    context.pushObject3D(helper);
    context.pushObject3D(light.target)

    onDestroy(()=>{
        context.container.remove(light);
        context.container.remove(helper);
    })

    $: {
        light.color = new three.Color(color);
        light.intensity = intensity;
        light.distance = distance;
        light.penumbra = penumbra;
        light.decay = decay;
        light.angle = angle;

        light.position.copy(position);
        light.rotation.copy(rotation);
        light.castShadow = castShadow

        if(target){
            light.target = target;
        }
        context.render();
    }

    Context.SetContext(lightContext)

</script>