import { useEffect, useState } from 'react'
import { MoveType } from '../types/moveType'

export type Move = {
  move: {
    name: string
    url: string
  }
  version_group_details: {
    level_learned_at: number
    move_learn_method: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }[]
}
interface MovesProps {
  levelUpMoves: Move[]
  machineMoves: Move[]
}

const typeImages: { [key: string]: { path: string; colour: string } } = {
  bug: { path: 'icons/bug.svg', colour: '#A6B91A' },
  dark: { path: 'icons/dark.svg', colour: '#705746' },
  dragon: { path: 'icons/dragon.svg', colour: '#6F35FC' },
  electric: { path: 'icons/electric.svg', colour: '#ff9e00' },
  fairy: { path: 'icons/fairy.svg', colour: '#D685AD' },
  fighting: { path: 'icons/fighting.svg', colour: '#A98FF3' },
  fire: { path: 'icons/fire.svg', colour: '#EE8130' },
  flying: { path: 'icons/flying.svg', colour: '#748FC9' },
  ghost: { path: 'icons/ghost.svg', colour: '#735797' },
  grass: { path: 'icons/grass.svg', colour: '#7AC74C' },
  ground: { path: 'icons/ground.svg', colour: '#E2BF65' },
  ice: { path: 'icons/ice.svg', colour: '#6497b1' },
  normal: { path: 'icons/normal.svg', colour: '#A8A77A' },
  poison: { path: 'icons/poison.svg', colour: '#A33EA1' },
  psychic: { path: 'icons/psychic.svg', colour: '#F95587' },
  rock: { path: 'icons/rock.svg', colour: '#B6A136' },
  steel: { path: 'icons/steel.svg', colour: '#B7B7CE' },
  water: { path: 'icons/water.svg', colour: '#6390F0' },
}

export default function Moves({levelUpMoves, machineMoves}: MovesProps) {
  const [levelUpMovesData, setLevelUpMovesData] = useState<MoveType[]>([])

  useEffect(() => {
    const levelMoveUrls = levelUpMoves.map((move) => move.move.url)
    const machineMoveUrls = machineMoves.map((move) => move.move.url)
    async function fetchData() {
      const movePromises = levelMoveUrls.map(async(url) => {
        const response = await fetch(url)
        const moveData: MoveType = await response.json()
        if(moveData.name) moveData.name = moveData.name.split('-').join(' ')
        return moveData
      })
      const movesData = await Promise.all(movePromises)
      setLevelUpMovesData(movesData)
    }
    fetchData()
  }, [levelUpMoves])
  return (
    <div className='sm:m-0 mb-12'>
      {
        levelUpMovesData.map((move, index) => {
          const effectText = move.effect_entries && move.effect_entries[0] && (move.effect_entries[0].short_effect || move.effect_entries[0].effect)
          const replacedEffect = effectText && move.effect_chance ? effectText.replace(/\$effect_chance/g, move.effect_chance.toString()) : effectText
          const flavorText = move.flavor_text_entries && move.flavor_text_entries.find(entry => entry.language.name === 'en')
          const textToDisplay = replacedEffect || (flavorText && flavorText.flavor_text) || 'n/a'

          const typeImageUrl = typeImages[move.type.name]

          return (
            <div className='flex flex-col my-2 gap-1' key={index}>
              <div className='grid grid-cols-5 mx-2 items-center'>
                <div className='col-span-2'>
                  <span className='capitalize sm:text-base text-[22px] font-medium'>{move.name}</span>
                  {/* <span>{}</span> level learned */}
                </div>
                {move.accuracy ? 
                  <span className='col-span-2 text-start sm:text-base text-xl'>{`${move.accuracy}%`}</span>
                :<span className='col-span-2'></span>}
                <div style={{background: typeImageUrl.colour}} title={move.type.name} className='flex justify-self-end items-center cursor-default sm:text-base text-lg sm:p-[5px] p-[6px] w-fit rounded-full'>
                  <img className='sm:h-4 h-6' src={typeImageUrl.path} alt={move.type.name} />
                </div>
              </div>
              <span className={`sm:text-sm text-lg text-justify  mx-2 mb-2 text-slate-500`}>
                {textToDisplay}
              </span>
            </div>
          )
        })
      }
    </div>
  )
}