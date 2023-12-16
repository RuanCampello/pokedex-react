import { useEffect, useState } from 'react'
import PokemonTop from './pokemonTop'
import PokemonBottom from './pokemonBottom'
interface PokemonProps {
  name: string
}
export default function Pokemon({name}: PokemonProps) {
  const [colour, setColour] = useState(String)
  useEffect(() => {
    async function getPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await response.json()
      setColour(data?.types[0].type.name)    
    }
    getPokemon()
  }, [name])
  return (
    <main className='sm:w-[360px] sm:h-[750px] w-screen h-screen overflow-hidden'>
      <PokemonTop colour={colour} name={name}/>
      <PokemonBottom colour={colour} name={name}/>
    </main>
  )
}