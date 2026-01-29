
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Layers, User, GraduationCap, FileText, Star, Eye, ExternalLink, Tag } from 'lucide-react';
import { MOCK_JOURNALS } from '../../constants';
import { EducationLevel } from '../../types';
import { fetchJournalCategories } from '../../services/api';

const EditJournal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
  const [jenjang, setJenjang] = useState<EducationLevel>('SMA');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchJournalCategories();
        setCategories(data.filter(c => c !== 'Semua'));
      } catch (error) {
        console.error('Error loading journal categories:', error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const journal = MOCK_JOURNALS.find(j => j.id === id);
    if (journal) {
      setTitle(journal.title);
      setAuthor(journal.author);
      setMentor(journal.mentor);
      setCategory(journal.category);
      setScore(journal.score);
      setAbstract(journal.abstract);
      setIsBest(journal.isBest || false);
      setJenjang(journal.jenjang);
      setFileUrl(journal.fileUrl || '');
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Perubahan jurnal berhasil disimpan! (Mock)");
    navigate('/admin/journals');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <Link to="/admin/journals" className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-islamic-green-600 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-black text-slate-900">Edit Jurnal</h1>
        </div>
        <button onClick={handleSubmit} className="bg-islamic-green-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-xl">
          <Save className="w-5 h-5" /> Perbarui Jurnal
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Judul Jurnal</label>
                <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-lg" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4" /> Kategori
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
                  <option value="MI">MI (SD)</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="KAMPUS">STAI (Kampus)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Abstrak Jurnal</label>
                <textarea rows={8} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[2.5rem] italic font-medium" value={abstract} onChange={(e) => setAbstract(e.target.value)}></textarea>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditJournal;
