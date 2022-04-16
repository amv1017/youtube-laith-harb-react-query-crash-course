import React, { useState, useEffect } from 'react'
import ky from 'ky'

export default () => {

  const [characters, setCharacters] = useState([])

  const fetchCharacters = async () => {
    const response = await ky.get("https://rickandmortyapi.com/api/character").json()
    setCharacters(response.results)
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <div>
      {characters.map((c) => (
        <div key={c.id}>{c.name}</div>
      ))}
    </div>
  )
}
