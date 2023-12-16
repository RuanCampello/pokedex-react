import React from 'react'

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
  const hasEvolution = images.length > 1
  return (
    <div className={`flex justify-between rounded-lg ${hasEvolution ? 'shadow-md' : ''}`}>
      {hasEvolution ? images.map((img, index) => (
        <div style={{borderColor: colour}} key={index} className={`flex flex-col items-center w-full ${index < images.length - 1 ? 'sm:border-r-2 border-r-[3px]' : ''}`}>
          <img className='sm:h-20 h-32 w-fit object-cover' src={img.url} />
          <span className='pb-2 sm:text-base text-xl sm:font-normal font-medium capitalize text-slate-800'>{img.name}</span>
        </div>
      )) : <div> <span className='capitalize italic'>{images[0]?.name}</span> does not evolve </div>}
    </div>
  )
}