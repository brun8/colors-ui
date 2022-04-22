import { useEffect, useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import Link from 'next/link'
import { db } from 'lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

import ColorBanner from 'components/ColorBanner'
import { useRouter } from 'next/router'
import SpinningCircle from 'components/SpinningCircle'


export default function ColorList() {
  const [prevColors, setPrevColors] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter()
  const { slug } = router.query

  useEffect(() =>{
    if (slug) {
      onSnapshot(doc(db, "lists", slug as string), (doc) => {
        setPrevColors(doc.data()?.colors)
      });
    }
  }, [slug])

  function changeColor(index: number, target: string) {
    const newColors = colors
    newColors[index] = target
    setColors(newColors)
  }

  function submitColors() {
    const arr = prevColors.concat(colors)
  }

  function addColor() {
    setColors(colors.concat(["#111"]))
  }

  function removeColor(index: number) {
    const arr = colors.slice(0, index).concat(colors.slice(index+1))
    setColors(arr)
  }

  let index = -1
  return (
    <div
      className='
        flex flex-col flex-1
        items-center gap-8 md:gap-12
      '
    >
      <nav className='w-full p-4'>
        <Link href="/">
          <a href="" className='w-auto'>
            <BsArrowLeftShort size={40}/>
          </a>
        </Link>
      </nav>
      <h1
        className='
          text-2xl
        '
      >
        {slug}
      </h1>
      <div className='w-full max-w-lg flex flex-col gap-8'>
        <div>
          {prevColors.map((col) => {
            index++
            return <ColorBanner key={index} index={index} color={col} changeColor={changeColor} removeColorCallback={removeColor} disabled/>
          })}
        </div>
        <div className=' border-t border-gray-300'>
          {colors.map((col) => {
            index++
            return <ColorBanner key={index} index={index} color={col} changeColor={changeColor} removeColorCallback={removeColor}/>
          })}
        </div>
      </div>

      {loading ?
        <button
          className='
            font-semibold
            rounded-md
            bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
            px-4 py-2
            w-4/5 max-w-xs
            text-white flex justify-center items-center
          '
        >
          <SpinningCircle /> <span>loading...</span>
        </button>
        :
        <button
          className='
            font-semibold
            rounded-md
            bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
            px-4 py-2
            w-4/5 max-w-xs
            text-white flex justify-center items-center
          '
          onClick={submitColors}
        >
          save
        </button>
      }

      <button onClick={addColor}
        className='
          absolute bottom-8 right-8
          h-12 w-12 rounded-full
          flex items-center justify-center
          text-white bg-slate-800 border border-slate-900
        '
      >
        <FiPlus size={34}/>
      </button>
    </div>
  )
}

