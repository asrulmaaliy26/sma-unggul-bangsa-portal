

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Layers, User, Image as ImageIcon, AlignLeft, FileText, Eye, ExternalLink, Tag } from 'lucide-react';
import { LevelContext } from '../../App';
import { EducationLevel } from '../../types';
import { fetchProjectCategories } from '../../services/api';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const { activeLevel } = useContext(LevelContext);
  const [categories, setCategories] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [jenjang, setJenjang] = useState<EducationLevel>(activeLevel === 'UMUM' ? 'SMA' : activeLevel);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchProjectCategories();
        setCategories(data.filter(c => c !== 'Semua'));
        if (data.length > 1) {
          setCategory(data[1]); // Set default to first non-"Semua" category
        }
      } catch (error) {
        console.error('Error loading project categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Projek ${jenjang} kategori ${category} berhasil disimpan! (Mock)`);
    navigate('/admin/projects');
  };

  const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <Link to="/admin/projects" className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-islamic-gold-600 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Tambah Projek</h1>
            <p className="text-slate-500 font-medium">Publikasikan inovasi siswa terbaru.</p>
          </div>
        </div>
        <button onClick={handleSubmit} className="bg-islamic-gold-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl">
          <Save className="w-5 h-5" /> Simpan Projek
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Judul Projek</label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-lg" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Sistem Irigasi Cerdas" />
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4" /> Kategori Bidang
                </label>
                <select
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-islamic-gold-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
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
                  <User className="w-4 h-4" /> Penulis / Nama Tim
                </label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nama Siswa atau Kelompok" />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <ImageIcon className="w-4 h-4" /> URL Gambar Sampul
                </label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4" /> URL Dokumen Projek (PDF/Proposal)
                </label>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
                  {fileUrl && (
                    <button type="button" onClick={() => setShowPreview(!showPreview)} className="px-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
                      {showPreview ? 'Tutup' : 'Preview'}
                    </button>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <AlignLeft className="w-4 h-4" /> Deskripsi Projek
                </label>
                <textarea rows={8} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-islamic-gold-500" /> Sampul Preview
            </h3>
            {imageUrl ? (
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                <img src={imageUrl} className="w-full h-full object-cover" alt="Cover Preview" />
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center text-slate-300 font-black text-xs uppercase tracking-widest">
                Belum ada gambar
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
