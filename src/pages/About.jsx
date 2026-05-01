import React from 'react';
import { Diamond, Award, Users, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/src/assets/alex-chambers-TxCbfMc854c-unsplash.jpg" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Heritage" 
        />
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="relative z-10 text-center px-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-6 block">Since 1924</span>
          <h1 className="text-5xl md:text-7xl text-secondary uppercase tracking-tighter">Our Heritage</h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <Diamond className="text-accent mx-auto mb-12" size={32} />
          <h2 className="text-3xl md:text-4xl mb-10 leading-snug">
            A century of transforming the earth's rarest gifts into <span className="font-light italic">timeless legacies.</span>
          </h2>
          <div className="space-y-8 text-text-secondary leading-loose text-sm md:text-base text-justify md:text-center">
            <p>
              Founded in the heart of Florence in 1924, Maison Aurelius began as a small atelier dedicated to the art of hand-carving precious gemstones. Our founder, Alessandro Aurelius, believed that every stone possessed a unique soul that only the most patient hands could reveal.
            </p>
            <p>
              Today, three generations later, we remain a family-owned house, upholding the same rigorous standards of excellence. Every piece that bears the Aurelius hallmark has been meticulously scrutinized, ethically sourced, and hand-finished by master artisans who have spent decades perfecting their craft.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 bg-surface border-y border-border-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { icon: <Award size={32} />, title: "Excellence", desc: "We only use top-grade diamonds (D-F color, IF-VS1 clarity) and certified gemstones." },
            { icon: <Users size={32} />, title: "Craftsmanship", desc: "Our artisans combine age-old techniques with modern precision to create masterpieces." },
            { icon: <Globe size={32} />, title: "Responsibility", desc: "100% of our materials are ethically sourced through the Kimberley Process and RJC standards." }
          ].map((value, i) => (
            <div key={i} className="text-center group">
              <div className="text-accent mb-8 flex justify-center transition-transform duration-500 group-hover:scale-110">{value.icon}</div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">{value.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed max-w-xs mx-auto">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Gallery Split */}
      <section className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 overflow-hidden relative group">
          <img 
            src="/src/assets/kateryna-hliznitsova-P6NiFTyI294-unsplash.jpg" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            alt="Craft" 
          />
          <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-all flex items-center justify-center">
            <span className="text-secondary text-[10px] uppercase tracking-[0.5em] font-bold border-y border-secondary/40 py-4 px-8 opacity-0 group-hover:opacity-100 transition-opacity">The Atelier</span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative group">
          <img 
            src="/src/assets/nataliya-melnychuk-oO0JAOJhquk-unsplash.jpg" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            alt="Design" 
          />
          <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-all flex items-center justify-center">
            <span className="text-secondary text-[10px] uppercase tracking-[0.5em] font-bold border-y border-secondary/40 py-4 px-8 opacity-0 group-hover:opacity-100 transition-opacity">The Design Lab</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
