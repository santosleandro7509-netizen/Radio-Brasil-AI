
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import RadioPlayer from './components/RadioPlayer';
import GeminiAssistant from './components/GeminiAssistant';
import { STATIONS } from './constants';
import { Station } from './types';

const App: React.FC = () => {
  const [currentStation, setCurrentStation] = useState<Station | null>(STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'music' | 'favorites'>('all');
  const [lastFavoritedId, setLastFavoritedId] = useState<string | null>(null);
  
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('radio-brasil-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem('radio-brasil-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle station card scroll
  useEffect(() => {
    if (currentStation) {
      const element = document.getElementById(`station-card-${currentStation.id}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 100);
      }
    }
  }, [currentStation?.id]);

  const toggleFavorite = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    // Set for animation
    setLastFavoritedId(id);
    // Clear animation class after it finishes
    setTimeout(() => setLastFavoritedId(null), 500);

    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  }, []);

  const filteredStations = STATIONS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'favorites') return matchesSearch && favorites.includes(s.id);
    if (activeTab === 'news') return matchesSearch && (s.genre.includes('Notícias') || s.genre.includes('News'));
    if (activeTab === 'music') return matchesSearch && !s.genre.includes('Notícias');
    return matchesSearch;
  });

  const selectStation = (station: Station) => {
    if (currentStation?.id === station.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentStation(station);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen pb-40 flex flex-col bg-zinc-950">
      <Header />

      <main className="flex-1 px-6 md:px-12 mt-4 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] brasil-gradient p-12 mb-12 min-h-[340px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M47.5,-52.1C60.4,-44.7,68.8,-28.3,71.1,-11.1C73.4,6.2,69.5,24.2,59.3,37.1C49.1,50.1,32.6,58,15.6,61.8C-1.4,65.6,-18.9,65.2,-33.4,57.7C-47.9,50.1,-59.5,35.4,-64.5,18.8C-69.5,2.1,-67.9,-16.5,-59.1,-30.9C-50.3,-45.3,-34.4,-55.6,-18.4,-59.5C-2.4,-63.5,13.8,-61.2,47.5,-52.1Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-xl">
            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-widest border border-white/20 mb-6 inline-block">
              Inteligência Brasileira
            </span>
            <h2 className="text-4xl md:text-6xl font-outfit font-black text-white leading-[1.1] mb-4">
              A alma do Brasil em cada sintonia.
            </h2>
            <p className="text-white/80 text-lg max-w-md font-medium mb-8">
              Explore o melhor do rádio brasileiro com curadoria assistida por inteligência artificial.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => selectStation(STATIONS[Math.floor(Math.random() * STATIONS.length)])}
                className="bg-white text-black font-extrabold px-8 py-4 rounded-2xl hover:bg-zinc-100 transition-all flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95"
              >
                Sintonização Aleatória
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2 w-full md:max-w-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Buscar estação ou gênero..." 
                  className="bg-transparent border-none outline-none text-sm w-full py-1 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-x-auto no-scrollbar">
                {(['all', 'news', 'music', 'favorites'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap flex items-center gap-2 ${
                      activeTab === tab ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab === 'favorites' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${activeTab === 'favorites' ? 'text-red-500' : ''}`} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                    {tab === 'all' ? 'Todas' : tab === 'news' ? 'Notícias' : tab === 'music' ? 'Música' : 'Favoritas'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredStations.map((station) => (
                <div 
                  key={station.id}
                  id={`station-card-${station.id}`}
                  onClick={() => selectStation(station)}
                  className={`group relative glass rounded-3xl p-5 cursor-pointer transition-all hover:translate-y-[-4px] border border-white/5 hover:border-white/20 shadow-lg ${
                    currentStation?.id === station.id ? 'ring-2 ring-blue-500/50 bg-blue-500/5' : ''
                  }`}
                >
                  {/* Favorite Toggle Button */}
                  <button 
                    onClick={(e) => toggleFavorite(e, station.id)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5 hover:scale-110 active:scale-90 transition-all overflow-hidden"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 transition-all duration-300 ${
                        favorites.includes(station.id) 
                          ? 'text-red-500 fill-current favorite-pulse' 
                          : 'text-zinc-400 fill-none'
                      } ${lastFavoritedId === station.id ? 'animate-heart-pop' : ''}`} 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <img src={station.logo} alt={station.name} className="w-24 h-24 rounded-2xl object-cover shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
                      {currentStation?.id === station.id && isPlaying && (
                        <div className="absolute inset-0 bg-blue-600/40 rounded-2xl flex items-center justify-center backdrop-blur-[2px]">
                          <div className="flex items-end gap-1 h-8">
                            <div className="w-1 bg-white animate-[bounce_1s_infinite_0ms]"></div>
                            <div className="w-1 bg-white animate-[bounce_1s_infinite_200ms]"></div>
                            <div className="w-1 bg-white animate-[bounce_1s_infinite_400ms]"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md">
                          {station.genre}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium mr-8">{station.location}</span>
                      </div>
                      <h3 className="text-xl font-outfit font-bold mb-1">{station.name}</h3>
                      <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                        {station.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center">
                          <img src={`https://picsum.photos/seed/${station.id}${i}/32/32`} className="rounded-full w-full h-full" alt="User" />
                        </div>
                      ))}
                      <span className="ml-4 text-[10px] text-zinc-500 font-bold self-center">+{Math.floor(Math.random() * 500)} ouvindo</span>
                    </div>
                    <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStation?.id === station.id && isPlaying ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:bg-white group-hover:text-black'
                    }`}>
                      {currentStation?.id === station.id && isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredStations.length === 0 && (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-zinc-700">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-zinc-400 font-outfit font-bold text-lg">Nada por aqui...</h3>
                <p className="text-zinc-500 text-sm max-w-xs mt-2">
                  {activeTab === 'favorites' 
                    ? 'Você ainda não marcou nenhuma rádio como favorita. Explore nossas estações e clique no coração!' 
                    : 'Nenhuma rádio encontrada para sua busca.'}
                </p>
                {activeTab === 'favorites' && (
                  <button 
                    onClick={() => setActiveTab('all')}
                    className="mt-6 text-blue-400 font-bold text-sm hover:underline"
                  >
                    Ver todas as estações
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Assistant */}
          <aside className="lg:col-span-4 space-y-8">
            <GeminiAssistant currentStationName={currentStation?.name} />
            
            <div className="glass rounded-3xl p-6 bg-green-950/10 border-green-500/20">
              <h3 className="font-outfit font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-green-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></span>
                Curiosidade do Brasil
              </h3>
              <p className="text-zinc-400 text-sm italic leading-relaxed">
                Você sabia? O Samba foi reconhecido pela UNESCO como Patrimônio Cultural Imaterial da Humanidade em 2005. A Rádio Nacional foi a grande responsável por popularizar o gênero nos anos 40.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <RadioPlayer 
        currentStation={currentStation} 
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onVolumeChange={setVolume}
      />
    </div>
  );
};

export default App;
