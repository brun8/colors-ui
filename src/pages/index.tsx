import type { NextPage } from 'next'
import { GoSearch } from 'react-icons/go'

const Home: NextPage = () => {
  function parseInput(e: any) {

  }

  return (
    <div className='flex flex-col items-center h-screen p-8 bg-background-200'>
      <div className='flex flex-col gap-10 items-center'>
        <h1>
          Logo
        </h1>
        <div className='flex gap-4 justify-around bg-background-100'>
          <div className='relative'>
            <input
              type="text"
              className='flex-1 px-10 py-2 h-auto bg-transparent border-b-2 outline-0 border-blue-400 focus:border-red-400 transition-colors ease-in-out duration-500'
              placeholder='page-name'
              onChange={parseInput}
            />
            <GoSearch className='absolute left-2 top-3'/>
            <button className='border-0 '>
              clear
            </button>
          </div>

          <button className='py-2 px-4 bg-blue-400 text-white rounded-md'>
            go
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
