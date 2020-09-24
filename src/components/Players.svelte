<script>
  import Icon from 'svelte-awesome'
  import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Modal from './Modal.svelte'
  import { allPlayers, addPlayer, updatePlayer, deletePlayer } from '../api'
  import Player from './Player.svelte'
  import PlayerEdit from './PlayerEdit.svelte'

  let players
  let showModal = false

  onMount(async () => {
    players = await allPlayers()
  })

  async function handleSave(e) {
    const ref = e.detail.ref

    let player = {
      name: e.detail.name,
      level: e.detail.level,
    }

    if (ref === -1) {
      addPlayer(player).then((addedPlayer) => {
        players = [...players, addedPlayer]
      })
    } else {
      await updatePlayer(ref, player).then((updatedPlayer) => {
        let playerToUpdate = players.find((p) => p.ref === ref)
        playerToUpdate.name = player.name
        playerToUpdate.level = player.level
        players = players
      })
    }
  }

  async function handleDelete(e) {
    const ref = e.detail.ref
    players = players.filter((player) => player.ref !== ref)
    await deletePlayer(ref)
  }
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

  button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    margin: 0;
    border: none;
    background: none;
    color: white;
  }
</style>

<div class="wrapper">
  <button on:click={() => (showModal = true)}><Icon data={faUserPlus} scale="2" class="icon" /></button>

  {#if !players}
    <p>Loading...</p>
  {:else}
    {#each players as player (player.ref)}
      <Player {players} {...player} on:delete={handleDelete} on:save={handleSave} />
    {/each}
  {/if}

  {#if showModal}
    <Modal on:close={() => (showModal = false)}>
      <h2 slot="header">Add Player</h2>
      <PlayerEdit {players} ref={-1} name="" on:save={handleSave} on:close={() => (showModal = false)} />
    </Modal>
  {/if}
</div>
