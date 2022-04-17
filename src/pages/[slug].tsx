import { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { BsArrowLeftShort } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import Link from 'next/link'

import { getList, updateList } from 'services/api'
import ColorBanner from 'components/ColorBanner'

type ColorListProps = {
  list: List
}

export default function ColorList({ list }: ColorListProps) {
  const [colors, setColors] = useState<Color[]>(list.colors);

  function changeColor(index: number, code: string) {
    const newColors = colors
    newColors[index].code = code
    setColors(newColors)
  }

  function submitColors() {
    const arr = colors.map((color) => (
      color.code
    ))
    updateList(list.slug, arr)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  function addColor() {
    setColors(colors.concat([{code: "#111"}]))
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
          <a href="">
            <BsArrowLeftShort size={40}/>
          </a>
        </Link>
      </nav>
      <h1
        className='
          text-2xl
        '
      >
        {list.slug}
      </h1>
      <div className='w-full max-w-lg'>
        {colors.map((col) => {
          index++
          return <ColorBanner key={index} index={index} color={col} changeColor={changeColor} removeColorCallback={removeColor}/>
        })}
      </div>

      <button
        className='
          uppercase tracking-wide
          border-2 border-black rounded
          bg-green-300 px-3 py-1
          w-4/5 max-w-md
        '
        onClick={submitColors}>
        save
      </button>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {slug} = context.query

  const res = await getList(String(slug))
  const data = res?.data

  return {
    props: {
      list: data || {slug, colors: []}
    }
  }
}

