<script lang="ts">
    import Context from "./context"
    import { onDestroy } from "svelte";
    import * as t$ from "three"

    let context = Context.GetContext()

    export let position: t$.Vector3 = new t$.Vector3(0,0,0);
    export let rotation: t$.Euler = new t$.Euler(0,0,0,'XYZ');

    let group = new t$.Group()

    let groupContext = context.pushObject3D(group);

    onDestroy(()=>{
        context.container.remove(group);
        context.render();
    })

    $: {
        group.position.copy(position);
        group.rotation.copy(rotation);
        context.render();
    }

    Context.SetContext(groupContext)

</script>

<slot/>