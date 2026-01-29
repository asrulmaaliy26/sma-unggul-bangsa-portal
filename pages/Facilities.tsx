
import React, { useState, useContext } from 'react';
import { MOCK_FACILITIES, SCHOOL_NAME } from '../constants';
import { Layout, Zap, Layers, MapPin, ChevronRight, Search } from 'lucide-react';
import { LevelContext } from '../App';
import { EducationLevel } from '../types';
import { useLevelConfig } from '../hooks/useLevelConfig';

const Facilities: React.FC = () => {
  const { activeLevel } = useContext(LevelContext);
  const LEVEL_CONFIG = useLevelConfig();
  const [activeTab, setActiveTab] = useState<'Ruang' | 'Ekstra'>('Ruang');
  const [subFilter, setSubFilter] = useState<EducationLevel | 'SEMUA'>('SEMUA');

  const theme = LEVEL_CONFIG[activeLevel];

  const effectiveJenjangFilter = activeLevel !== 'UMUM' ? activeLevel : subFilter;

  const filtered = MOCK_FACILITIES.filter(f => {
    const matchesTab = f.type === activeTab;
    const matchesJenjang = effectiveJenjangFilter === 'SEMUA' || f.jenjang === effectiveJenjangFilter;
    return matchesTab && matchesJenjang;
  });

  const filterOptions: (EducationLevel | 'SEMUA')[] = ['SEMUA', 'MI', 'SMP', 'SMA', 'KAMPUS'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-1 bg-islamic-gold-500 rounded-full`}></div>
          <span className={`text-xs font-black uppercase tracking-[0.3em] ${theme.text}`}>Eksplorasi Kampus</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Sarana & Ekstra</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
          Dukungan fasilitas terbaik untuk menunjang kenyamanan belajar dan pengembangan bakat santri di lingkungan {activeLevel === 'UMUM' ? SCHOOL_NAME : theme.name}.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Kategori */}
        <aside className="lg:w-72 flex-shrink-0 space-y-8">
          {/* Tipe Fasilitas */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Layout className="w-3 h-3" /> Jenis Layanan
            </h3>
            <div className="space-y-2">
              {[
                { id: 'Ruang', name: 'Fasilitas Ruang', icon: Layout },
                { id: 'Ekstra', name: 'Ekstrakurikuler', icon: Zap }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-between border ${activeTab === tab.id
                      ? `${theme.bg} text-white border-transparent shadow-xl shadow-black/10`
                      : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50 hover:border-slate-100'
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <tab.icon className="w-4 h-4" /> {tab.name}
                  </span>
                  {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter (Hanya di mode UMUM) */}
          {activeLevel === 'UMUM' && (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-28">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Jenjang Pendidikan
              </h3>
              <div className="space-y-1">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSubFilter(opt)}
                    className={`w-full text-left px-5 py-3 rounded-xl text-xs font-black transition-all flex justify-between items-center ${subFilter === opt ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                  >
                    {opt}
                    {subFilter === opt && <ChevronRight className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Galeri Fasilitas */}
        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map(facility => {
                const facilityTheme = LEVEL_CONFIG[facility.jenjang];
                return (
                  <div key={facility.id} className="group relative rounded-[3.5rem] overflow-hidden bg-white shadow-sm border border-slate-100 h-[500px]">
                    <img
                      src={facility.imageUrl}
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-12 flex flex-col justify-end opacity-95 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`${facilityTheme.bg} text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                          {facility.jenjang}
                        </div>
                        <div className="bg-white/10 backdrop-blur-md text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                          {facility.type}
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-4 leading-tight">{facility.name}</h3>
                      <p className="text-slate-200 font-medium max-w-md text-sm leading-relaxed mb-8 line-clamp-3">
                        {facility.description}
                      </p>
                      <div className="flex items-center gap-2 text-islamic-gold-500 font-black text-[10px] uppercase tracking-[0.3em]">
                        <MapPin className="w-4 h-4" /> Area Kampus Terintegrasi
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
              <Layout className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Belum ada data fasilitas ditemukan</p>
              <button onClick={() => { setSubFilter('SEMUA'); setActiveTab('Ruang'); }} className="mt-8 text-islamic-green-600 font-black text-xs uppercase tracking-widest hover:underline">Reset Semua Filter</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
