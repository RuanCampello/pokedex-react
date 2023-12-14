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
interface ImageData {
  name: string
  url: string
}
interface EvolutionProps {
  evolutionData: EvolutionChain[]
  colour: string
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
export default function Evolution({ evolutionData, colour }: EvolutionProps) {
  const allEvolutions: { name: string; url: string }[] = []
  const [imagesUrl, setImagesUrl] = useState<ImageData[]>([])

  evolutionData.forEach((chain) => {
    const chainEvolutions = recursiveEvolution(chain.chain)
    allEvolutions.push(...chainEvolutions)
  })
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        allEvolutions.map(async ({ name, url }) => {
          const id = extractNumberFromUrl(url)
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const data = await response.json()
          const imageUrl = data?.sprites.versions['generation-v']['black-white']?.animated?.front_default || data?.sprites.front_default
          return { url:imageUrl, name }
        })
      )
      setImagesUrl(urls)
    }
    fetchImageUrls()
  }, [evolutionData])
  return (
    <div className='flex justify-center'>
      {imagesUrl.length > 1 ? imagesUrl.map((img, index) => (
        <div className='flex justify-between items-center'>
          <img className='h-16 w-auto' src={img.url} />
          { index !== imagesUrl.length-1 ? <CaretRight size={32} color={colour} weight='duotone'/> : null }
        </div>
      )) : <div> <span className='capitalize italic'>{imagesUrl[0]?.name}</span> does not evolve </div>}
    </div>
  )
}