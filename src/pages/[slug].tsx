import { useEffect, useState } from 'react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import Link from 'next/link'
import { db } from 'lib/firebase'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'

import ColorBanner from 'components/ColorBanner'
import { useRouter } from 'next/router'
import SpinningCircle from 'components/SpinningCircle'


export default function ColorList() {
  const [serverColors, setServerColors] = useState<string[]>([]);
  const [localColors, setLocalColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialFetch, setInitialFetch] = useState(true);

  const router = useRouter()
  const { slug } = router.query

  useEffect(() =>{
    if (slug) {
      onSnapshot(doc(db, "lists", slug as string), (doc) => {
        if (doc.data()) {
          setServerColors(doc.data()?.colors)
        }
        setInitialFetch(false)
      });
    }
  }, [slug])

  function changeColor(index: number, target: string) {
    const newColors = localColors
    newColors[index] = target
    setLocalColors(newColors)
  }

  async function submitColors() {
    setLoading(true)
    const newColors = serverColors.concat(localColors)
    await setDoc(doc(db, "lists", slug as string), {
      colors: newColors,
    });
    setLocalColors([])
    setLoading(false)
  }

  function addColor() {
    setLocalColors(localColors.concat(["#111"]))
  }

  // FIXME: quando uma cor é removida o estado fica certo e a renderizacao nao
  function removeColor(index: number) {
    const arr = localColors.slice(0, index).concat(localColors.slice(index+1))
    setLocalColors(arr)
  }

  let serverIndex = -1
  let index = -1
  return (
    <div
      className='
        flex flex-col flex-1
        items-center gap-8 md:gap-12
      '
    >
      <nav className='w-full p-4 flex justify-start'>
        <Link href="/">
          <a href="" className=''>
            <BsArrowLeftShort size={40}/>
          </a>
        </Link>
      </nav>
      <h1
        className='
          text-2xl font-bold
        '
        onClick={() => console.log(localColors)}
      >
        {slug}
      </h1>
      { initialFetch ?
        <div className='inline-flex justify-center text-gray-700'>
          <SpinningCircle />
        </div>
        :
        <>
        <div className='w-full max-w-lg flex flex-col gap-8'>
          {/* loading */}
          {/* server colors */}
          <div>
            {(serverColors.length === 0 && localColors.length === 0) &&
              <p className='text-center text-lg'>
                list empty
              </p>
            }

            {serverColors.map((col) => {
              serverIndex++
              return <ColorBanner key={serverIndex} index={index} color={col} changeColor={changeColor} removeColorCallback={removeColor} disabled/>
            })}
          </div>

          {(serverColors.length !== 0 && localColors.length !== 0) &&
            <hr className='border-t border-gray-300 my-4'/>
          }

          {/* local colors */}
          { localColors.length !== 0 &&
            <div>
              {localColors.map((col) => {
                index++
                return <ColorBanner key={index} index={index} color={col} changeColor={changeColor} removeColorCallback={removeColor}/>
              })}
            </div>
          }
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
              gap-2
            '
          >
            <SpinningCircle /><span>loading...</span>
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
        </>
      }
    </div>
  )
}

