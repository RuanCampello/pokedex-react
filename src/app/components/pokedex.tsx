import { useEffect, useState } from 'react'
import Pokemon from './pokemon'
import { useRecoilState, RecoilRoot } from 'recoil'
import { pokemonKey } from '@/atoms/pokemonKey'
import { MagnifyingGlass } from '@phosphor-icons/react'

export default function Pokedex() {
  const [key, setPokemonKey] = useRecoilState(pokemonKey) 
  const [query, setQuery] = useState(String)
  function handleSubmit(e: any) {
    e.preventDefault()
    setPokemonKey(query.toLowerCase().trim())
    setQuery('')
  }
  return (
  <RecoilRoot>
    <div className='space-y-4 sm:w-pokedex w-screen'>
      <Pokemon name={key}/>
      <form onSubmit={handleSubmit} className='flex sm:relative absolute sm:px-0 px-20 w-full bottom-2' >
        <input 
          onChange={e => setQuery(e.target.value)}
          value={query}
          className='w-full rounded-l-xl h-12 text-lg text-slate-800 p-3 focus:outline-none border-r-0 border-4 border-slate-800 sm:border-white font-medium placeholder:text-slate-500' placeholder='Name or id' type='text' />
        <button className='rounded-r-xl w-16 sm:bg-platinum bg-slate-800 items-center justify-center flex font-medium' type='submit'>
          <MagnifyingGlass size={32} className='sm:text-slate-800 text-platinum' weight='bold' />
        </button>
      </form>
    </div>
    </RecoilRoot>
  )
}