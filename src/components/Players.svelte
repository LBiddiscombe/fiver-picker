<script>
  import Icon from 'svelte-awesome'
  import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import Modal from './Modal.svelte'
  import { allPlayers } from '../api'
  import Player from './Player.svelte'
  import PlayerEdit from './PlayerEdit.svelte'
  import { group, players } from '../stores/players'

  let showModal = false
  let loading = true

  onMount(async () => {
    players.set(await allPlayers($group))
    loading = false
  })
</script>

<style>
  .wrapper {
    height: calc(100vh - 12rem);
    overflow-x: hidden;
    overflow-y: auto;
  }

  @media (min-width: 640px) {
    .wrapper {
      height: calc(100vh - 6rem);
    }
  }

  button.add {
    position: absolute;
    top: 0.75rem;
    right: 0;
    margin: 0;
    border-radius: 0.25rem;
    background: white;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.75rem;
  }

  .player {
    margin-top: 0.25rem;
  }

  .info {
    font-size: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
</style>

<div class="wrapper">
  <button class="add" on:click={() => (showModal = true)}>
    <Icon data={faUserPlus} scale="2" class="icon" />
    <span>Add Player</span>
  </button>

  {#if loading}
    <p class="info">Loading...</p>
  {:else if $players.length > 0}
    {#each $players.sort((a, b) => {
      return a.name.localeCompare(b.name)
    }) as player, i (player.ref)}
      <div in:fly={{ x: -50, delay: i * 25 }} class="player">
        <Player ref={player.ref} />
      </div>
    {/each}
  {:else}
    <p class="info">Add the first Player</p>
  {/if}

  {#if showModal}
    <Modal on:close={() => (showModal = false)}>
      <h2 slot="header">Add Player</h2>
      <PlayerEdit ref={-1} on:close={() => (showModal = false)} />
    </Modal>
  {/if}
</div>
