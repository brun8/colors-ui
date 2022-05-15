import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { supabase } from 'services/supabase'

export default function ListPage() {
  const [loading, setLoading] = useState(true);
  const [serverColors, setServerColors] = useState<string[]>([]);

  const router = useRouter()
  const slug = router.query.slug as string

  console.log(supabase.getSubscriptions())

  useEffect(() => {
    async function fetchColors() {
      const {data, error} = await supabase
        .from('lists')
        .select('colors')
        .eq('slug', slug)
        .single()

      if (data) {
        setServerColors(data.colors)
        setLoading(false)
      }
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

      console.log(subscription)
      return () => {
        subscription.unsubscribe()
      }
    }
  }, [slug])

  return (
    <div className="flex flex-col flex-1 lg:gap-16 gap-8 items-center">
      <div className="mt-12"/>

      <h1 className="font-bold text-2xl">
        {slug}
      </h1>

      <div className="w-full max-w-lg">
        {serverColors.map((color, index) => (
          <div key={index} className="h-32" style={{backgroundColor: color}}/>
        ))}
      </div>
    </div>
  )
}
