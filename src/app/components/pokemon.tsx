import { useEffect, useState } from "react"
import PokemonTop from "./pokemonTop"
interface PokemonProps {
  name: string
}

export default function Pokemon({name}: PokemonProps) {
  const [colour, setColour] = useState(String)
  async function getPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    setColour(data?.types[0].type.name)    
  }
  useEffect(() => {
    getPokemon()
  }, [name])
  return (
    <main className='sm:w-[360px] sm:h-[800px] w-screen h-screen'>
      <PokemonTop colour={colour} name={name}/>
      <div className='bg-platinum h-2/3 sm:rounded-b-2xl'>
      </div>
    </main>
  )
}