import { useRouter } from "next/router"


export default function ListPage() {
  const router = useRouter()

  const slug = router.query.slug as string
  return (
    <div className="flex flex-col flex-1 lg:gap-16 gap-8 items-center">
      <div className="mt-12"/>

      <h1 className="font-bold text-2xl">
        {slug}
      </h1>

      <div className="w-full max-w-lg">
        <div className="h-32 bg-red-300"/>
        <div className="h-32 bg-green-300"/>
        <div className="h-32 bg-blue-300"/>
      </div>
    </div>
  )
}
