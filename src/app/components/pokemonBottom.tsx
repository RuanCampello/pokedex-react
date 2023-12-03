import { useEffect, useState } from 'react'
import { typeColors } from './pokemonTop'
import { Pokemon } from './pokemonType'
import PokemonPageButton from './pokemonPageButton'
import { useRecoilState } from 'recoil'
import { view } from '@/atoms/view'
import About from './views/about'

interface PokemonBottomProps {
  colour: string
  name: string
}
interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}
interface PokemonSpecies {
  base_happiness: number
  capture_rate: number
  color: {
    name: string
    url: string
  }
  flavor_text_entries: FlavorText[]
}

export default function PokemonBottom({colour, name}: PokemonBottomProps) {
  const [currentView, setView] = useRecoilState(view)
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(null)
  useEffect(() => {
    async function getPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await response.json()
      setPokemon(data)
      console.log(data);
      
    }
    async function getPokemonSpecies(id: number) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      const data = await response.json()
      setPokemonSpecies(data)
      console.log(data)
      
    }
    getPokemon()
    getPokemonSpecies(pokemon?.id || 1)
  }, [name, pokemon?.id])
  const stringColour = typeColors[colour] || typeColors['normal']
  const engFlavorText = pokemonSpecies?.flavor_text_entries.find((entry) => entry.language.name === 'en')
  return (
    <div className='relative h-2/3 bg-platinum overflow-scroll rounded-b-2xl'>
      <div className='sticky top-0 left-0 w-full flex justify-around font-medium sm:pt-14 pt-12 px-2 text-slate-800 z-5 bg-platinum'>
        <PokemonPageButton text={'About'} pageView={'about'} />
        <PokemonPageButton text={'Base stats'} pageView={'stats'} />
        <PokemonPageButton text={'Evolution'} pageView={'evolution'} />
        <PokemonPageButton text={'Moves'} pageView={'moves'} />
      </div>
      <div className='px-6 pb-10'>
        {currentView === 'about' && <About description={engFlavorText?.flavor_text || ''} height={pokemon?.height || 0} weight={pokemon?.weight || 0} abilities={pokemon?.abilities?.map((ability) => ({
        name: ability.ability.name,
        isHidden: ability.is_hidden,
      })) || []} 
      />}
      </div>
    </div>
  )
}