
import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Plus, Search, Edit3, Trash2, ArrowLeft, User, Tag } from 'lucide-react';
import { MOCK_PROJECTS } from '../../constants';

const ManageProjects: React.FC = () => {
  return (
    <div className="p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
           <Link to="/admin" className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-islamic-green-600 transition-all">
              <ArrowLeft className="w-5 h-5" />
           </Link>
           <div>
              <h1 className="text-3xl font-black text-slate-900">Kelola Projek</h1>
              <p className="text-slate-500 font-medium">Inovasi dan riset kreatif siswa.</p>
           </div>
        </div>
        <Link to="/admin/projects/create" className="flex items-center gap-2 bg-islamic-gold-500 text-white px-8 py-4 rounded-2xl font-black hover:bg-islamic-gold-600 transition-all shadow-xl">
           <Plus className="w-5 h-5" /> Tambah Projek
        </Link>
      </header>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                     <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Judul Projek</th>
                     <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                     <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Penulis</th>
                     <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {MOCK_PROJECTS.map(item => (
                     <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <img src={item.imageUrl} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" alt="" />
                              <p className="font-bold text-slate-800 line-clamp-1 group-hover:text-islamic-gold-600 transition-colors">{item.title}</p>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                              {item.category}
                           </span>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2 font-black text-slate-500 text-xs uppercase tracking-widest"><User className="w-3.5 h-3.5" /> {item.author}</div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end gap-2">
                              <Link to={`/admin/projects/edit/${item.id}`} className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:text-islamic-gold-600 hover:bg-islamic-gold-50">
                                 <Edit3 className="w-4 h-4" />
                              </Link>
                              <button className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50">
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
    </div>
  );
};

export default ManageProjects;
