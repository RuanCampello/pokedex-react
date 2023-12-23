import { useEffect, useState } from 'react'
import PokemonTop from './pokemonTop'
import PokemonBottom from './pokemonBottom'
import { useRecoilState } from 'recoil'
import { pokemonKey } from '@/atoms/pokemonKey'
interface PokemonProps {
  name: string
}
export default function Pokemon({name}: PokemonProps) {
  const [key, setKey] = useRecoilState(pokemonKey)
  const [status, setStatus] = useState(Number)
  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        setStatus(response.status)
        const data = await response.json()
        setKey(data.id)
      } catch (error) {
        if(status === 404) console.error(`pokemon (${name}) not found: ${error}`)
      }
    }
    getPokemon()
  }, [name, status])

  return (
    <main className='sm:w-pokedex sm:h-pokedex w-screen h-screen'>
      <PokemonTop />
      <PokemonBottom />
    </main>
  )
}