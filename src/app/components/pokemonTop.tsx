'use client'
import { useEffect, useState } from "react"
import { Pokemon } from "./pokemonType"
import pokeball from '../img/pokeball.png'
import Image from "next/image"
interface PokemonTopProps {
  colour: string
  name: string
}
export const typeColors: { [key: string]: string} = {
  'normal': '#A8A77A',
  'fire': '#EE8130',
  'water': '#6390F0',
  'electric': '#ff9e00',
  'grass': '#7AC74C',
  'ice': '#96D9D6',
  'fighting': '#C22E28',
  'poison': '#A33EA1',
  'ground': '#E2BF65',
  'flying': '#A98FF3',
  'psychic': '#F95587',
  'bug': '#A6B91A',
  'rock': '#B6A136',
  'ghost': '#735797',
  'dragon': '#6F35FC',
  'dark': '#705746',
  'steel': '#B7B7CE',
  'fairy': '#D685AD',
}
export default function PokemonTop({colour, name}: PokemonTopProps) {
  const [pokemon, setPokemon] = useState<Pokemon>()
  useEffect(() => {
    async function getPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await response.json()
      setPokemon(data)
    }
    getPokemon()
  }, [name])
  const imageUrl = pokemon?.sprites.versions["generation-v"]["black-white"]?.animated?.front_default || pokemon?.sprites.front_default
  const stringColour = typeColors[colour] || typeColors['normal']
  return (
    <div className={`sm:rounded-t-2xl p-8 h-1/3 flex flex-col`} style={{background: stringColour}}>
      <div className='flex flex-col gap-2'>
        <div className='flex items-baseline justify-between'>
          <h1 className='sm:text-5xl text-6xl font-semibold capitalize'>{pokemon?.species.name}</h1>
          <h2 className='sm:text-lg text-2xl'>#{pokemon?.id}</h2>
        </div>
        <div className='items-center justify-center lowercase inline space-x-2'>
            {pokemon?.types.map((type: any) => {
              return (
                <span key={type['type']['name']} className={`bg-platinum px-2 py-1 rounded-2xl font-medium sm:text-xs text-lg`} style={{color: stringColour}}>{type['type']['name']}</span>
              )
            })}
        </div>
      </div>
      <Image alt='pokeball' className='rotate-45 h-44 w-44 sm:h-32 sm:w-32 z-10 self-end opacity-40' src={pokeball}/>
      <Image
      width={12}
      height={12}
      className='absolute self-center sm:h-44 h-60 w-auto sm:top-48 top-32 z-10' 
      alt={`${pokemon?.species.name}'s sprite`} 
      src={imageUrl || ''}
      />
    </div>
  )
}