import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { sb } from 'services/supabase'
import Loading from "components/Loading"
import ColorBanner from "components/ColorBanner"
import StaticColorBanner from "components/StaticColorBanner"
import DialogModal from "components/DialogModal"
import Head from "next/head"


export default function ListPage() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [serverColors, setServerColors] = useState<string[]>([]);
  const [clientColors, setClientColors] = useState<string[]>([]);
  const [clearListModal, setClearListModal] = useState(false);

  const router = useRouter()
  const slug = router.query.slug as string

  useEffect(() => {
    async function fetchColors() {
      const {data} = await sb
        .from('lists')
        .select('colors')
        .eq('slug', slug)
        .single()

      if (data) {
        setServerColors(data.colors)
      } else {
        await sb.from('lists').insert({slug: slug, colors: []})
      }

      setLoading(false)
    }

    if (slug) {
      fetchColors()

      const subscription = sb
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

  function updateColor(index: number, color:string) {
    clientColors[index] = color
    setClientColors(clientColors)
  }

  function clearList() {
    setClientColors([])
  }

  async function saveList() {
    setUploading(true)
    const { status } = await sb
      .from('lists')
      .update({ colors: serverColors.concat(clientColors) })
      .match({ slug: slug })

    if (status === 200) {
      setClientColors([])
    }

    setUploading(false)
  }

  return (
    <div className="flex flex-col lg:gap-16 gap-8 items-center flex-1">
      <Head>
        <title>
          {slug} - Colors
        </title>
      </Head>
      <div className="mt-12"/>

      <h1 className="font-bold text-2xl" onClick={() => console.log(clientColors)}>
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
                <StaticColorBanner key={index} color={color} />
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
                  <ColorBanner
                    key={index}
                    index={index}
                    color={color}
                    onUpdate={updateColor}
                  />
                ))}
              </div>

            </>
          }
          <div className="flex flex-col gap-6 w-full">
            <button
              type="button"
              className="
                flex-1 text-center
                inline-flex items-center justify-center
                px-4 py-2 border border-green-500
                shadow-sm text-sm font-medium
                rounded-md text-gray-800 bg-green-400 hover:bg-green-500
                focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500
              "
              onClick={addColor}
            >
              Add
            </button>

            { clientColors.length !== 0 &&
              <div className="flex flex-wrap gap-4">
                <DialogModal
                  isOpen={clearListModal}
                  onClose={() => setClearListModal(false)}
                  title="Clear list?"
                  onConfirm={clearList}
                />

                <button
                  type="button"
                  className="
                    flex-1
                    inline-flex items-center justify-center
                    px-4 py-2 border border-transparent
                    text-sm font-medium rounded-md text-indigo-700
                    bg-indigo-100 hover:bg-indigo-200 focus:outline-none
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  "
                  onClick={() => setClearListModal(true)}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="
                    flex-1
                    inline-flex items-center justify-center
                    px-3 py-2
                    border border-transparent
                    text-sm leading-4
                    font-medium rounded-md shadow-sm
                    text-white bg-indigo-600 hover:bg-indigo-700
                    focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-indigo-500
                  "
                  onClick={saveList}
                >
                { uploading ?
                  <Loading />
                  :
                  <>Save</>
                }
                </button>
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}
