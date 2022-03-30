import { GetServerSidePropsContext } from 'next'
import axios from "axios"

import ColorBanner from 'components/ColorBanner'

type Color = {
  id: number,
  code: string
}

type List = {
  slug: string
  colors: Color[]
}

type ColorListProps = {
  list: List
}

export default function ColorList({ list }: ColorListProps) {
  return (
    <div className="flex flex-col gap-16 items-center p-24 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl">
        {list?.slug}
      </h1>
      <div className="flex flex-col w-full">
        {list.colors?.map((color) => (
          <ColorBanner key={color.id} code={color.code} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {slug} = context.query

  const {data} = await axios.get(`http://localhost:3000/lists/${slug}`)

  return {
    props: {
      list: data
    }
  }
}
