import { Link, Routes, Route } from 'react-router-dom'

function Home()  { return <h2 className="text-2xl font-bold">Home</h2> }
function Works() { return <h2 className="text-2xl font-bold">Works</h2> }
function Reel()  { return <h2 className="text-2xl font-bold">Reel</h2> }
function Docs()  { return <h2 className="text-2xl font-bold">Docs</h2> }
function About() { return <h2 className="text-2xl font-bold">About</h2> }

export default function App() {
  return (
    <div className="mx-auto max-w-6xl p-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Nam Yul – Actor Portfolio</h1>
        <nav className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/works">Works</Link>
          <Link to="/reel">Reel</Link>
          <Link to="/docs">Docs</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/reel" element={<Reel />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer className="py-8 text-sm text-neutral-500">
        © {new Date().getFullYear()} Nam Yul
      </footer>
    </div>
  )
}
