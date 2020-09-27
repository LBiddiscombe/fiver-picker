import { writable, derived } from 'svelte/store'
import { updatePlayers } from '../api'

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

export const teamARating = derived(teamA, ($teamA) => {
  return $teamA.reduce((accum, cur) => accum + cur.level, 0)
})

export const teamBRating = derived(teamB, ($teamB) => {
  return $teamB.reduce((accum, cur) => accum + cur.level, 0)
})

export function saveTeams(players) {
  let data = players.slice()
  data = data.map((player, i) => ({ ...player, seq: i + 1 }))
  updatePlayers(data)
}
