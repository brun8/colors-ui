import type { NextPage } from 'next'
import { BaseSyntheticEvent, useRef } from 'react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault()
    router.push(`${inputRef.current?.value.toLowerCase()}`)
  }

  return (
    <div className='flex flex-col gap-2 items-center'>
      <div className='lg:mt-32 mt-12' />
      <form className='w-5/6 max-w-md flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <input type="text"
          className='bg-gray-700 focus:bg-gray-600 w-full
            rounded-md
            outline-blue-400
            px-4 py-2
          '
          ref={inputRef}
          placeholder='some-random-list'
          onInput={(e: BaseSyntheticEvent) => {
            const str: string = e.target.value
            const cursor: number = e.target.selectionStart
            e.target.value = str.replaceAll(' ', '-').replaceAll(/\W/g, '')
            e.target.selectionStart = cursor
            e.target.selectionEnd = cursor
          }}
        />
        <button
          type='submit'
          className='px-4 py-2 w-4/5 mx-auto
            bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600
            rounded-md font-bold
            text-white
          '
        >
          go
        </button>
      </form>
    </div>
  )
}

export default Home
