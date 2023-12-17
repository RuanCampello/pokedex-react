import { useEffect, useRef, useState } from 'react'
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

          return (
            <div className='flex flex-col mb-2 gap-1' key={index}>
              <div className='grid grid-cols-3 mx-2'>
                <div>
                  <span className='capitalize sm:text-base text-xl font-medium'>{move.name}</span>
                  {/* <span>{}</span> level learned */}
                </div>
                <span title={move.type.name} className='text-center cursor-default sm:text-base text-lg'>{move.type.name}</span>
                {move.accuracy ? 
                  <span className='text-end sm:text-base text-lg'>{`${move.accuracy}%`}</span>
                :''}
              </div>
              <span className={`sm:text-sm text-base text-justify  mx-2 mb-2 text-slate-500`}>
                {textToDisplay}
              </span>
            </div>
          )
        })
      }
    </div>
  )
}