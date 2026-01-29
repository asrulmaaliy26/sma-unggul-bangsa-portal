
import React, { useState, useContext, useEffect } from 'react';
import { MOCK_FACILITIES, SCHOOL_NAME } from '../constants'; // Fallback
import { fetchFacilities } from '../services/api';
import { Layout, Zap, Layers, MapPin, ChevronRight, Search } from 'lucide-react';
import { LevelContext } from '../App';
import { EducationLevel, Facility } from '../types';
import { useLevelConfig } from '../hooks/useLevelConfig';
import Pagination from '../components/Pagination';

const Facilities: React.FC = () => {
  const { activeLevel } = useContext(LevelContext);
  const LEVEL_CONFIG = useLevelConfig();
  const [subFilter, setSubFilter] = useState<EducationLevel | 'SEMUA'>('SEMUA');
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const theme = LEVEL_CONFIG[activeLevel];

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFacilities();
        setFacilities(data);
      } catch (error) {
        console.error('Error loading facilities:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [subFilter, activeLevel]);

  const effectiveJenjangFilter = activeLevel !== 'UMUM' ? activeLevel : subFilter;

  const filtered = facilities.filter(f => {
    const matchesJenjang = effectiveJenjangFilter === 'SEMUA' || f.jenjang === effectiveJenjangFilter;
    return matchesJenjang;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedFacilities = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate filter options dynamically from API config
  const filterOptions = React.useMemo(() => {
    const levels = Object.keys(LEVEL_CONFIG).filter(key => key !== 'UMUM') as EducationLevel[];
    return ['SEMUA', ...levels] as (EducationLevel | 'SEMUA')[];
  }, [LEVEL_CONFIG]);

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
          {/* Level Filter (Hanya di mode UMUM) */}
          {activeLevel === 'UMUM' && (
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
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
                    {opt === 'SEMUA' ? 'Semua Jenjang' : LEVEL_CONFIG[opt]?.name || opt}
                    {subFilter === opt && <ChevronRight className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Galeri Fasilitas */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-6"></div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Memuat fasilitas...</p>
            </div>
          ) : filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paginatedFacilities.map(facility => {
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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                themeColor={theme.bg}
              />
            </>
          ) : (
            <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
              <Layout className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Belum ada data fasilitas ditemukan</p>
              <button onClick={() => { setSubFilter('SEMUA'); }} className="mt-8 text-islamic-green-600 font-black text-xs uppercase tracking-widest hover:underline">Reset Semua Filter</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
