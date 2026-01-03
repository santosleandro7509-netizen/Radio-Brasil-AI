
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 brasil-gradient rounded-xl shadow-lg shadow-green-900/20 flex items-center justify-center transform rotate-12">
          <span className="text-white font-black text-xl">B</span>
        </div>
        <h1 className="text-2xl font-outfit font-extrabold tracking-tight">
          Radio<span className="text-brasil">Brasil</span> <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">AI Edition</span>
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
        <a href="#" className="hover:text-white transition-colors">Estações</a>
        <a href="#" className="hover:text-white transition-colors">Podcasts</a>
        <a href="#" className="hover:text-white transition-colors">Sobre</a>
      </nav>
      
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-full bg-zinc-800 text-xs font-bold text-zinc-300 border border-zinc-700 hover:bg-zinc-700 transition-all">
          PT-BR
        </button>
      </div>
    </header>
  );
};

export default Header;
