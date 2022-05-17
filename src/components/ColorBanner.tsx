import { useRef, useState } from "react"
import { XIcon } from '@heroicons/react/solid'
import DialogModal from 'components/DialogModal'


type ColorBannerProps = {
  index: number
  color: string
  disabled?: boolean
  removeColorCallback?: () => void
  onUpdate: (index: number, color: string) => void
}

export default function ColorBanner({ index, color, disabled, removeColorCallback, onUpdate }: ColorBannerProps) {
  const [modalVisible, setModalVisible] = useState(false);
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
            onInput={() => onUpdate(index, inputRef.current?.value!)}
          />
          <div
            className="
              absolute bottom-2 right-2
              text-white bg-gray-800
              w-6 h-6 rounded-full
              flex items-center justify-center
            "
            onClick={() => setModalVisible(true)}
          >
            <XIcon className="w-4 h-4"/>
          </div>
          <DialogModal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={removeColorCallback!}
          />
        </>
      }
    </div>
  )
}
