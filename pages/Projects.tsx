
import React, { useState, useContext, useEffect } from 'react';
import { MOCK_PROJECTS, SCHOOL_NAME } from '../constants';
import { fetchProjectCategories } from '../services/api';
import { ArrowUpRight, Layers, Tag, LayoutGrid, ChevronRight } from 'lucide-react';
import { LevelContext } from '../App';
import { EducationLevel } from '../types';
import { Link } from 'react-router-dom';
import { useLevelConfig } from '../hooks/useLevelConfig';

const Projects: React.FC = () => {
  const { activeLevel } = useContext(LevelContext);
  const LEVEL_CONFIG = useLevelConfig();
  const [subFilter, setSubFilter] = useState<EducationLevel | 'SEMUA'>('SEMUA');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [categories, setCategories] = useState<string[]>(['Semua']);
  const [catLoading, setCatLoading] = useState(true);
  const theme = LEVEL_CONFIG[activeLevel];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchProjectCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading project categories:', error);
      } finally {
        setCatLoading(false);
      }
    };
    loadCategories();
  }, []);

  const effectiveLevelFilter = activeLevel !== 'UMUM' ? activeLevel : subFilter;

  const filteredProjects = MOCK_PROJECTS.filter(project => {
    const matchesLevel = effectiveLevelFilter === 'SEMUA' || project.jenjang === effectiveLevelFilter;
    const matchesCategory = activeCategory === 'Semua' || project.category === activeCategory;
    return matchesLevel && matchesCategory;
  });

  const filterOptions: (EducationLevel | 'SEMUA')[] = ['SEMUA', 'MI', 'SMP', 'SMA', 'KAMPUS'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-1 bg-islamic-gold-500 rounded-full`}></div>
          <span className={`text-xs font-black uppercase tracking-[0.3em] ${theme.text}`}>Inovasi & Riset</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Galeri Projek</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
          Kumpulan inovasi kreatif santri {activeLevel === 'UMUM' ? SCHOOL_NAME : theme.name} dalam menjawab tantangan masa depan.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Kategori */}
        <aside className="lg:w-72 flex-shrink-0 space-y-8">
          {/* Level Filter (Hanya di mode UMUM) */}
          {activeLevel === 'UMUM' && (
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Filter Jenjang
              </h3>
              <div className="flex flex-col gap-1">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSubFilter(opt)}
                    className={`text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex justify-between items-center ${subFilter === opt ? 'bg-slate-900 text-white shadow-lg shadow-black/10' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                  >
                    {opt}
                    {subFilter === opt && <ChevronRight className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Kategori Sidebar */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-28">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Tag className="w-3 h-3" /> Kategori Bidang
            </h3>
            <div className="space-y-2">
              {catLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                </div>
              ) : (
                categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-between border ${activeCategory === cat
                      ? 'bg-islamic-gold-500 text-white border-transparent shadow-xl shadow-islamic-gold-100'
                      : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50 hover:border-slate-100'
                      }`}
                  >
                    {cat}
                    {activeCategory === cat && <LayoutGrid className="w-4 h-4" />}
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Grid Konten */}
        <div className="flex-1">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map(project => {
                const projectTheme = LEVEL_CONFIG[project.jenjang];
                return (
                  <Link to={`/projek/${project.id}`} key={project.id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group">
                    <div className="relative h-60 overflow-hidden">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <div className={`${projectTheme.bg} text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                          {project.jenjang}
                        </div>
                        <div className="bg-white/95 backdrop-blur-sm text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/50 shadow-sm">
                          {project.category}
                        </div>
                      </div>
                    </div>
                    <div className="p-10 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{project.date}</span>
                        <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-islamic-gold-600 transition-colors">{project.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="pt-6 border-t border-slate-50 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${projectTheme.bg} flex items-center justify-center text-[10px] font-black text-white shadow-lg`}>
                          {project.author.substring(0, 2)}
                        </div>
                        <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">{project.author}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
              <LayoutGrid className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Belum ada projek ditemukan</p>
              <button onClick={() => { setActiveCategory('Semua'); setSubFilter('SEMUA'); }} className="mt-8 text-islamic-gold-500 font-black text-xs uppercase tracking-widest hover:underline">Reset Semua Filter</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
