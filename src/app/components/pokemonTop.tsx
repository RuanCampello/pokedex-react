'use client'
import { useEffect, useState } from 'react'
import { Pokemon, Types } from './pokemonType'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { japaneseName } from '@/atoms/japaneseName'
import { genus } from '@/atoms/genus'
import Skeleton from 'react-loading-skeleton'

interface PokemonTopProps {
  colour: string
  name: string
}
export const typeColours: { [key: string]: string} = {
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
  const [originalName, setJapaneseName] = useRecoilState(japaneseName)
  const [englishGenus, setEnglishGenus] = useRecoilState(genus)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function getPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await response.json()
      setPokemon(data)
      setIsLoading(false)
    }
    getPokemon()
  }, [name])  
  const imageUrl = pokemon?.sprites.versions['generation-v']['black-white']?.animated?.front_default || pokemon?.sprites.front_default
  const stringColour = typeColours[colour] || typeColours['normal']
  return (
    <div className={`sm:rounded-t-2xl p-8 h-1/3 flex flex-col`} style={{background: stringColour}}>
      <div className='flex flex-col gap-2'>
        <div className='flex items-baseline justify-between'>
          <h1 className='sm:text-5xl text-6xl font-semibold capitalize'>{pokemon?.species.name || <Skeleton/>}</h1>
          <h2 className='sm:text-lg text-2xl'>#{pokemon?.id || <Skeleton/>}</h2>
        </div>
        <div className='items-center mt-1 grid grid-cols-2 font-medium'>
          <div className='col-span-1 flex gap-2 lowercase' >
          {pokemon?.types.map((type: Types, i) => {
            return (
              <span key={i} className={`bg-platinum px-3 py-1 rounded-full sm:text-xs text-lg`} style={{color: stringColour}}>{type.type.name}</span>
            )
          })}
          </div>
          <span className='text-end sm:text-base text-xl sm:font-normal'>{englishGenus || <Skeleton/>}</span>
        </div>
      </div>
      <span className='absolute top-60 font-bold self-start text-2xl text-platinum/60'>{originalName || <Skeleton/>}</span>
      {!isLoading ? <Image
      width={12}
      height={12}
      className='absolute self-center sm:h-44 h-60 w-auto sm:top-48 top-32 z-10' 
      alt={`${pokemon?.species.name}'s sprite`} 
      src={imageUrl || ''}
      />: <Skeleton className='absolute self-center sm:h-44 h-60 w-auto sm:top-48 top-32 z-10'/>}
    </div>
  )
}