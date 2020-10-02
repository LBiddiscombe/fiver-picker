import { writable, derived } from 'svelte/store'
import { calcLevel } from '../utils'
import { updatePlayers } from '../api'

export const split = writable(localStorage.getItem('split') || 5)

export const teamPlayers = writable([])

export const teamA = derived(teamPlayers, ($teamPlayers) => {
  const teamSize = Math.ceil($teamPlayers.length / 2)
  const team = $teamPlayers.slice(0, teamSize).sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  return team
})

export const teamB = derived(teamPlayers, ($teamPlayers) => {
  const teamSize = Math.floor($teamPlayers.length / 2)
  const team = $teamPlayers.slice(-teamSize).sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  return team
})

export const teamARating = derived([teamA, split], ($teamA, $split) => {
  return $teamA.reduce((accum, cur, $split) => accum + calcLevel(cur, $split), 0)
})

export const teamBRating = derived([teamB, split], ($teamB, $split) => {
  return $teamB.reduce((accum, cur, $split) => accum + calcLevel(cur, $split), 0)
})

export function saveTeams(players) {
  let data = players.slice()
  data = data.map((player, i) => ({ ...player, seq: i + 1 }))
  updatePlayers(data)
}
