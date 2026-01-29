
import React, { useContext, useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import { MOCK_JOURNALS } from '../constants';
import { ArrowRight, BookOpen, Newspaper, Lightbulb, Star, Users, GraduationCap, Building, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LevelContext } from '../App';
import { Slide, Stat, NewsItem } from '../types';
import { fetchHomeData, fetchNews } from '../services/api';
import { useLevelConfig } from '../hooks/useLevelConfig';

const Home: React.FC = () => {
  const { activeLevel } = useContext(LevelContext);
  const LEVEL_CONFIG = useLevelConfig();
  const theme = LEVEL_CONFIG[activeLevel];
  const [allStats, setAllStats] = useState<Record<string, Stat[]>>({});
  const [slides, setSlides] = useState<Slide[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [homeData, newsData] = await Promise.all([
          fetchHomeData(),
          fetchNews()
        ]);
        setAllStats(homeData.stats);
        setSlides(homeData.slides);
        setNews(newsData);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  // Filtering data berdasarkan level
  const newsList = activeLevel === 'UMUM' ? news : news.filter(n => n.jenjang === activeLevel);
  // const projectList = activeLevel === 'UMUM' ? MOCK_PROJECTS : MOCK_PROJECTS.filter(p => p.jenjang === activeLevel);
  const journalList = activeLevel === 'UMUM' ? MOCK_JOURNALS : MOCK_JOURNALS.filter(j => j.jenjang === activeLevel);

  // Logic untuk memilih stats berdasarkan activeLevel
  const currentStats = React.useMemo(() => {
    // Mapping level aplikasi ke key API stats
    let key = activeLevel as string;
    if (activeLevel === 'SMA') key = 'MA';

    return allStats[key] || [];
  }, [allStats, activeLevel]);

  const topJournal = journalList.find(j => j.isBest) || journalList[0];

  const getStatIcon = (label: string) => {
    if (label.includes('Murid')) return <Users className={`w-6 h-6 ${theme.text}`} />;
    if (label.includes('Guru')) return <GraduationCap className={`w-6 h-6 ${theme.text}`} />;
    if (label.includes('Kelas') || label.includes('Gedung')) return <Building className={`w-6 h-6 ${theme.text}`} />;
    return <CheckCircle2 className={`w-6 h-6 ${theme.text}`} />;
  };

  return (
    <div className="space-y-20 pb-20">
      <Carousel slides={slides} />

      {/* Islamic Welcome & Statistics */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-50">
          <div className="text-center mb-12">
            <p className={`arabic-text text-3xl ${theme.text} mb-2`}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Ahlan wa Sahlan di {theme.name}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-4 text-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
              </div>
            ) : (
              currentStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    {getStatIcon(stat.label)}
                  </div>
                  <p className={`text-3xl font-black ${theme.text} mb-1`}>{stat.value}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className={`inline-flex items-center gap-2 bg-slate-50 ${theme.text} px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-6`}>
              <Star className={`w-4 h-4 fill-current`} /> Profil Institusi
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.1]">
              Membangun Peradaban dari <span className={theme.text}>Pendidikan Qurani</span>.
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-10">
              Integrasi kurikulum modern dengan nilai-nilai luhur keislaman untuk mencetak generasi yang cerdas akal dan mulia akhlak.
            </p>

            <Link to="/tentang/profil" className={`inline-flex items-center gap-3 ${theme.bg} text-white px-8 py-4 rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl group`}>
              Detail Profil <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9" alt="Pendidikan" className="w-full h-full object-cover min-h-[500px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className={`${theme.bg} py-24 relative overflow-hidden transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h3 className="text-white/60 font-black uppercase tracking-[0.3em] text-xs mb-4">Warta Terkini</h3>
              <h2 className="text-4xl font-black text-white leading-tight">Berita & Agenda {activeLevel}</h2>
            </div>
            <Link to="/berita" className="bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2">
              Buka Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {newsList.slice(0, 3).map(news => (
              <Link to={`/berita/${news.id}`} key={news.id} className="bg-white rounded-[2.5rem] overflow-hidden hover:-translate-y-3 transition-all duration-500 group border border-white/5">
                <div className="relative h-64 overflow-hidden">
                  <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute top-6 left-6 ${theme.bg} text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                    {news.jenjang}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-black text-slate-900 mb-4 line-clamp-2 hover:text-islamic-gold-500 transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                    {news.excerpt}
                  </p>
                  <span className={`${theme.text} font-bold text-sm flex items-center gap-2`}>
                    Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]"></div>
      </section>

      {/* Best Journal Section */}
      {topJournal && (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-slate-50 rounded-[3rem] p-16 border border-slate-100 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="bg-islamic-gold-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase mb-8 w-fit shadow-xl shadow-islamic-gold-100">Jurnal Akademik Terbaik ({topJournal.jenjang})</div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">{topJournal.title}</h2>
              <p className="text-slate-500 italic text-xl mb-10">"{topJournal.abstract}"</p>
              <Link to={`/jurnal/${topJournal.id}`} className={`${theme.bg} text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-black/10 inline-block`}>Baca Hasil Riset</Link>
            </div>
            <div className="lg:w-1/2">
              <div className="aspect-video bg-white rounded-[3rem] shadow-2xl p-10 border border-slate-50 flex flex-col justify-center">
                <div className="flex items-center gap-6 mb-8">
                  <div className={`w-16 h-16 ${theme.bg} rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-black/10`}>{topJournal.score}</div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Skor Penilaian</p>
                    <p className="text-xl font-black text-slate-800">Excellent Research</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-b border-slate-50">
                    <span className="text-sm font-bold text-slate-400">Penulis Utama</span>
                    <span className="text-sm font-black text-slate-800">{topJournal.author}</span>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="text-sm font-bold text-slate-400">Dosen/Guru Pembimbing</span>
                    <span className="text-sm font-black text-slate-800">{topJournal.mentor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
