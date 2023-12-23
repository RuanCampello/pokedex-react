import { useEffect } from 'react'
import PokemonTop from './pokemonTop'
import PokemonBottom from './pokemonBottom'
import { useRecoilState } from 'recoil'
import { pokemonKey } from '@/atoms/pokemonKey'
interface PokemonProps {
  name: string
}
export default function Pokemon({name}: PokemonProps) {
  const [key, setKey] = useRecoilState(pokemonKey)
  useEffect(() => {
    async function getPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      console.log(name)
      const data = await response.json()
      setKey(data.id)
    }
    getPokemon()
  }, [name])

  return (
    <main className='sm:w-pokedex sm:h-pokedex w-screen h-screen'>
      <PokemonTop />
      <PokemonBottom />
    </main>
  )
}