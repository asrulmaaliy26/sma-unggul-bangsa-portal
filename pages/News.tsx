

import React, { useState, useContext, useEffect } from 'react';
import { MOCK_NEWS } from '../constants'; // Fallback if API fails empty
import { fetchNewsCategories, fetchNews } from '../services/api';
import { Search, Eye, Calendar, TrendingUp, Filter, Check } from 'lucide-react';
import { LevelContext } from '../App';
import { Link } from 'react-router-dom';
import { useLevelConfig } from '../hooks/useLevelConfig';
import { NewsItem } from '../types';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [categories, setCategories] = useState<string[]>(['Semua']);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [catLoading, setCatLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const { activeLevel } = useContext(LevelContext);
  const LEVEL_CONFIG = useLevelConfig();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catsData, newsData] = await Promise.all([
          fetchNewsCategories(),
          fetchNews()
        ]);
        setCategories(catsData);
        setNews(newsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setCatLoading(false);
        setNewsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredNews = news.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = activeLevel === 'UMUM' ? true : n.jenjang === activeLevel;
    const matchesCategory = activeCategory === 'Semua' ? true : n.category === activeCategory;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  const trendingNews = [...news]
    .filter(n => activeLevel === 'UMUM' ? true : n.jenjang === activeLevel)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  const theme = LEVEL_CONFIG[activeLevel];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Main Feed */}
        <div className="md:w-2/3 space-y-12">
          <header>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-1 bg-islamic-gold-500 rounded-full`}></div>
              <span className={`text-xs font-black uppercase tracking-[0.3em] ${theme.text}`}>Update Terkini</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Warta & Berita</h1>
            <p className="text-slate-500 mb-10 max-w-xl leading-relaxed">
              Ikuti perkembangan terbaru, prestasi santri, dan pengumuman resmi di lingkungan {activeLevel === 'UMUM' ? 'Yayasan Unggul Bangsa' : theme.name}.
            </p>

            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative group max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-islamic-green-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-islamic-green-500/10 focus:border-islamic-green-500 transition-all outline-none font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 mr-2 text-slate-400">
                  <Filter className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
                </div>
                {catLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mx-4"></div>
                ) : (
                  categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2.5 rounded-full text-xs font-black transition-all duration-300 border ${activeCategory === cat
                        ? `${theme.bg} text-white border-transparent shadow-lg shadow-black/5`
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                        }`}
                    >
                      {cat}
                    </button>
                  ))
                )}
              </div>
            </div>
          </header>

          <div className="space-y-10">
            {newsLoading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
                <p className="text-slate-400 font-bold">Memuat berita...</p>
              </div>
            ) : filteredNews.length > 0 ? filteredNews.map(news => {
              // const newsTheme = LEVEL_CONFIG[news.jenjang];
              const newsTheme =
                news.jenjang === 'SMA'
                  ? LEVEL_CONFIG['MA']
                  : LEVEL_CONFIG[news.jenjang];
              return (
                <article key={news.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-slate-100 flex flex-col sm:flex-row group">
                  <div className="sm:w-2/5 h-64 sm:h-auto overflow-hidden relative">
                    <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className={`absolute top-6 left-6 ${newsTheme.bg} text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl`}>
                      {news.jenjang}
                    </div>
                  </div>
                  <div className="sm:w-3/5 p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="bg-slate-50 text-slate-400 border border-slate-100 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{news.category}</span>
                        <span className="text-slate-400 text-[10px] font-bold flex items-center uppercase tracking-widest gap-2">
                          <Calendar className="w-4 h-4 text-islamic-gold-500" /> {news.date}
                        </span>
                      </div>
                      <Link to={`/berita/${news.id}`}>
                        <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-islamic-green-700 transition-colors">{news.title}</h2>
                      </Link>
                      <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-8">{news.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                      <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <Eye className="w-4 h-4 mr-2 text-islamic-green-600" /> {news.views.toLocaleString()} Pembaca
                      </div>
                      <Link to={`/berita/${news.id}`} className="text-islamic-green-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                        Baca Berita <TrendingUp className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            }) : (
              <div className="text-center py-32 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Search className="w-8 h-8 text-slate-200" />
                </div>
                <p className="text-slate-400 font-black uppercase tracking-widest">Tidak ada warta ditemukan</p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategory('Semua'); }}
                  className="mt-6 text-islamic-green-600 font-bold text-sm underline"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}

        <aside className="md:w-1/3">
          <div className="sticky top-28 space-y-10">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center">
                <TrendingUp className="text-islamic-gold-500 mr-4 w-7 h-7" /> Populer
              </h3>
              <div className="space-y-10">
                {trendingNews.map((news, index) => (
                  <Link to={`/berita/${news.id}`} key={news.id} className="flex gap-5 group">
                    <span className="text-5xl font-black text-slate-50 group-hover:text-islamic-green-100 transition-colors leading-none">{(index + 1).toString().padStart(2, '0')}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-islamic-green-600 transition-colors line-clamp-2">{news.title}</h4>
                      <div className="flex items-center gap-3 mt-3">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${LEVEL_CONFIG[news.jenjang].bg} text-white uppercase tracking-widest`}>{news.jenjang}</span>
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{news.views} views</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-islamic-green-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                  <Check className="w-8 h-8 text-islamic-gold-500" />
                </div>
                <h4 className="text-2xl font-black mb-4">Newsletter</h4>
                <p className="text-islamic-green-200 text-sm mb-10 leading-relaxed font-medium">Berlangganan untuk mendapatkan ringkasan kegiatan mingguan sekolah.</p>
                <div className="space-y-4">
                  <input type="email" placeholder="Email Anda..." className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 placeholder-islamic-green-600 outline-none focus:bg-white/10 focus:border-white/20 text-sm transition-all" />
                  <button className="w-full bg-islamic-gold-500 text-white font-black py-5 rounded-2xl hover:bg-islamic-gold-600 transition-all shadow-xl shadow-black/30">Daftar Sekarang</button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]"></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default News;
