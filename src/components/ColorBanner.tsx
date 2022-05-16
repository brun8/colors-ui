import { BaseSyntheticEvent, useRef, useState } from "react"

export default function ColorBanner({ color }: { color: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [background, setBackground] = useState<string>(color);

  return (
    <div
      className="flex items-center justify-center h-32"
      style={{backgroundColor: background}}
      onChange={() => setBackground(inputRef.current?.value!)}
    >
      <input
        type="text"
        defaultValue={color}
        ref={inputRef}
        className="px-2 py-1 text-gray-900 text-center w-32"
      />
    </div>
  )
}
