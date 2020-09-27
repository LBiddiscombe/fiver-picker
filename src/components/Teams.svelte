<script>
  import { onMount } from 'svelte'
  import Icon from 'svelte-awesome'
  import { faDice, faBalanceScale } from '@fortawesome/free-solid-svg-icons'
  import { players } from '../stores/players'
  import { shuffle, balance } from '../utils'
  import { teamPlayers, teamA, teamB, teamARating, teamBRating, saveTeams } from '../stores/teams'

  onMount(() => {
    teamPlayers.set(
      $players
        .slice()
        .filter((player) => player.picked)
        .sort((a, b) => a.seq - b.seq)
    )
  })

  const onShuffle = () => {
    teamPlayers.set(shuffle($teamPlayers))
    saveTeams($teamPlayers)
  }

  const onBalance = () => {
    teamPlayers.set(balance($teamPlayers))
    saveTeams($teamPlayers)
  }
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
    top: 1rem;
    right: 1rem;
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
    </div>
    <div class="team">
      <h2 class="title">Team B ({$teamBRating})</h2>
      {#each $teamB as player}
        <div class="card">{player.name}</div>
      {/each}
    </div>
  </div>
{/if}

<div class="actions">
  <button class="shuffle" on:click={onShuffle}><Icon data={faDice} class="icon" scale="3" /></button>
  <button class="balanced" on:click={onBalance}><Icon data={faBalanceScale} class="icon" scale="3" /></button>
</div>
