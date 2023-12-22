'use client'
import { useEffect, useState } from 'react'
import { Pokemon, Types } from './types/pokemonType'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { japaneseName } from '@/atoms/japaneseName'
import { genus } from '@/atoms/genus'
import { pokemonKey } from '@/atoms/pokemonKey'
import { typeImagesAndColours } from './views/moves'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'

interface PokemonTopProps {
  name: string
}

export default function PokemonTop({name}: PokemonTopProps) {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [originalName, setJapaneseName] = useRecoilState(japaneseName)
  const [englishGenus, setEnglishGenus] = useRecoilState(genus)
  const [pokeKey, setPokeKey] = useRecoilState(pokemonKey)
  const colour = pokemon?.types[0].type.name || 'normal'

  useEffect(() => {
    async function getPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeKey}`);
        const data = await response.json();
        setPokemon(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getPokemon()
    
  }, [pokeKey, name])
  function handleBack() {
    setPokeKey(pokeKey-1)
  }
  function handlePass() {
    setPokeKey(pokeKey+1)
  }
  const imageUrl = pokemon?.sprites.versions['generation-v']['black-white']?.animated?.front_default || pokemon?.sprites.front_default
  console.log(imageUrl);
  
  const stringColour = typeImagesAndColours[colour] || typeImagesAndColours['normal']
  return (
    <div className={`sm:rounded-t-2xl p-8 pb-3 h-1/3 flex flex-col selection:text-slate-700 selection:bg-platinum`} style={{background: stringColour.colour}}>
      <div className='flex flex-col gap-2'>
        <div className='flex items-baseline justify-between'>
          <h1 className='sm:text-5xl text-6xl font-semibold capitalize'>{pokemon?.species.name}</h1>
          <h2 className='sm:text-lg text-2xl'>#{pokemon?.id}</h2>
        </div>
        <div className='items-center mt-1 grid grid-cols-2 font-medium'>
          <div className='col-span-1 flex gap-2 lowercase' >
          {pokemon?.types.map((type: Types, i) => {
            return (
              <span key={i} className={`bg-platinum px-3 py-1 rounded-full sm:text-xs`} style={{color: stringColour.colour}}>{type.type.name}</span>
            )
          })}
          </div>
          <span className='text-end sm:text-sm text-md sm:font-normal'>{englishGenus}</span>
        </div>
      </div>
      <span className='font-bold relative my-auto self-start text-3xl sm:text-2xl text-platinum/70 z-1'>{originalName}</span>
      <div className='flex justify-between'>
        <button disabled={pokeKey === 1} onClick={handleBack} className={`${pokeKey !== 1 ? 'bg-platinum' : 'bg-platinum/70'} p-2 rounded-full`}>
          <CaretLeft color={stringColour.colour} className='w-auto h-8 sm:h-4' weight='bold'/>
        </button>
        <button onClick={handlePass} className='bg-platinum p-2 rounded-full'>
          <CaretRight color={stringColour.colour} className='w-auto h-8 sm:h-4' weight='bold'/>
        </button>
      </div>
      <Image
      width={240}
      height={240}
      className='self-center absolute sm:h-44 h-60 w-auto sm:top-48 top-32 z-10' 
      alt={`${pokemon?.species.name}'s sprite`} 
      src={imageUrl || ''}
      />
    </div>
  )
}