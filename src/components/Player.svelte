<script>
  import Modal from './Modal.svelte'
  import PlayerEdit from './PlayerEdit.svelte'

  export let ref
  export let name
  export let level

  let showModal = false
</script>

<style>
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.25);
    font-size: 1.25rem;
  }

  .name {
    flex: 1;
    padding: 1rem;
  }

  .card + .card {
    margin-top: 0.25rem;
  }
</style>

<div class="card">
  <div class="name" on:click={() => (showModal = true)}>{name}</div>
  {#if showModal}
    <Modal on:close={() => (showModal = false)}>
      <h2 slot="header">Edit {name}</h2>
      <PlayerEdit {ref} {name} {level} on:save on:delete on:close={() => (showModal = false)} />
    </Modal>
  {/if}
</div>
