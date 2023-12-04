interface LineProps {
  colour: string,
  widthValue: number
}

export default function Line({colour, widthValue}: LineProps) {
  let lineColour = colour
  let componentWidth = widthValue
  if(widthValue < 50) lineColour = '#F95587'
  const lineStyle = {
    width: `${componentWidth}%`,
    background: lineColour
  }
  return (
    <div className='relative col-span-4'>
      <div style={lineStyle} className={`rounded-lg max-w-full absolute h-2`}>
      </div>
      <div className={`bg-silver w-full rounded-lg h-2`}>
      </div>
    </div>
  )
}