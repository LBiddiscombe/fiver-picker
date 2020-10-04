import { writable, derived } from 'svelte/store'
import { calcLevel } from '../utils'
import { updatePlayers } from '../api'

export const split = writable(localStorage.getItem('split') || 50)

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

export const teamATags = derived(teamA, ($teamA) => {
  let usedTags = []
  $teamA.forEach((player) => {
    if (player.tags) {
      usedTags = [...usedTags, ...player.tags]
    }
  })
  const tagCount = usedTags.reduce((group, item) => group.set(item, group.get(item) + 1 || 1), new Map())
  let returnTags = []

  tagCount.forEach((count, tag) => {
    returnTags.push(`${count} ${tag}`)
  })
  return returnTags
})

export const teamBTags = derived(teamB, ($teamB) => {
  let usedTags = []
  $teamB.forEach((player) => {
    if (player.tags) {
      usedTags = [...usedTags, ...player.tags]
    }
  })
  const tagCount = usedTags.reduce((group, item) => group.set(item, group.get(item) + 1 || 1), new Map())
  let returnTags = []

  tagCount.forEach((count, tag) => {
    returnTags.push(`${count} ${tag}`)
  })
  return returnTags
})

export function saveTeams(players) {
  let data = players.slice()
  data = data.map((player, i) => ({ ...player, seq: i + 1 }))
  updatePlayers(data)
}
