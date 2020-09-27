<script>
  import { onMount } from 'svelte'
  import Icon from 'svelte-awesome'
  import { faDice, faBalanceScale, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import { players } from '../stores/players'
  import { shuffle, balance } from '../utils'
  import { teamPlayers, teamA, teamB, teamARating, teamBRating, saveTeams } from '../stores/teams'

  let advantage, showAdvantage

  const setShowAdvantage = () => {
    advantage = $teamARating - $teamBRating
    showAdvantage = new Array(Math.abs($teamARating - $teamBRating)).fill('+').join('')
  }

  onMount(() => {
    teamPlayers.set(
      $players
        .slice()
        .filter((player) => player.picked)
        .sort((a, b) => a.seq - b.seq)
    )
    setShowAdvantage()
  })

  const onShuffle = () => {
    teamPlayers.set(shuffle($teamPlayers))
    setShowAdvantage()
    saveTeams($teamPlayers)
  }

  const onBalance = () => {
    teamPlayers.set(balance($teamPlayers))
    setShowAdvantage()
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

  .title {
    height: 3rem;
    grid-column: 1/-1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 2rem;
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

  .balance {
    margin: 0 0.5rem;
    height: 1rem;
    visibility: hidden;
  }

  .balance.advantage {
    font-weight: 900;
    visibility: visible;
    background-color: limegreen;
  }
</style>

{#if $teamPlayers.length > 0}
  <div class="wrapper">
    <div class="title">
      <span class="balance" class:advantage={advantage > 0} style="width: {Math.abs(advantage)}rem">&nbsp;</span>
      <Icon data={faBalanceScale} class="icon" scale="2" />
      <span class="balance" class:advantage={advantage < 0} style="width: {Math.abs(advantage)}rem">&nbsp;</span>
    </div>
    <div class="team">
      {#each $teamA as player}
        <div class="card">{player.name}</div>
      {/each}
    </div>
    <div class="team">
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
