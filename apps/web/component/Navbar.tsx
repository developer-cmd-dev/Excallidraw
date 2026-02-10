import { Github,Pencil } from "lucide-react"

function Navbar() {
  return (
    <header className="relative z-10 px-6  py-6 flex items-center justify-between max-w-7xl mx-auto">
    <div className="flex items-center gap-3 group cursor-pointer ">
      {/* <div className="w-10 h-10 bg-[#6965db] rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
        <Pencil className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>Excalidraw</h1> */}
      <img src="./Logo.png" className="invert w-30" alt="" />
    </div>

    <nav className="hidden md:flex items-center gap-8">
      <a href="#" className="text-base hover:text-[#6965db] transition-colors relative group">
        Features
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6965db] transition-all group-hover:w-full"></span>
      </a>
      <a href="#" className="text-base hover:text-[#6965db] transition-colors relative group">
        Showcase
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6965db] transition-all group-hover:w-full"></span>
      </a>
      <a href="#" className="text-base hover:text-[#6965db] transition-colors relative group">
        About
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6965db] transition-all group-hover:w-full"></span>
      </a>
      <a href="#" className="flex items-center gap-2 text-base hover:text-[#6965db] transition-colors">
        <Github className="w-5 h-5" />
        GitHub
      </a>
    </nav>
  </header>
  )
}

export default Navbar