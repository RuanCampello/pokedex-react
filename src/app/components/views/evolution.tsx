import React, { FC } from 'react'

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
interface EvolutionProps {
  evolutionData: EvolutionChain[]
}
function recursiveEvolution(evolution: Evolution): { name: string; url: string }[] {
  const data: { name: string; url: string }[] = [{name: evolution.species.name, url: evolution.species.url}]
  if (evolution.evolves_to.length > 0) {
    evolution.evolves_to.forEach((subEvolution: Evolution) => {
      data.push(...recursiveEvolution(subEvolution))
    })
  }
  return data
}
export default function Evolution({evolutionData}: EvolutionProps) {
  const allEvolutions: { name: string; url: string }[] = []

  evolutionData.forEach((chain) => {
    const chainEvolutions = recursiveEvolution(chain.chain)
    allEvolutions.push(...chainEvolutions)
  })
  console.log(allEvolutions)
  return (
    <div>
      {allEvolutions.map(({name, url}, i) => {
        return (
          <div key={i}>
            {name}
          </div>
        )
      })}
    </div>
  )
}