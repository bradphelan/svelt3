<script lang="ts">
    import Context from "./context"
    import  * as t$ from "three"

    let parentContext = Context.GetContext()

    export let args:t$.MeshBasicMaterialParameters

    let material = new t$.MeshBasicMaterial()
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