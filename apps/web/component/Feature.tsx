import React from 'react'
import { Pencil,Users,Zap } from 'lucide-react'
function Feature() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
         <h3 className="text-4xl md:text-5xl font-black text-center mb-16" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
           Why Excalidraw?
         </h3>

         <div className="grid md:grid-cols-3 gap-8">
           {[
             {
               icon: <Pencil className="w-8 h-8" />,
               color: '#fa5252',
               title: 'Hand-drawn Feel',
               desc: 'Create diagrams that feel personal and approachable'
             },
             {
               icon: <Users className="w-8 h-8" />,
               color: '#20c997',
               title: 'Real-time Collaboration',
               desc: 'Work together with your team in real-time'
             },
             {
               icon: <Zap className="w-8 h-8" />,
               color: '#6965db',
               title: 'Lightning Fast',
               desc: 'Infinite canvas with smooth performance'
             }
           ].map((feature, i) => (
             <div
               key={i}
               className="group bg-white p-8 rounded-3xl border-3 border-[#dee2e6] transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
               style={{ animation: `slideUp 0.6s ease-out ${i * 0.1}s both` }}
             >
               <div
                 className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-12"
                 style={{ backgroundColor: feature.color }}
               >
                 <div className="text-white">{feature.icon}</div>
               </div>
               <h4 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                 {feature.title}
               </h4>
               <p className="text-[#6c757d] text-lg leading-relaxed">
                 {feature.desc}
               </p>
             </div>
           ))}
         </div>
       </section>

  )
}

export default Feature