import { useRef } from "react"

export default function ColorBanner({ color }: { color: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      className="flex items-center justify-center h-32"
      style={{backgroundColor: color}}
    >
      <input type="text" className="p-2" />
    </div>
  )
}
