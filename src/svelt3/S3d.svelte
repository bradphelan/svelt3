<script lang="ts">
    import { onMount} from 'svelte';
    import Context from './context'
    import CameraControls from 'camera-controls'
    import * as three from 'three'

    CameraControls.install({THREE:three})

    // Width
    export let w:number = 500;
    // Height
    export let h:number = 500;

    let canvas:HTMLDivElement| undefined = undefined;


    let scene = new three.Scene();
    let camera = new three.PerspectiveCamera( 75, w/h , 0.1, 1000 );
    camera.position.z = 4;
    var renderer = new three.WebGLRenderer({antialias:true});
    renderer.shadowMap.type=three.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;

    // Configure renderer clear color
    renderer.setClearColor("#000000");
    // Configure renderer size
    renderer.setSize( w, h);

    let context = new Context(renderer, camera, scene,new three.MeshBasicMaterial({color:"red"}))

    Context.SetContext(context);
    const clock = new three.Clock();
    const cameraControls = new CameraControls( camera, renderer.domElement );
    onMount(()=>{
        if(canvas){
            canvas.appendChild(renderer.domElement);
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
            if(canvas)
                canvas.removeChild(renderer.domElement)
        }

    })

</script>

<div bind:this={canvas} width={w} height={h}></div>

<!-- only to allow composition -->
<slot/>
