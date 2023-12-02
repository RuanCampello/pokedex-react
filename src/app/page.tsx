'use client'
import Pokedex from './components/pokedex'
import { RecoilRoot } from 'recoil'

export default function Home() {
  return (
    <main className='w-screen h-screen bg-slate-800 text-platinum flex items-center justify-center'>
      <RecoilRoot>
        <Pokedex/>
      </RecoilRoot>
    </main>
  )
}
