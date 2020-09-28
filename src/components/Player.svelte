<script>
  import Icon from 'svelte-awesome'
  import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
  import { createEventDispatcher } from 'svelte'
  import Modal from './Modal.svelte'
  import PlayerEdit from './PlayerEdit.svelte'

  const dispatch = createEventDispatcher()

  const save = () => {
    dispatch('save', { ref, name, level, picked })
  }

  export let ref,
    name,
    level,
    picked,
    group = undefined,
    seq = undefined

  let showModal = false
</script>

<style>
  .card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 1.25rem;
  }

  .name {
    flex: 1;
    padding: 1rem;
  }

  .picker {
    padding: 0.5rem 1rem;
    color: rgba(255, 255, 255, 0.1);
  }

  .picked {
    color: limegreen;
  }

  input[type='checkbox'] {
    transition: all 0.2s;
    box-sizing: border-box;
    display: none;
  }
</style>

<div class="card">
  <div class="name" on:click={() => (showModal = true)}>{name}</div>
  <label class="picker" class:picked>
    <input type="checkbox" bind:checked={picked} on:change={save} />
    <Icon data={faCheckSquare} scale="2.5" class="icon" />
  </label>

  {#if showModal}
    <Modal on:close={() => (showModal = false)}>
      <h2 slot="header">Edit {name}</h2>
      <PlayerEdit {ref} {name} {level} {picked} on:save on:delete on:close={() => (showModal = false)} />
    </Modal>
  {/if}
</div>
