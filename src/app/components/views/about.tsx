import { convertKgToPounds, convertMetersToFeetAndInches, sanitizeAndCapitalizeSentences } from '@/app/utils'
import { GenderFemale, GenderMale } from '@phosphor-icons/react'

interface AboutProps {
  description: string
  height: number
  weight: number
  abilities: { name: string; isHidden: boolean }[]
  eggGroups: string[]
  genderRatio: number
}

export default function About({description, height, weight, abilities, genderRatio, eggGroups}: AboutProps) {
  let displayedHeight = String(height)
  if(height >= 10) displayedHeight = `${height/10} m`
  else displayedHeight = `${height*10} cm`
  let femaleRatio = (genderRatio/8)*100
  console.log(eggGroups);
  
  return (
    <div className='w-full text-slate-500'>
      <p className='text-[15px] text-justify italic'>
        {sanitizeAndCapitalizeSentences(description)}
      </p>
      <div className='grid grid-cols-3 mt-8'>
        <div className='space-y-4'>
          <p>Height</p>
          <p>Weight</p>
          <p>Abilities</p>
        </div>
        <div className='text-slate-800 space-y-4 col-span-2'>
          <div className='gap-2 flex'>
            <span>{displayedHeight}</span>
            <span className='text-slate-500'>({convertMetersToFeetAndInches(height/10)})</span>
          </div>
          <div className='gap-2 flex'>
            <span>{weight/10} kg</span>
            <span className='text-slate-500'>({convertKgToPounds(weight/10)})</span>
          </div>
          <ul>
            {abilities.map((ability, index) => (
              <div className='flex gap-2 items-center' key={index}>
                {ability.name}
                {ability.isHidden ? 
                  <span className='text-xs bg-slate-800 text-platinum px-2 p-1 rounded-full font-medium'>hidden</span>
                : null}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className='space-y-4'>
        <h1 className='text-lg text-slate-800 font-medium mt-6'>Breeding</h1>
        <div className='text-slate-800 grid grid-cols-3'>
          <h2 className='text-slate-500'>Gender</h2>
          {genderRatio > -1 ? 
          <div className='col-span-2 grid grid-cols-2'>
            <span className='flex gap-2 items-center'>
              <GenderFemale color='#F95587' size={20} weight='bold'/> {femaleRatio}%
            </span>
            <span className='flex gap-2 items-center'>
              <GenderMale color='#6390F0' size={20} weight='bold'/> {100-femaleRatio}% 
            </span>
          </div> : 
          <span className='text-slate-800'>unknown</span>}
        </div>
        <div className='grid grid-cols-3'>
          <h2 className='tetxt-slate-800'>Egg groups</h2>
          <div className='col-span-2 flex gap-2 text-slate-800'>
            {eggGroups.join(', ')}
          </div>
        </div>
      </div>
    </div>
  )
}