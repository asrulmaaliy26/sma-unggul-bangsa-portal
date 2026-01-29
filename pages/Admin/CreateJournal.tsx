
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Star, Layers, User, GraduationCap, FileText, Eye, ExternalLink, Tag } from 'lucide-react';
import { LevelContext } from '../../App';
import { EducationLevel } from '../../types';
import { fetchJournalCategories } from '../../services/api';
import { useLevelConfig } from '../../hooks/useLevelConfig';

const CreateJournal: React.FC = () => {
  const navigate = useNavigate();
  const { activeLevel } = useContext(LevelContext);
  const LEVEL_CONFIG = useLevelConfig();
  const [categories, setCategories] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [mentor, setMentor] = useState('');
  const [category, setCategory] = useState('');
  const [score, setScore] = useState(0);
  const [abstract, setAbstract] = useState('');
  const [isBest, setIsBest] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [jenjang, setJenjang] = useState<EducationLevel>(activeLevel === 'UMUM' ? 'SMA' : activeLevel);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchJournalCategories();
        setCategories(data.filter(c => c !== 'Semua'));
        if (data.length > 1) {
          setCategory(data[1]); // Set default to first non-"Semua" category
        }
      } catch (error) {
        console.error('Error loading journal categories:', error);
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Jurnal ${jenjang} kategori ${category} berhasil disimpan! (Mock)`);
    navigate('/admin/journals');
  };

  const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <Link to="/admin/journals" className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-islamic-green-600 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Tambah Jurnal</h1>
            <p className="text-slate-500 font-medium">Arsipkan karya ilmiah siswa.</p>
          </div>
        </div>
        <button onClick={handleSubmit} className="bg-islamic-green-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl shadow-islamic-green-100">
          <Save className="w-5 h-5" /> Simpan Jurnal
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Judul Jurnal Ilmiah</label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-lg" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4" /> Kategori Penelitian
                </label>
                <select
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-islamic-green-500"
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
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-islamic-green-500"
                  value={jenjang}
                  onChange={(e) => setJenjang(e.target.value as EducationLevel)}
                >
                  {Object.keys(LEVEL_CONFIG)
                    .filter(key => key !== 'UMUM')
                    .map(key => (
                      <option key={key} value={key}>
                        {key} ({LEVEL_CONFIG[key].type})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <User className="w-4 h-4" /> Penulis (Siswa)
                </label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4" /> Guru Pembimbing
                </label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={mentor} onChange={(e) => setMentor(e.target.value)} />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4" /> URL File Jurnal (PDF)
                </label>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
                  {fileUrl && (
                    <button type="button" onClick={() => setShowPreview(!showPreview)} className="px-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">
                      {showPreview ? 'Tutup' : 'Preview'}
                    </button>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Abstrak Jurnal</label>
                <textarea rows={6} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[2.5rem] italic font-medium" value={abstract} onChange={(e) => setAbstract(e.target.value)}></textarea>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateJournal;
