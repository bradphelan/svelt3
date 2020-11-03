<script context="module">
    import { writable } from "svelte/store";
    let consoleStore = writable<any[]>([]);

    export const log = (txt: any) => {
        consoleStore.update((old) => [txt, ...old]);
    };

    let clear = (_e: any) => {
        consoleStore.set([]);
    };
</script>

<style>
    .main {
        display: flex;
        flex-direction: column;
    }
    .scroll {
        flex:1;
        overflow: scroll;
        height: 100px;
    }
</style>

<div class="main" style="flex:1">
    <button on:click={clear}>clear</button>
    <div class="scroll" style=" flex: 1 1 auto; overflow-y: auto; height:0px;">
        {#each $consoleStore as item}
        <span style="display:block;">{item}</span>
        {/each}
    </div>
</div>
