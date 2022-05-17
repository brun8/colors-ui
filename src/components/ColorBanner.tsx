import { useRef, useState } from "react"
import { HiX } from 'react-icons/hi'

type ColorBannerProps = {
  color: string
  disabled?: boolean
  removeColorCallback?: () => void
}

export default function ColorBanner({ color, disabled, removeColorCallback }: ColorBannerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [background, setBackground] = useState<string>(color);

  function handleCopy() {
    window.navigator.clipboard.writeText(color)
  }

  return (
    <div
      className="flex items-center justify-center h-32 relative"
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
        <>
          <input
            disabled={disabled}
            type="text"
            defaultValue={color}
            ref={inputRef}
            className="px-2 py-1 text-gray-900 bg-white text-center w-32"
            onClick={handleCopy}
          />
          <div
            className="
              absolute bottom-2 right-2
              text-white bg-gray-800
              w-6 h-6 rounded-full
              flex items-center justify-center
            "
            onClick={removeColorCallback}
          >
            <HiX size={16}/>
          </div>
        </>
      }
    </div>
  )
}
