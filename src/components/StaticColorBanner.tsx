export default function StaticColorBanner({ color }: { color: string }) {
  function handleCopy() {
    window.navigator.clipboard.writeText(color)
  }

  return (
    <div
      className="flex items-center justify-center h-32 relative"
      style={{backgroundColor: color}}
    >
      <div
        className="px-2 py-1 text-gray-900 bg-white text-center w-32 cursor-pointer"
        onClick={handleCopy}
      >
        {color}
      </div>
    </div>
  )
}
