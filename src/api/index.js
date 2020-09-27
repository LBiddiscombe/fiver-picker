export async function allPlayers() {
  const response = await fetch('/.netlify/functions/player-crud')
  const result = await response.json()
  return result.map((item) => ({
    ref: item.ref['@ref'].id,
    name: item.data.name,
    level: item.data.level,
    picked: item.data.picked,
    seq: item.data.seq,
  }))
}

export async function addPlayer(data) {
  const response = await fetch('/.netlify/functions/player-crud', {
    body: JSON.stringify(data),
    method: 'POST',
  })
  const result = await response.json()
  return { ref: result.ref['@ref'].id, name: result.data.name, level: result.data.level, picked: result.data.picked }
}

export async function updatePlayer(ref, data) {
  const response = await fetch(`/.netlify/functions/player-crud/${ref}`, {
    body: JSON.stringify(data),
    method: 'PUT',
  })
  const result = await response.json()
  return { ref: result.ref['@ref'].id, name: result.data.name, level: result.data.level, picked: result.data.picked }
}

export async function updatePlayers(data) {
  const response = await fetch(`/.netlify/functions/player-crud`, {
    body: JSON.stringify(data),
    method: 'PUT',
  })
  const result = await response.json()
  return allPlayers()
}

export async function deletePlayer(ref) {
  const response = await fetch(`/.netlify/functions/player-crud/${ref}`, {
    method: 'DELETE',
  })
  const result = await response.json()
  return result
}
