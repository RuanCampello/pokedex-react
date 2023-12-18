interface BadgeProps {
  background: string
  title: string
  imageUrl: string
}

export default function Badge({ background, title, imageUrl }: BadgeProps) {
  return (
  <div style={{ background }} title={title} className='flex justify-self-end items-center cursor-default sm:text-base text-lg sm:p-[6px] p-2 w-fit rounded-full'>
    <img className='sm:h-3 h-4 sm:w-3 w-4' src={imageUrl} alt={title}/>
  </div>
  )
}