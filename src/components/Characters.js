import React from 'react'
import ky from 'ky'
import { useQuery } from 'react-query'
import Character from './Character'
import {
  atom,
  useRecoilState,
} from 'recoil'

export default () => {
  const pageState = atom({
    key: 'pageState',
    default: 1,
  })

  const [page, setPage] = useRecoilState(pageState)

  const fetchCharacters = async ({ queryKey }) => {
    // await new Promise(resolve => setTimeout(resolve, 1000)) // slowing down async function
    return await ky.get(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`).json()
  }

  const { data, isPreviousData, isLoading, isError } = useQuery(["characters", page], fetchCharacters, {
    keepPreviousData: true
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className="characters">
      {data.results.map((character) => (
        <Character character={character} />
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>Previous</button>
        <button disabled={isPreviousData && !data.info.next} onClick={() => setPage((old) => old + 1)}>Next</button>
      </div>
    </div>
  )
}
