<script lang="ts">
	// Import Svelt3 components
	import S3d from "../svelt3/S3d.svelte";
	import Mesh from "../svelt3/Mesh.svelte";
	import PointLight from "../svelt3/PointLight.svelte";
	import MeshStandardMaterial from "../svelt3/MeshStandardMaterial.svelte";
	import GeometrySelector from "./GeometrySelector.svelte";
	import AmbientLight from "../svelt3/AmbientLight.svelte";
	import SpotLight from "../svelt3/SpotLight.svelte";
	import Axes from "../svelt3/Axes.svelte";

	import debounce from "just-debounce-it";

	import Console, { log } from "./Console.svelte";
	import type { InteractionEvent } from "three.interaction";

	// Import 3js
	import * as three from "three";

	// Setup local state
	let showMesh = true;
	let objectColor = "#ff1010";
	let lightColor = "#ffffff";

	let geometry1: three.Geometry;
	let geometry2: three.Geometry;

	// Handle the ray caster result and
	// set the location of the position
	// sphere
	let rayPosition = new three.Vector3(0, 0, 0);
	const click = (event: CustomEvent<InteractionEvent>) => {
		rayPosition = event.detail.intersects[0].point;
		log("click")
	};

	let selectorRoughness = 0.1;
	let selectorMetallness = 0.1;
	let pointLightIntensity = 0.5;
	let selectorSize = 0.1;
	let spotAngle = 1;
	let spotIntensity = 1;

	let ground = new three.PlaneGeometry(10, 10);

	// Create a geometry for the position sphere
	let sphereGeometry = new three.SphereGeometry(selectorSize, 128, 128);
	let updateSelectorSize = debounce((event: any) => {
		sphereGeometry = new three.SphereGeometry(
			(event.target as HTMLInputElement).valueAsNumber,
			128,
			128
		);
	}, 200);

	let cone1: three.Object3D;

	$: {
		log("test");
		log("cat");
	}

	let w = 0;
	let h = 0;
</script>

<style>
	.form {
		display: flex;
		flex-direction: column;
		border: 1px black solid;
		padding: 0.5em;
	}
	.form label {
		padding-top: 1em;
	}
	.form header {
		background-color: beige;
		margin: -0.5em;
		padding: 0.5em;
		border: solid grey 1px;
	}
	.main {
		display: flex;
		flex-direction: row;
	}
</style>


<div id="root" style="display:flex; flex-direction: column; height:100vh">
	<h1>Svelte + ThreeJS Ray Cast Demo</h1>
	<div class="main" style="display:flex; flex-direction: row">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<!-- don't really care about a11y for this demo. clusters the code-->
		<div class="form">
			<header>Options</header>
			<label>show meshes</label>
			<input type="checkbox" bind:checked={showMesh} />

			<label>object color</label>
			<input type="color" bind:value={objectColor} />

			<label>light color</label>
			<input type="color" bind:value={lightColor} />

			<label>first geometry</label>
			<GeometrySelector bind:geometry={geometry1} />

			<label>second geometry</label>
			<GeometrySelector bind:geometry={geometry2} />

			<label>selector roughness</label>
			<input
				type="range"
				step="0.01"
				min="0"
				max="1"
				bind:value={selectorRoughness} />

			<label>selector metallness</label>
			<input
				type="range"
				step="0.01"
				min="0"
				max="1"
				bind:value={selectorMetallness} />

			<label>selector size</label>
			<input
				type="range"
				step="0.01"
				min="0"
				max="0.5"
				value={selectorSize}
				on:input={updateSelectorSize} />

			<label>point light intensity</label>
			<input
				type="range"
				step="0.01"
				min="0"
				max="2"
				bind:value={pointLightIntensity} />

			<label>spot angle</label>
			<input
				type="range"
				step={0.01}
				min="0"
				max={Math.PI / 2}
				bind:value={spotAngle} />

			<label>spot intensity</label>
			<input
				type="range"
				step={0.01}
				min="0"
				max={2}
				bind:value={spotIntensity} />
		</div>

		<S3d style="flex:1 1 auto">
			<PointLight
				color={lightColor}
				intensity={pointLightIntensity}
				distance={50}
				position={new three.Vector3(5, 2, 0)} />
			<PointLight
				color={lightColor}
				intensity={pointLightIntensity}
				distance={50}
				position={new three.Vector3(-5, 2, 0)} />
			<AmbientLight
				color="white"
				intensity={0.5}
				position={new three.Vector3(2, 2, 0)} />
			<SpotLight
				position={new three.Vector3(-10, 10, 0)}
				target={cone1}
				angle={spotAngle}
				intensity={spotIntensity} />

			<!-- Something wrong with the axis that breaks the event handling ?? -->
			<!-- <Axes/> -->

			<MeshStandardMaterial args={{ color: 'white' }}>
				<Mesh
					geometry={ground}
					rotation={new three.Euler(-Math.PI / 2, 0, 0, 'XYZ')}
					position={new three.Vector3(0, -1, 0)}
					receiveShadow={true}
					castShadow={true}
					on:click={click} />
			</MeshStandardMaterial>

			{#if showMesh}
				<MeshStandardMaterial args={{ color: 'white' }}>
					<Mesh
						geometry={sphereGeometry}
						position={rayPosition} />
				</MeshStandardMaterial>
				<MeshStandardMaterial
					args={{ color: objectColor, flatShading: false, roughness: selectorRoughness, metalness: selectorMetallness }}>
					<Mesh
						on:click={click}
						geometry={geometry1}
						position={new three.Vector3(0, 0, 0)}
						let:object3d={cone1} />
					<Mesh
						on:click={click}
						geometry={geometry2}
						position={new three.Vector3(2, 0, 0)} />
				</MeshStandardMaterial>
			{/if}
		</S3d>
	</div>

	<div style="flex:1; display:flex; flex-direction:column;">
		<h1>Console</h1>
		<Console />
	</div>
</div>
