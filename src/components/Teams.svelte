<script>
  import { onMount } from 'svelte'
  import Icon from 'svelte-awesome'
  import { faPlusCircle, faDice, faBalanceScale } from '@fortawesome/free-solid-svg-icons'
  import { players } from '../stores/players'
  import { shuffle, balance } from '../utils'
  import { teamPlayers, teamA, teamB, teamARating, teamBRating } from '../stores/teams'

  let teams = $players.slice()
  onMount(() => {
    teamPlayers.set(teams)
  })
</script>

<style>
  .wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .team {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.25);
    font-size: 1.25rem;
    padding: 1rem;
  }

  .card + .card {
    margin-top: 0.25rem;
  }

  button {
    width: 100%;
    margin: 0;
    border: none;
    display: grid;
    place-items: center;
    background: none;
    color: white;
  }

  .actions {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
  }
</style>

{#if $teamPlayers.length > 0}
  <div class="wrapper">
    <div class="team">
      <h2 class="title">Team A ({$teamARating})</h2>
      {#each $teamA as player}
        <div class="card">{player.name}</div>
      {/each}
      <button class="add" value="teamA">
        <Icon data={faPlusCircle} class="icon" scale="2" />
      </button>
    </div>
    <div class="team">
      <h2 class="title">Team B ({$teamBRating})</h2>
      {#each $teamB as player}
        <div class="card">{player.name}</div>
      {/each}
      <button class="add" value="teamB">
        <Icon data={faPlusCircle} class="icon" scale="2" />
      </button>
    </div>
  </div>
{/if}

<div class="actions">
  <button class="shuffle" on:click={() => teamPlayers.set(shuffle(teams))}><Icon
      data={faDice}
      class="icon"
      scale="2" /></button>
  <button class="balanced" on:click={() => teamPlayers.set(balance(teams))}><Icon
      data={faBalanceScale}
      class="icon"
      scale="2" /></button>
</div>
