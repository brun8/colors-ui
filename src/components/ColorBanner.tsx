import { useState, useRef } from 'react';
import { FiCopy, FiTrash } from 'react-icons/fi';

type ColorBannerProps = {
  color: Color
  changeColor: (index: number, code: string) => void
  index: number
  removeColorCallback: (index: number) => void
}

export default function ColorBanner({ color, index, changeColor, removeColorCallback }: ColorBannerProps) {
  const ref = useRef<HTMLInputElement>(null)
  const [bg, setBg] = useState<string>(color.code);

  function copyToClipboard() {
    navigator.clipboard.writeText(color.code)
      .then(() => {
        console.log('Copied hex code to clipboard')
      })
  }

  return (
    <div
      className='
        h-24 text-center
        flex items-center justify-center
        cursor-pointer
        w-full relative
      '
      style={{backgroundColor: bg}}
      onClick={() => console.log()}
    >
      <div className='w-12'></div>
      <div className="bg-white flex justify-center">
        <input
          className="bg-white text-center w-28"
          ref={ref}
          defaultValue={color.code}
          onChange={() => {
            setBg(ref.current?.value || color.code)
          }}
          onBlur={() => {
            changeColor(index, ref.current?.value || color.code)
          }}
        />
        <div className='
          flex gap-2
          absolute bottom-2 right-2
        '>
          <div
            className='
              flex items-center justify-center
              w-8 h-8
              bg-white rounded-full
              px-2 py-1 text-sm
              border border-black
            '
            onClick={copyToClipboard}
          >
            <button>
              <FiCopy size={14}/>
            </button>
          </div>
          <div
            className='
              flex items-center justify-center
              w-8 h-8
              bg-white rounded-full
              px-2 py-1 text-sm
              border border-black
            '
            onClick={() => removeColorCallback(index)}
          >
            <button>
              <FiTrash size={14}/>
            </button>
          </div>
        </div>
      </div>
      <div className='bg-gray-400 w-12'></div>
    </div>
  )
}
