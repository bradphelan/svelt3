<script lang="ts">
    import { onMount} from 'svelte';
    import Context from './context'
    import CameraControls from 'camera-controls'
    import * as three from 'three'

    CameraControls.install({THREE:three})

    let canvasContainer:HTMLDivElement | undefined = undefined;

    let scene = new three.Scene();
    let camera = new three.PerspectiveCamera( 75, 1 , 0.1, 1000 );
    camera.position.z = 4;
    export let renderer = new three.WebGLRenderer({antialias:true});
    renderer.shadowMap.type=three.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;

    // Configure renderer clear color
    renderer.setClearColor("#000000");
  
    const cameraControls = new CameraControls( camera, renderer.domElement );

    let context = new Context(renderer, camera, scene,new three.MeshBasicMaterial({color:"red"}), cameraControls)

    export let style=""

    Context.SetContext(context);
    const clock = new three.Clock();

    // Used for matching the canvas to the wrapping div
    let h=0;
    let w=0;

    $: {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = width !== w|| height !== h;
        if(needResize){
            renderer.setSize(w, h, true);
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        }
    }

    onMount(()=>{
        if(canvasContainer){
            canvasContainer.appendChild(renderer.domElement);
            renderer.domElement.style.position = "absolute";
            renderer.domElement.style.height = `0px`;
            renderer.domElement.style.height = `0px`;
            // Render Loop
            (function render () {
                const delta = clock.getDelta();
                const hasControlsUpdated = cameraControls.update( delta );

                requestAnimationFrame( render );
                if(hasControlsUpdated){
                    // Render the scene
                    renderer.render(scene, camera);
                }
            })();
        }else{
            console.log("unable to get canvas")
        }
        return ()=>{
            if(canvasContainer)
                canvasContainer.removeChild(renderer.domElement)
        }

    })

</script>

<div bind:this={canvasContainer} {style} bind:clientWidth={w} bind:clientHeight={h}></div>

<!-- only to allow composition -->
<slot/>
