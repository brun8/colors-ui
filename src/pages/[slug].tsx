import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {HiPlus} from 'react-icons/hi'

import { supabase } from 'services/supabase'
import Loading from "components/Loading";


export default function ListPage() {
  const [loading, setLoading] = useState(true);
  const [serverColors, setServerColors] = useState<string[]>([]);
  const [clientColors, setClientColors] = useState<string[]>([]);

  const router = useRouter()
  const slug = router.query.slug as string

  useEffect(() => {
    async function fetchColors() {
      const {status, data} = await supabase
        .from('lists')
        .select('colors')
        .eq('slug', slug)
        .single()

      console.log(data, status)
      if (data) {
        setServerColors(data.colors)
      } else {
        const {status} = await supabase.from('lists').insert({slug: slug, colors: []})
        console.log(status)
      }

      setLoading(false)
    }

    if (slug) {
      fetchColors()

      const subscription = supabase
        .from(`lists:slug=eq.${slug}`)
        .on('*', payload => {
          setLoading(true)
          setServerColors(payload.new.colors)
          setLoading(false)
        })
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [slug])

  function addColor() {
    setClientColors(clientColors.concat('#111'))
  }

  async function saveList() {
    const { status } = await supabase
      .from('lists')
      .update({ colors: serverColors.concat(clientColors) })
      .match({ slug: slug })

    if (status === 200) {
      setClientColors([])
    }
  }

  return (
    <div className="flex flex-col lg:gap-16 gap-8 items-center flex-1">
      <div className="mt-12"/>

      <h1 className="font-bold text-2xl">
        {slug}
      </h1>

      { loading ?
        <div className="mx-auto inline-flex items-center justify-center">
          <Loading />
        </div>
        :
        <div className="flex flex-col items-center lg:gap-16 gap-8 w-full max-w-lg relative flex-1 h-full pb-24">
          <div className="w-full max-w-lg">
            { serverColors.length !== 0 ?
              serverColors.map((color, index) => (
                <div key={index} className="h-32" style={{backgroundColor: color}}/>
              ))
              :
              <div className="text-center text-lg font-semibold">list empty</div>
            }
          </div>
          { clientColors.length !== 0 &&
            <>
              <hr className="border-t border-gray-400 w-full" />
              <div className="w-full max-w-lg">
                {clientColors.map((color, index) => (
                  <div key={index} className="h-32" style={{backgroundColor: color}}/>
                ))}
              </div>
              <div
                className="
                  px-4 py-2 w-4/5 mx-auto
                  bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600
                  rounded-md font-bold
                  text-white
                  text-center
                "
                onClick={saveList}
              >
                save
              </div>
            </>
          }
          <div
            className="
              w-12 h-12 rounded-full
              flex justify-center items-center
              bg-green-400
              text-gray-800
              absolute right-10 bottom-10
            "
            onClick={addColor}
          >
            <HiPlus size={24}/>
          </div>

        </div>
      }
    </div>
  )
}
