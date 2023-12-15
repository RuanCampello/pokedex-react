import { Suspense, lazy, useEffect, useState } from 'react'
import { typeColours } from './pokemonTop'
import { Pokemon } from './pokemonType'
import PokemonPageButton from './pokemonPageButton'
import { useRecoilState } from 'recoil'
import { view } from '@/atoms/view'
import About from './views/about'
import BaseStats from './views/baseStats'
const Evolution = lazy(() => import('./views/evolution'))
import { EvolutionChain, recursiveEvolution } from './views/evolution'
import { japaneseName } from '@/atoms/japaneseName'
import { genus } from '@/atoms/genus'
import { extractNumberFromUrl } from '../utils'
import { ImageData } from './views/evolution'

interface PokemonBottomProps {
  colour: string
  name: string
}
interface FlavorText {
  flavor_text: string;
  language: {
    name: string
    url: string
  }
}
interface EggGroup {
  name: string
  url: string
}
interface PokemonSpecies {
  base_happiness: number
  capture_rate: number
  gender_rate: number
  generation: {
    name: string
  }
  color: {
    name: string
    url: string
  }
  egg_groups: EggGroup[]
  flavor_text_entries: FlavorText[]
  evolution_chain: {
    url: string
  }
  genera: GenusEntry[]
}
interface NameEntry {
  language: {
    name: string
    url: string
  }
  name: string
}
interface GenusEntry {
  genus: string
  language: {
    name: string
    url: string
  }
}

export default function PokemonBottom({colour, name}: PokemonBottomProps) {
  const [currentView, setView] = useRecoilState(view)
  const [originalName, setJapaneseName] = useRecoilState(japaneseName)
  const [englishGenus, setEnglishGenus] = useRecoilState(genus)
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [pokemonStats, setPokemonStats] = useState([])
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(null)
  const [pokemonEvolutionChain, setEvolutionChain] = useState<EvolutionChain[]>([])
  const allEvolutions: { name: string; url: string }[] = []
  const [imagesUrl, setImagesUrl] = useState<ImageData[]>([])

  pokemonEvolutionChain.forEach((chain) => {
    const chainEvolutions = recursiveEvolution(chain.chain)
    allEvolutions.push(...chainEvolutions)
  })

  async function getPokemon() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    setPokemon(data)
    setPokemonStats(data.stats)
  }
  async function getPokemonSpecies(id: number) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const data = await response.json()
    setPokemonSpecies(data)
    const japaneseName = (data.names.find((nameEntry: NameEntry) => nameEntry.language.name === 'ja')?.name || '') as string
    setJapaneseName(japaneseName)
    const englishGenus = pokemonSpecies?.genera.find(genusEntry => genusEntry.language.name === 'en')?.genus || ''
    setEnglishGenus(englishGenus)
  }
  async function getEvoChain() {
    try {
      const response = await fetch(pokemonSpecies?.evolution_chain.url || '')
      if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`)
      const data = await response.json()
      setEvolutionChain(data ? [data] : [])
    } catch (error) {
      console.error('Error fetching evolution chain:', error)
    }
  }
  async function fetchImageUrls(){
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
    useEffect(() => {
      async function fetchData() {
        await getPokemon()
        await getPokemonSpecies(pokemon?.id || 1)
        await getEvoChain()
        console.log(1)
      }
      fetchData()
    }, [name, pokemon?.id, pokemonSpecies?.evolution_chain.url])
    useEffect(() => {
      if (pokemonEvolutionChain.length > 0) fetchImageUrls()
    }, [pokemonEvolutionChain])
  const stringColour = typeColours[colour] || typeColours['normal']
  const engFlavorText = pokemonSpecies?.flavor_text_entries.find((entry) => entry.language.name === 'en')
  return (
    <div className='relative h-2/3 bg-platinum overflow-scroll sm:rounded-b-2xl'>
      <div className='sticky top-0 left-0 w-full flex justify-around font-medium sm:pt-16 pt-14 px-2 text-slate-800 z-5 bg-platinum sm:text-base text-lg'>
        <PokemonPageButton text={'About'} pageView={'about'} />
        <PokemonPageButton text={'Base stats'} pageView={'stats'} />
        <PokemonPageButton text={'Evolutions'} pageView={'evolution'} />
        <PokemonPageButton text={'Moves'} pageView={'moves'} />
      </div>
      <div className='px-6 pb-10 text-slate-800'>
        {currentView === 'about' && <About description={engFlavorText?.flavor_text || ''} height={pokemon?.height || 0} weight={pokemon?.weight || 0} genderRatio={pokemonSpecies?.gender_rate || 0} generation={pokemonSpecies?.generation.name || ''} eggGroups={(pokemonSpecies?.egg_groups || []).map((eggGroup) => eggGroup.name)} abilities={pokemon?.abilities?.map((ability) => ({
        name: ability.ability.name,
        isHidden: ability.is_hidden,
      })) || []} />}
        {currentView === 'stats' && <BaseStats stats={pokemonStats} colour={stringColour}/>}
        {currentView === 'evolution' && (
        <Suspense fallback={<div className='w-40 h-40 text-center'>Loading images...</div>}>
          <Evolution colour={stringColour} images={imagesUrl} />
        </Suspense>
      )}
      </div>
    </div>
  )
}