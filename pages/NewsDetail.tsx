
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_NEWS } from '../constants';
import { Calendar, Eye, ArrowLeft, ArrowRight, Facebook, Twitter, Instagram, Image as ImageIcon } from 'lucide-react';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const news = MOCK_NEWS.find(n => n.id === id);
  const otherNews = MOCK_NEWS.filter(n => n.id !== id).slice(0, 3);
  
  if (!news) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
       <h2 className="text-2xl font-bold text-islamic-green-900">Berita tidak ditemukan</h2>
       <Link to="/berita" className="text-islamic-green-600 hover:underline mt-4 inline-block font-bold">Kembali ke Berita</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/berita" className="inline-flex items-center text-slate-500 hover:text-islamic-green-700 font-bold mb-8 gap-2 transition-all group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Warta Sekolah
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-2/3">
           <article className="bg-white rounded-[3rem] overflow-hidden border border-islamic-green-100 shadow-xl p-8 md:p-12 relative">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                 <span className="bg-islamic-green-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-islamic-green-100">{news.category}</span>
                 <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-islamic-green-600" /> {news.date}</span>
                 <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-islamic-green-600" /> {news.views} views</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 leading-[1.2]">{news.title}</h1>
              
              <div className="relative mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <img src={news.imageUrl} alt={news.title} className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-islamic-green-900/20 to-transparent"></div>
              </div>
              
              <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed mb-12 space-y-6">
                 {news.content.split('\n').map((paragraph, i) => (
                   <p key={i} className="text-lg">{paragraph}</p>
                 ))}
              </div>

              {/* Gallery Attachments Section */}
              {news.attachments && news.attachments.length > 0 && (
                <div className="mt-16 pt-10 border-t border-slate-100">
                   <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-islamic-gold-500" /> Lampiran Dokumentasi
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {news.attachments.map((url, idx) => (
                        <div key={idx} className="rounded-3xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in">
                           <img src={url} alt={`Lampiran ${idx + 1}`} className="w-full h-64 object-cover" />
                        </div>
                      ))}
                   </div>
                </div>
              )}

              <div className="mt-12 pt-10 border-t border-slate-100 flex flex-wrap justify-between items-center gap-8">
                 <div className="flex items-center gap-6">
                    <p className="font-bold text-slate-900 text-sm">Bagikan Warta:</p>
                    <div className="flex gap-3">
                       <button className="p-3 bg-slate-50 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Facebook className="w-5 h-5" /></button>
                       <button className="p-3 bg-slate-50 rounded-2xl text-blue-400 hover:bg-blue-400 hover:text-white transition-all shadow-sm"><Twitter className="w-5 h-5" /></button>
                       <button className="p-3 bg-slate-50 rounded-2xl text-pink-600 hover:bg-pink-600 hover:text-white transition-all shadow-sm"><Instagram className="w-5 h-5" /></button>
                    </div>
                 </div>
              </div>
           </article>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-8">
           <div className="bg-islamic-green-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <h3 className="text-2xl font-black mb-10 relative z-10 leading-tight">Berita Terkait</h3>
              <div className="space-y-8 relative z-10">
                 {otherNews.map(item => (
                   <Link to={`/berita/${item.id}`} key={item.id} className="block group/item">
                      <div className="flex gap-5 items-center">
                         <img src={item.imageUrl} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-white/10" alt={item.title} />
                         <div>
                            <h4 className="font-bold text-sm line-clamp-2 group-hover/item:text-islamic-gold-500 transition-colors">{item.title}</h4>
                            <p className="text-[10px] text-white/40 mt-2">{item.date}</p>
                         </div>
                      </div>
                   </Link>
                 ))}
              </div>
              <Link to="/berita" className="mt-12 inline-flex items-center gap-3 text-islamic-green-900 font-black text-sm bg-islamic-gold-500 px-8 py-4 rounded-2xl hover:bg-islamic-gold-600 transition-all w-full justify-center">
                 Semua Warta <ArrowRight className="w-4 h-4" />
              </Link>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsDetail;
