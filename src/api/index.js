export async function allPlayers(group) {
  const response = await fetch(`/.netlify/functions/player-crud?group=${group}`)
  const result = await response.json()
  return result.map((item) => {
    return {
      ref: item.ref['@ref'].id,
      ...item.data,
    }
  })
}

export async function addPlayer(data) {
  const response = await fetch('/.netlify/functions/player-crud', {
    body: JSON.stringify(data),
    method: 'POST',
  })
  const result = await response.json()
  return {
    ref: result.ref['@ref'].id,
    ...result.data,
  }
}

export async function updatePlayer(ref, data) {
  const response = await fetch(`/.netlify/functions/player-crud/${ref}`, {
    body: JSON.stringify(data),
    method: 'PUT',
  })
  const result = await response.json()
  return {
    ref: result.ref['@ref'].id,
    ...result.data,
  }
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
