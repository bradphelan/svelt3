<script lang="ts">
    import Context from "./context"
    import  * as t$ from "three"

    let parentContext = Context.GetContext()

    export let args:t$.MeshStandardMaterialParameters

    let material = new t$.MeshStandardMaterial()
    let materialContext = parentContext.pushMaterial(material)

    $: {
        if(args){
            material.setValues(args);
            parentContext.render();
        }
    }

    Context.SetContext(materialContext)
</script>

<slot/>