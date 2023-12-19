import { useEffect, useMemo, useState } from 'react'
import { MoveType } from '../types/moveType'
import LevelUpMoves from '../levelUpMoves'

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

export const typeImagesAndColours: { [key: string]: { path: string; colour: string } } = {
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
  water: { path: 'icons/water.svg', colour: '#6390F0' }
}

const damageCategoryImages: { [key: string] : { path: string; colour: string } } = {
  physical: { path: 'damage-category/physical.png', colour: '#EF6845' },
  special: { path: 'damage-category/special.png', colour: '#61ADF3' },
  status: { path: 'damage-category/status.png', colour: '#96999A' }
}

export default function Moves({levelUpMoves, machineMoves}: MovesProps) {
  const [levelUpMovesData, setLevelUpMovesData] = useState<MoveType[]>([])

  const levelMoveUrls = useMemo(() => levelUpMoves.map((move) => move.move.url), [levelUpMoves])
  const machineMoveUrls = useMemo(() => machineMoves.map((move) => move.move.url), [machineMoves])

  useEffect(() => {
    async function fetchData() {
      const movePromises = levelMoveUrls.map(async(url) => {
        const response = await fetch(url)
        const moveData: MoveType = await response.json()

        const correspondingMove = levelUpMoves.find((move) => move.move.url === url)
        if (correspondingMove) {
          const levelLearnedInfo = correspondingMove.version_group_details[0]
          moveData.level_learned_at = levelLearnedInfo.level_learned_at
        }
        if(moveData.name) moveData.name = moveData.name.split('-').join(' ')
        moveData.effect_entries.forEach((entry) => {
          entry.effect = entry.effect.replace(/[-:]/g, '')
        })
        return moveData
      })
      const movesData = await Promise.all(movePromises)
      setLevelUpMovesData(movesData)
    }
    fetchData()
  }, [levelUpMoves])
  return (
    <div className='sm:pb-0 pb-12'>
      <h1 className='sm:text-xl text-2xl font-bold mb-4 pb-1 sm:border-b-2 border-b-4 border-slate-800'>Learned by level</h1>
      {
        levelUpMovesData.map((move, index) => {
          const effectText = move.effect_entries && move.effect_entries[0] && (move.effect_entries[0].effect)
          const replacedEffect = effectText && move.effect_chance ? effectText.replace(/\$effect_chance/g, move.effect_chance.toString()) : effectText
          const flavorText = move.flavor_text_entries && move.flavor_text_entries.find(entry => entry.language.name === 'en')
          const textToDisplay = replacedEffect || (flavorText && flavorText.flavor_text) || 'n/a'

          const typeImageUrl = typeImagesAndColours[move.type.name]
          const damageCategory = damageCategoryImages[move.damage_class.name]
          
          return (
            <LevelUpMoves key={index} typeImage={typeImageUrl.path} text={textToDisplay} damageClass={move.damage_class.name} classImage={damageCategory.path} elementalColour={typeImageUrl.colour} classColour={damageCategory.colour} levelLearned={move.level_learned_at || 0} accuracy={move.accuracy} name={move.name} elementalType={move.type.name}/>
          )
        })
      }
    </div>
  )
}