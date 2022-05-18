import { useEffect, useRef, useState } from "react"
import { XIcon } from '@heroicons/react/solid'


type ColorBannerProps = {
  index: number
  color: string
  disabled?: boolean
  onUpdate: (index: number, color: string) => void
}

export default function ColorBanner({ index, color, disabled, onUpdate }: ColorBannerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [background, setBackground] = useState<string>(color);

  useEffect(() =>{
    console.log('rendering')
  }, [])

  function handleCopy() {
    window.navigator.clipboard.writeText(color)
  }

  return (
    <div
      className="flex items-center justify-center h-32"
      style={{backgroundColor: background}}
      onChange={() => setBackground(inputRef.current?.value!)}
    >
      { disabled ?
        <div
          className="px-2 py-1 text-gray-900 bg-white text-center w-32 cursor-pointer"
          onClick={handleCopy}
        >
          {color}
        </div>
        :
        <input
          disabled={disabled}
          type="text"
          defaultValue={color}
          ref={inputRef}
          className="px-2 py-1 text-gray-900 bg-white text-center w-32"
          onClick={handleCopy}
          onInput={() => onUpdate(index, inputRef.current?.value!)}
        />
      }
    </div>
  )
}
