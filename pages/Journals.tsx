

import React, { useState, useContext, useEffect } from 'react';
import { MOCK_JOURNALS } from '../constants'; // Fallback
import { fetchJournalCategories, fetchJournals } from '../services/api';
import { FileText, User, GraduationCap, Star, Download, Layers, BookOpen, Trophy, Tag, ChevronRight } from 'lucide-react';
import { LevelContext } from '../App';
import { EducationLevel, JournalItem } from '../types';
import { Link } from 'react-router-dom';
import { useLevelConfig } from '../hooks/useLevelConfig';

const Journals: React.FC = () => {
  const { activeLevel } = useContext(LevelContext);
  const LEVEL_CONFIG = useLevelConfig();
  const [subFilter, setSubFilter] = useState<EducationLevel | 'SEMUA'>('SEMUA');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [categories, setCategories] = useState<string[]>(['Semua']);
  const [journals, setJournals] = useState<JournalItem[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catsData, journalsData] = await Promise.all([
          fetchJournalCategories(),
          fetchJournals()
        ]);
        setCategories(catsData);
        setJournals(journalsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setCatLoading(false);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const effectiveLevelFilter = activeLevel !== 'UMUM' ? activeLevel : subFilter;

  // Unused helper function but updating for consistency if needed in future
  const getBestByLevel = (level: EducationLevel): JournalItem | undefined => {
    const levelJournals = journals.filter(j => j.jenjang === level);
    if (levelJournals.length === 0) return undefined;
    const best = levelJournals.find(j => j.isBest);
    return best || [...levelJournals].sort((a, b) => b.score - a.score)[0];
  };

  // Generate filter options dynamically from API config
  const filterOptions = React.useMemo(() => {
    const levels = Object.keys(LEVEL_CONFIG).filter(key => key !== 'UMUM') as EducationLevel[];
    return ['SEMUA', ...levels] as (EducationLevel | 'SEMUA')[];
  }, [LEVEL_CONFIG]);

  const filteredJournals = journals.filter(journal => {
    const matchesLevel = effectiveLevelFilter === 'SEMUA' || journal.jenjang === effectiveLevelFilter;
    const matchesCategory = activeCategory === 'Semua' || journal.category === activeCategory;
    return matchesLevel && matchesCategory;
  });

  const JournalCard = ({ journal }: { journal: JournalItem, key?: any }) => {
    const journalTheme = LEVEL_CONFIG[journal.jenjang];
    return (
      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-3/4">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className={`${journalTheme.bg} text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                {journal.jenjang}
              </div>
              <div className="bg-slate-100 text-slate-500 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                {journal.category}
              </div>
              {journal.isBest && (
                <div className="flex items-center bg-islamic-gold-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg shadow-islamic-gold-500/20">
                  <Star className="w-3 h-3 mr-2 fill-white" /> Jurnal Terbaik
                </div>
              )}
              <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest ml-auto">{journal.date}</span>
            </div>
            <Link to={`/jurnal/${journal.id}`}>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight group-hover:text-islamic-green-700 transition-colors">{journal.title}</h2>
            </Link>
            <div className="bg-slate-50 p-8 rounded-[2rem] mb-10 border border-slate-100/50">
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-4">Abstrak Penelitian</p>
              <p className="text-slate-600 leading-relaxed text-sm italic line-clamp-2">
                "{journal.abstract}"
              </p>
            </div>
            <div className="flex flex-wrap gap-8 text-sm">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-2xl ${journalTheme.bg} text-white flex items-center justify-center shadow-lg shadow-black/5`}><User className="w-5 h-5" /></div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Peneliti</p>
                  <p className="font-black text-slate-900 text-xs">{journal.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center"><GraduationCap className="w-5 h-5" /></div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mentor</p>
                  <p className="font-bold text-slate-600 text-xs">{journal.mentor}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-10 md:pt-0">
            <div className="text-center mb-8">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">Nilai Riset</p>
              <div className={`text-6xl font-black ${journalTheme.text}`}>{journal.score}</div>
            </div>
            <button className={`flex items-center gap-3 ${journalTheme.bg} text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all w-full justify-center shadow-xl shadow-black/5`}>
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <Link to={`/jurnal/${journal.id}`} className="mt-6 text-slate-400 font-black text-[10px] hover:text-slate-900 flex items-center gap-2 uppercase tracking-[0.2em]">
              <BookOpen className="w-4 h-4" /> Detail
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <header className="mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-1 bg-islamic-gold-500 rounded-full"></div>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-islamic-green-600">Publikasi Akademik</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">Jurnal Ilmiah</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed font-medium">
          Media publikasi hasil riset mandiri dan karya tulis ilmiah civitas akademika Unggul Bangsa.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Kategori */}
        <aside className="lg:w-72 flex-shrink-0 space-y-8">
          {activeLevel === 'UMUM' && (
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers className="w-3 h-3" /> Jenjang Institusi
              </h3>
              <div className="space-y-1">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSubFilter(opt)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex justify-between items-center ${subFilter === opt ? 'bg-islamic-green-700 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                      }`}
                  >
                    {opt === 'SEMUA' ? 'Semua Jenjang' : LEVEL_CONFIG[opt]?.name || opt}
                    {subFilter === opt && <ChevronRight className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 sticky top-28">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Tag className="w-3 h-3" /> Bidang Kajian
            </h3>
            <div className="space-y-2">
              {catLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-islamic-green-800"></div>
                </div>
              ) : (
                categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-between border ${activeCategory === cat
                      ? 'bg-islamic-green-800 text-white border-transparent shadow-2xl shadow-islamic-green-100'
                      : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50 hover:border-slate-100'
                      }`}
                  >
                    {cat}
                    {activeCategory === cat && <BookOpen className="w-4 h-4" />}
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* List Jurnal */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-6"></div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Memuat jurnal...</p>
            </div>
          ) : filteredJournals.length > 0 ? (
            <div className="space-y-10">
              {filteredJournals.map(journal => (
                <JournalCard key={journal.id} journal={journal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
              <FileText className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Jurnal tidak ditemukan</p>
              <button onClick={() => { setActiveCategory('Semua'); setSubFilter('SEMUA'); }} className="mt-8 text-islamic-green-600 font-black text-xs uppercase tracking-widest hover:underline">Reset Filter</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journals;
