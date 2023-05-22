export default function LineBreak(props: { width: string }) {
  return (
    <div className="h-[1px] rounded-full bg-gray-300 self-center" style={{ width: `${props.width}` }}/>
  )
}