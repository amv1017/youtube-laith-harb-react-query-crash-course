import React, { useState, useEffect } from 'react'
import ky from 'ky'
import { useQuery } from 'react-query'
import Character from './Character'

export default () => {
  const fetchCharacters = async () => {
    // await new Promise(resolve => setTimeout(resolve, 1000)) // slowing down async function
    return await ky.get("https://rickandmortyapi.com/api/character").json()
  }

  const { data, status } = useQuery("characters", fetchCharacters)

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error</div>
  }

  return (
    <div className="characters">
      {data.results.map((character) => (
        <Character character={character} />
      ))}
    </div>
  )
}
