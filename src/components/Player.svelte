<script>
  import Icon from 'svelte-awesome'
  import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
  import Modal from './Modal.svelte'
  import PlayerEdit from './PlayerEdit.svelte'
  import { players } from '../stores/players'

  export let ref

  let player

  $: {
    player = $players.find((player) => player.ref === ref)
  }

  let showModal = false
</script>

<style>
  h2 {
    margin: 1rem 0;
  }
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
  {#if player}
    <div class="name" on:click={() => (showModal = true)}>{player.name}</div>
    <label class="picker" class:picked={player.picked}>
      <input type="checkbox" bind:checked={player.picked} />
      <Icon data={faCheckSquare} scale="2.5" class="icon" />
    </label>

    {#if showModal}
      <Modal on:close={() => (showModal = false)}>
        <h2 slot="header">Edit {player.name}</h2>
        <PlayerEdit {ref} on:close={() => (showModal = false)} />
      </Modal>
    {/if}
  {/if}
</div>
