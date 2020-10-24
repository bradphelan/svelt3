<script lang="ts">
	// Import Svelt3 components
	import S3d from "./svelte3/S3d.svelte";
	import Mesh from "./svelte3/Mesh.svelte";
	import PointLight from "./svelte3/PointLight.svelte";
	import MeshStandardMaterial from "./svelte3/MeshStandardMaterial.svelte";
	import GeometrySelector from "./GeometrySelector.svelte"
	import AmbientLight from "./svelte3/AmbientLight.svelte";
	import SpotLight from "./svelte3/SpotLight.svelte";
	import Axes from "./svelte3/Axes.svelte"

	import throttle from 'just-throttle';
	import debounce from 'just-debounce-it';

	// Import 3js
	import * as t$ from "three";

	// Setup local state
	let showMesh=true;
	let objectColor = "#ff1010";
	let lightColor = "#ffffff";

	let geometry1:t$.Geometry;
	let geometry2:t$.Geometry;

	// Handle the ray caster result and
	// set the location of the position 
	// sphere
	let rayPosition = new t$.Vector3(0,0,0)
	const click = (event:CustomEvent<t$.Intersection>)=>{
		rayPosition = event.detail.point
	}


	let selectorRoughness = 0.1;
	let selectorMetallness = 0.1;
	let pointLightIntensity = 0.5;
	let selectorSize = 0.1;
	let spotAngle=1;
	let spotIntensity=1;

	let ground = new t$.PlaneGeometry(10,10);

	// Create a geometry for the position sphere
	let sphereGeometry = new t$.SphereGeometry(selectorSize,128,128)
	let updateSelectorSize = debounce((event:InputEvent)=>{
		sphereGeometry = new t$.SphereGeometry((event.target as HTMLInputElement).valueAsNumber,128,128)
	},200)

	let cone1: t$.Object3D;

	$: {
		console.log(cone1)
	}

</script>

<style>
	.form {
		display:flex;
		flex-direction: column;
		border: 1px black solid;
		padding:0.5em;
	}
	.form label {
		padding-top: 1em;
	}
	.form header {
		background-color: beige;
		margin:-0.5em;
		padding:0.5em;
		border: solid grey 1px;
	}
	.main {
		display:flex;
		flex-direction: row;
	}
	.App{
		flex:1;
		margin: 1em;
	}
</style>

<h1>Svelte + ThreeJS Ray Cast Demo</h1>

<div class="main">
	<div class="form">
		<header>Options</header>
		<label for="showhide">show meshes</label>
		<input name="showhide" type=checkbox bind:checked={showMesh}/>

		<label for="object-color">object color</label>
		<input name="object-color" type=color bind:value={objectColor}/>

		<label for="point-light-color">light color</label>
		<input name="point-light-color" type=color bind:value={lightColor}/>

		<label>first geometry</label>
		<GeometrySelector bind:geometry={geometry1}/>

		<label>second geometry</label>
		<GeometrySelector bind:geometry={geometry2}/>

		<label for="roughness">selector roughness</label>
		<input name="roughness" type="range" step=0.01 min=0 max=1 bind:value={selectorRoughness}/>

		<label for="metallness">selector metallness</label>
		<input name="metallness" type="range" step=0.01 min=0 max=1 bind:value={selectorMetallness}/>

		<label for="selectorSize">selector size</label>
		<input name="selectorSize" type="range" step=0.01 min=0 max=0.5 
			value={selectorSize} on:input={updateSelectorSize}/>

		<label for="pointLightIntesity">point light intensity</label>
		<input name="pointLightIntesity" type="range" step=0.01 min=0 max=2 bind:value={pointLightIntensity}/>

		<label for="spot angle">spot angle</label>
		<input name="spot angle" type="range" step={0.01} min=0 max={Math.PI/2} bind:value={spotAngle}/>

		<label for="spot intensity">spot intensity</label>
		<input name="spot intensity" type="range" step={0.01} min=0 max={2} bind:value={spotIntensity}/>

	</div>
	<div class="App">
		<S3d w={1024} h={768}>
			<PointLight 
				color={lightColor} 
				intensity={pointLightIntensity} 
				distance={50} 
				position={new t$.Vector3(5,2,0)}
			/>
			<PointLight 
				color={lightColor} 
				intensity={pointLightIntensity} 
				distance={50} 
				position={new t$.Vector3(-5,2,0)}
			/>
			<AmbientLight 
				color="white" 
				intensity={0.5} 
				position={new t$.Vector3(2,2,0)}
			/>
			<SpotLight position={new t$.Vector3(-10,10,0)} target={cone1} angle={spotAngle} intensity={spotIntensity}/>
			<Axes/>

			<MeshStandardMaterial args={{color:"white"}}>
				<Mesh geometry={ground} 
					rotation={new t$.Euler(-Math.PI/2,0,0,'XYZ')} 
					position={new t$.Vector3(0,-1,0)}
					receiveShadow={true}
					castShadow={true}
					on:click={click}
				/>
			</MeshStandardMaterial>

			{#if showMesh}
				<MeshStandardMaterial args={{color:"white"}}>
					<Mesh geometry={sphereGeometry} position={rayPosition}/>
				</MeshStandardMaterial>
				<MeshStandardMaterial args={{
					color:objectColor, 
					flatShading:false, 
					roughness:selectorRoughness, 
					metalness:selectorMetallness
				}}>
					<Mesh on:click={click} geometry={geometry1} position={new t$.Vector3(0,0,0)} name="brad" bind:object3d={cone1} />
					<Mesh on:click={click} geometry={geometry2} position={new t$.Vector3(2,0,0)}/>
				</MeshStandardMaterial>
			{/if}
		</S3d>
	</div>
</div>
