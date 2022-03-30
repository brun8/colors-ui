type Color = {
  code: string
}

export default function ColorBanner({ code }: Color) {
  return (
    <div
      className="h-24 text-center flex items-center justify-center cursor-pointer w-full"
      onClick={() => {
        navigator.clipboard.writeText(code)
          .then(() => {
            console.log('Copied hex code to clipboard')
          })
      }}
      style={{backgroundColor: code}}
    >
      <p className="bg-white px-2">
        {code}
      </p>
    </div>
  )
}
