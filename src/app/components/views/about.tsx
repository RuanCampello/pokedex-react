import { convertKgToPounds, convertMetersToFeetAndInches, formatGeneration, sanitizeAndCapitalizeSentences } from '@/app/utils'
import { GenderFemale, GenderMale } from '@phosphor-icons/react'

interface AboutProps {
  description: string
  height: number
  weight: number
  abilities: { name: string; isHidden: boolean }[]
  eggGroups: string[]
  genderRatio: number
  generation: string
}

export default function About({description, height, weight, abilities, genderRatio, eggGroups, generation}: AboutProps) {
  let displayedHeight = String(height)
  if(height >= 10) displayedHeight = `${height/10} m`
  else displayedHeight = `${height*10} cm`
  let femaleRatio = (genderRatio/8)*100
  
  return (
    <div className='w-full text-slate-500 sm:text-base text-lg'>
      <p className='sm:text-[15px] leading-5 text-justify italic'>
        {sanitizeAndCapitalizeSentences(description)}</p>
        <span className='float-right mb-2'>- {formatGeneration(generation)}</span>
        <section className='w-full grid grid-cols-2 my-6 shadow-md p-4 rounded-xl'>
          <div>
            <h3>Height</h3>
            <div className='text-slate-800 space-x-2 sm:font-normal font-medium'>
              <span>{displayedHeight}</span>
              <span>({convertMetersToFeetAndInches(height/10)})</span>
            </div>
          </div>
          <div>
            <h3>Weight</h3>
            <div className='text-slate-800 space-x-2 sm:font-normal font-medium'>
              <span>{weight/10} kg</span>
              <span>({convertKgToPounds(weight/10)})</span>
            </div>
          </div>
        </section>
        <section className='grid grid-cols-2'>
          <h3>Abilities</h3>
          <ul>
            {abilities.map((ability, index) => (
              <div className='flex gap-2 text-slate-800 items-center sm:font-normal font-medium justify-between' key={index}>
                {ability.name}
                {ability.isHidden ? 
                  <span className='text-xs bg-slate-800 text-platinum px-2 p-1 rounded-full font-bold'>hidden</span>
                : null}
              </div>
            ))}
          </ul>
        </section>
      <div className='space-y-2 sm:text-base text-lg'>
        <h1 className='text-lg text-slate-800 font-medium pb-1'>Breeding</h1>
        <div className='text-slate-800 grid grid-cols-2'>
          <h2 className='text-slate-500'>Gender</h2>
          {genderRatio > -1 ? 
          <div className='grid grid-cols-2 sm:font-normal font-medium'>
            <span className='flex gap-2 items-center'>
              <GenderFemale color='#F95587' size={20} weight='bold'/> {femaleRatio}%
            </span>
            <span className='flex gap-2 items-center'>
              <GenderMale color='#6390F0' size={20} weight='bold'/> {100-femaleRatio}% 
            </span>
          </div> : 
          <span className='text-slate-800 sm:font-normal font-medium'>unknown</span>}
        </div>
        <div className='grid grid-cols-2'>
          <h2 className='text-slate-500'>Egg groups</h2>
          <div className='flex gap-2 text-slate-800 sm:font-normal font-medium'>
            {eggGroups.join(', ')}
          </div>
        </div>
      </div>
    </div>
  )
}