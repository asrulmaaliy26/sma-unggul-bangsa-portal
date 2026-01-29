
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Layers, User, Image as ImageIcon, AlignLeft, Tag } from 'lucide-react';
import { MOCK_PROJECTS, PROJECT_CATEGORIES } from '../../constants';
import { EducationLevel } from '../../types';

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [jenjang, setJenjang] = useState<EducationLevel>('SMA');

  useEffect(() => {
    const proj = MOCK_PROJECTS.find(p => p.id === id);
    if (proj) {
      setTitle(proj.title);
      setAuthor(proj.author);
      setCategory(proj.category);
      setDescription(proj.description);
      setImageUrl(proj.imageUrl);
      setJenjang(proj.jenjang);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Perubahan projek berhasil disimpan! (Mock)");
    navigate('/admin/projects');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <header className="flex justify-between items-center mb-12">
         <div className="flex items-center gap-4">
            <Link to="/admin/projects" className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-islamic-gold-600 transition-all">
               <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-black text-slate-900">Edit Projek</h1>
         </div>
         <button onClick={handleSubmit} className="bg-islamic-gold-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl">
            <Save className="w-5 h-5" /> Perbarui Projek
         </button>
      </header>

      <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
               <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Judul Projek</label>
               <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-lg" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
               <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4" /> Kategori
               </label>
               <select 
                 className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-islamic-gold-500"
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
               >
                  {PROJECT_CATEGORIES.filter(c => c !== 'Semua').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
               </select>
            </div>

            <div>
               <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4" /> Jenjang Pendidikan
               </label>
               <select 
                 className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-islamic-gold-500"
                 value={jenjang}
                 onChange={(e) => setJenjang(e.target.value as EducationLevel)}
               >
                  <option value="MI">MI (SD)</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="KAMPUS">STAI (Kampus)</option>
               </select>
            </div>

            <div className="md:col-span-2">
               <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <User className="w-4 h-4" /> Penulis / Tim
               </label>
               <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>

            <div className="md:col-span-2">
               <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">URL Gambar Sampul</label>
               <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>

            <div className="md:col-span-2">
               <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Deskripsi Projek</label>
               <textarea rows={8} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
         </div>
      </section>
    </div>
  );
};

export default EditProject;
