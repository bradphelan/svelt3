<script lang="ts">
    import { onMount} from 'svelte';
    import Context from './context'
    import CameraControls from 'camera-controls'
    import * as three from 'three'
import Axes from './Axes.svelte';

    CameraControls.install({THREE:three})

    let canvasContainer:HTMLDivElement | undefined = undefined;

    let scene = new three.Scene();
    let camera = new three.PerspectiveCamera( 75, 1 , 0.1, 1000 );
    camera.position.z = 4;
    var renderer = new three.WebGLRenderer({antialias:true});
    renderer.shadowMap.type=three.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;

    // Configure renderer clear color
    renderer.setClearColor("#000000");
  
    let context = new Context(renderer, camera, scene,new three.MeshBasicMaterial({color:"red"}))

    export let style=""

    Context.SetContext(context);
    const clock = new three.Clock();
    const cameraControls = new CameraControls( camera, renderer.domElement );

    let resizeRendererToDisplaySize = (renderer:three.WebGLRenderer) =>{
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        console.log("canvas");
        const needResize = canvas.width !== w|| canvas.height !== h;
        //renderer.setSize(w, h, false);
        return needResize
    }

    let h=0;
    let w=0;

    $: {
        let perspective = w/h
        let canvas = renderer.domElement;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        }
    }
    onMount(()=>{
        if(canvasContainer){
            canvasContainer.appendChild(renderer.domElement);
            renderer.domElement.style.width = `100%`;
            renderer.domElement.style.height = `100%`;
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
