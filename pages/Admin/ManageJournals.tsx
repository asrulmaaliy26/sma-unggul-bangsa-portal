
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, ArrowLeft, Edit3, Trash2, Star, Tag } from 'lucide-react';
import { MOCK_JOURNALS } from '../../constants';

const ManageJournals: React.FC = () => {
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

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
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
               {MOCK_JOURNALS.map(item => (
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
                           <button className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default ManageJournals;
