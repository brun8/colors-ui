import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { GoSearch } from 'react-icons/go'


const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null!)
  const router = useRouter()

  return (
    <div className='flex flex-col items-center h-screen md:p-20 p-12'>
      <form
        className='
          flex flex-col items-center
          w-full
          gap-4
        '
        onSubmit={(e) => {
          e.preventDefault()
          router.push(`${inputRef.current.value}`)
        }}
      >
        <div className='relative mx-auto w-4/5 max-w-lg flex items-center'>
          <input
            type="text"
            className='
              px-4 py-2
              border border-gray-300
              rounded-md bg-gray-100
              outline-slate-600
              w-full
            '
            ref={inputRef}
          />
          <GoSearch className='absolute right-3 text-slate-700'/>
        </div>
        <button
          type="submit"
          className='px-4 py-2 w-4/5 max-w-sm border-slate-800 rounded-md bg-blue-400 text-white font-bold'
        >
          go
        </button>
      </form>

    </div>
  )
}

export default Home
