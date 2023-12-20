import { useEffect, useMemo, useState } from 'react'
import { MoveType, Tm } from '../types/moveType'
import LevelUpMoves from '../levelUpMoves'
import MachineMoves from '../machineMoves'

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
  bug: { path: 'icons/bug.svg', colour: '#6BBC46' },
  dark: { path: 'icons/dark.svg', colour: '#705746' },
  dragon: { path: 'icons/dragon.svg', colour: '#6F35FC' },
  electric: { path: 'icons/electric.svg', colour: '#F68E1D' },
  fairy: { path: 'icons/fairy.svg', colour: '#D685AD' },
  fighting: { path: 'icons/fighting.svg', colour: '#A98FF3' },
  fire: { path: 'icons/fire.svg', colour: '#EE742D' },
  flying: { path: 'icons/flying.svg', colour: '#748FC9' },
  ghost: { path: 'icons/ghost.svg', colour: '#735797' },
  grass: { path: 'icons/grass.svg', colour: '#2FBF71' },
  ground: { path: 'icons/ground.svg', colour: '#D5AC45' },
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
  const [machineMovesData, setMachineMovesData] = useState<MoveType[]>([])

  const levelMoveUrls = useMemo(() => levelUpMoves.map((move) => move.move.url), [levelUpMoves])
  const machineMoveUrls = useMemo(() => machineMoves.map((move) => move.move.url), [machineMoves])

  useEffect(() => {
    async function fetchLevelData() {
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
    fetchLevelData()
  }, [levelUpMoves])
  useEffect(() => {
    setMachineMovesData([])
    async function fetchMachineData() {
      const movePromises = machineMoveUrls.map(async(url) => {
        const response = await fetch(url)
        const moveData: MoveType = await response.json()

        if(moveData.name) moveData.name = moveData.name.split('-').join(' ')
        moveData.effect_entries.forEach((entry) => {
          entry.effect = entry.effect.replace(/[-:]/g, '')
        })
        return moveData
      })
      const movesData = await Promise.all(movePromises)
      // fetch additional data for tmurls
      const tmPromises = movesData.map(async(move) => {
        const index = move.machines.length
        const machine = move.machines[index-1]
        if(machine && machine.machine) {
          const tmResponse = await fetch(machine.machine.url)
          const tmData: Tm = await tmResponse.json()
          console.log(tmData)        
          return tmData
        }
        return null
      })
      const tmsData = await Promise.all(tmPromises)
      const mergedMovesData = movesData.map((moveData, index) => ({
        ...moveData,
        tm: tmsData[index]
      }))
      setMachineMovesData(mergedMovesData as MoveType[])
    }
    fetchMachineData()
  }, [machineMoves, machineMoveUrls])
  
  function separateTmArray(tm: string) {
    const match = tm.match(/([a-zA-Z]+)([0-9]+)/)
    if(match) {
      const [, tmType, tmNumber] = match
      return {type: tmType, number: parseInt(tmNumber, 10)}
    }
    return null
  }
  return (
    <div className='sm:pb-0 pb-12'>
      <h1 className='sm:text-xl text-2xl font-bold mb-4 pb-1 sm:border-b-2 border-b-4 border-slate-800'>Learned by level</h1>
      {
        levelUpMovesData
        .sort((a, b) => (a.level_learned_at || 0) - (b.level_learned_at || 0))
        .map((move, index) => {
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
      <h1 className='sm:text-xl text-2xl font-bold mb-4 pb-1 sm:border-b-2 border-b-4 border-slate-800'>Learned by TM</h1>
      {
        machineMovesData.map((move, index) => {
          const effectText = move.effect_entries && move.effect_entries[0] && (move.effect_entries[0].short_effect)
          const replacedEffect = effectText && move.effect_chance ? effectText.replace(/\$effect_chance/g, move.effect_chance.toString()) : effectText
          const flavorText = move.flavor_text_entries && move.flavor_text_entries.find(entry => entry.language.name === 'en')
          const textToDisplay = replacedEffect || (flavorText && flavorText.flavor_text) || 'n/a'

          const typeImageUrl = typeImagesAndColours[move.type.name]
          const damageCategory = damageCategoryImages[move.damage_class.name]

          const machine = separateTmArray(move.tm.item.name)
          const machineType = machine?.type
          const machineNumber = machine?.number

          return (
            <MachineMoves key={index} text={textToDisplay} name={move.name} machineType={machineType || ''} machineNumber={machineNumber || 0} accuracy={move.accuracy} classColour={damageCategory.colour} classImage={damageCategory.path} elementalColour={typeImageUrl.colour} elementalImage={typeImageUrl.path} elementalTitle={move.type.name} classTitle={move.damage_class.name}/>
          )
        })
      }
    </div>
  )
}