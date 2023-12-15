import { extractNumberFromUrl } from '@/app/utils'
import { CaretRight } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

interface EvolutionTrigger {
  name: string
  url: string
}
interface EvolutionDetail {
  gender: null
  held_item: null
  item: {
    name: string
    url: string
  } | null
  known_move: null
  known_move_type: null
  location: null
  min_affection: null
  min_beauty: null
  min_happiness: number | null
  min_level: null
  needs_overworld_rain: boolean
  party_species: null
  party_type: null
  relative_physical_stats: null
  time_of_day: string
  trade_species: null
  trigger: EvolutionTrigger
  turn_upside_down: false
}
interface Evolution {
  evolution_details: EvolutionDetail[]
  evolves_to: Evolution[]
  is_baby: boolean
  species: {
    name: string
    url: string
  }
}
export interface EvolutionChain {
  baby_trigger_item: null
  chain: {
    evolution_details: EvolutionDetail[]
    evolves_to: Evolution[]
    is_baby: boolean
    species: {
      name: string
      url: string
    }
  }
  id: number
}
export interface ImageData {
  name: string
  url: string
}
interface EvolutionProps {
  colour: string
  images: {
    url: string
    name: string
  }[]
}
export function recursiveEvolution(evolution: Evolution): { name: string; url: string }[] {
  const data: { name: string; url: string }[] = [{name: evolution.species.name, url: evolution.species.url}]
  if (evolution.evolves_to.length > 0) {
    evolution.evolves_to.forEach((subEvolution: Evolution) => {
      data.push(...recursiveEvolution(subEvolution))
    })
  }
  return data
}
export default function Evolution({ colour, images }: EvolutionProps) {
  console.log(images);
  
  return (
    <div className='flex justify-center'>
      {images.length > 1 ? images.map((img, index) => (
        <div key={index} className='flex justify-between items-center'>
          <div className='flex flex-col items-center'>
            <img className='h-20 w-fit object-contain' src={img.url} />
            <span className='capitalize'>{img.name}</span>
          </div>
          { index !== images.length-1 ? <CaretRight size={32} color={colour} weight='duotone'/> : null }
        </div>
      )) : <div> <span className='capitalize italic'>{images[0]?.name}</span> does not evolve </div>}
    </div>
  )
}