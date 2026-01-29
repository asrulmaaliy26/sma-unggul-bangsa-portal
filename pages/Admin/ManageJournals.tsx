import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, ArrowLeft, Edit3, Trash2, Star, Tag, ExternalLink, Search } from 'lucide-react';
import { fetchJournals, fetchJournalCategories } from '../../services/api';
import { JournalItem } from '../../types';

const ManageJournals: React.FC = () => {
   const [journals, setJournals] = useState<JournalItem[]>([]);
   const [categories, setCategories] = useState<string[]>(['Semua Kategori']);
   const [activeCategory, setActiveCategory] = useState('Semua Kategori');
   const [searchTerm, setSearchTerm] = useState('');

   const [loading, setLoading] = useState(true);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;

   useEffect(() => {
      const loadData = async () => {
         try {
            const [data, cats] = await Promise.all([
               fetchJournals(),
               fetchJournalCategories()
            ]);
            setJournals(data);
            setCategories(['Semua Kategori', ...cats]);
         } catch (error) {
            console.error('Error fetching journals:', error);
         } finally {
            setLoading(false);
         }
      };
      loadData();
   }, []);

   const filteredJournals = journals.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Semua Kategori' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
   });

   const totalPages = Math.ceil(filteredJournals.length / itemsPerPage);
   const paginatedJournals = filteredJournals.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   return (
      <div className="p-8">
         <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
               <Link to="/admin" className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-islamic-green-600 transition-all">
                  <ArrowLeft className="w-5 h-5" />
               </Link>
               <div>
                  <h1 className="text-3xl font-black text-slate-900">Kelola Jurnal</h1>
                  <p className="text-slate-500 font-medium">Manajemen karya tulis ilmiah siswa.</p>
               </div>
            </div>
            <Link to="/admin/journals/create" className="flex items-center gap-2 bg-islamic-green-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-islamic-green-700 transition-all shadow-xl">
               <Plus className="w-5 h-5" /> Tambah Jurnal
            </Link>
         </header>

         {/* Search & Filter Bar */}
         <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
               <input
                  type="text"
                  placeholder="Cari judul jurnal..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-islamic-green-500"
                  value={searchTerm}
                  onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
               />
            </div>
            <select
               className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-xl font-bold text-slate-600 outline-none"
               value={activeCategory}
               onChange={e => { setActiveCategory(e.target.value); setCurrentPage(1); }}
            >
               {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
               ))}
            </select>
         </div>

         <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b">
                     <tr>
                        <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Judul Jurnal</th>
                        <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                        <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Skor</th>
                        <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {loading ? (
                        <tr>
                           <td colSpan={4} className="text-center py-10 text-slate-400">Loading...</td>
                        </tr>
                     ) : paginatedJournals.length > 0 ? (
                        paginatedJournals.map(item => (
                           <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-3">
                                    {item.isBest && <Star className="w-4 h-4 text-islamic-gold-500 fill-islamic-gold-500" />}
                                    <p className="font-bold text-slate-800 line-clamp-1 group-hover:text-islamic-green-600">{item.title}</p>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                    {item.category}
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-center">
                                 <span className="bg-islamic-green-100 text-islamic-green-700 px-3 py-1 rounded-lg font-black">{item.score}</span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <div className="flex justify-end gap-2">
                                    <Link to={`/admin/journals/edit/${item.id}`} className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:text-islamic-green-600">
                                       <Edit3 className="w-4 h-4" />
                                    </Link>
                                    <Link to={`/jurnal/${item.id}`} className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:text-islamic-green-600 hover:bg-islamic-green-50 transition-all">
                                       <ExternalLink className="w-4 h-4" />
                                    </Link>
                                    <button className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50">
                                       <Trash2 className="w-4 h-4" />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={4} className="text-center py-10 text-slate-400">Tidak ada jurnal.</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
            <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
               <p className="text-xs font-bold text-slate-400">Menampilkan {Math.min(itemsPerPage * currentPage, journals.length)} dari {journals.length} jurnal</p>
               <div className="flex gap-2">
                  <button
                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                     disabled={currentPage === 1}
                     className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold disabled:opacity-50"
                  >
                     Sebelumnya
                  </button>
                  <button className="px-4 py-2 bg-islamic-green-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-islamic-green-100">{currentPage}</button>
                  <button
                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                     disabled={currentPage === totalPages}
                     className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold disabled:opacity-50"
                  >
                     Selanjutnya
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ManageJournals;
