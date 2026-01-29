
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Save, Sparkles, Wand2, Loader2,
  CheckCircle, Trophy, Plus, Trash2, Image as ImageIcon
} from 'lucide-react';
import { generateNewsArticle } from '../../services/gemini';
import { MOCK_NEWS } from '../../constants';

const EditNews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefSketch, setBriefSketch] = useState('');
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Akademik' | 'Kegiatan' | 'Pengumuman' | 'Prestasi'>('Kegiatan');
  const [level, setLevel] = useState<'Nasional' | 'Internasional' | 'Provinsi'>('Nasional');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  useEffect(() => {
    const news = MOCK_NEWS.find(n => n.id === id);
    if (news) {
      setTitle(news.title);
      setCategory(news.category as any);
      setLevel((news.level as any) || 'Nasional');
      setImageUrl(news.imageUrl);
      setContent(news.content);
      setAttachments(news.attachments || []);
    }
  }, [id]);

  const handleSmartAIWrite = async () => {
    if (!briefSketch.trim()) {
      alert("Masukkan poin-poin kegiatan terlebih dahulu.");
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateNewsArticle(briefSketch);
      setContent(result);
    } catch (error) {
      alert("Maaf, AI gagal menghasilkan berita.");
    } finally {
      setIsGenerating(false);
    }
  };

  const addAttachment = () => setAttachments([...attachments, '']);
  const removeAttachment = (index: number) => setAttachments(attachments.filter((_, i) => i !== index));
  const updateAttachment = (index: number, val: string) => {
    const newArr = [...attachments];
    newArr[index] = val;
    setAttachments(newArr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Berita berhasil diperbarui! (Mock)");
    navigate('/admin/news');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="flex justify-between items-center mb-12">
         <div className="flex items-center gap-4">
            <Link to="/admin/news" className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-islamic-green-600 transition-all">
               <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
               <h1 className="text-3xl font-black text-slate-900">Edit Warta</h1>
               <p className="text-slate-500 font-medium">Perbarui informasi artikel Anda.</p>
            </div>
         </div>
         <button onClick={handleSubmit} className="flex items-center gap-2 bg-islamic-green-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-islamic-green-800 transition-all shadow-xl">
            <Save className="w-5 h-5 text-islamic-gold-500" /> Simpan Perubahan
         </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
               <div className="space-y-8">
                  <div>
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Judul Artikel</label>
                     <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xl" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Kategori</label>
                        <select 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-islamic-green-500 font-bold text-slate-700 appearance-none"
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                        >
                           <option value="Kegiatan">Kegiatan</option>
                           <option value="Akademik">Akademik</option>
                           <option value="Pengumuman">Pengumuman</option>
                           <option value="Prestasi">Prestasi</option>
                        </select>
                     </div>
                     {category === 'Prestasi' && (
                        <div>
                          <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                             <Trophy className="w-4 h-4 text-islamic-gold-500" /> Tingkat Prestasi
                          </label>
                          <select 
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-islamic-green-500 font-bold text-slate-700 appearance-none"
                            value={level}
                            onChange={(e) => setLevel(e.target.value as any)}
                          >
                             <option value="Nasional">Nasional</option>
                             <option value="Internasional">Internasional</option>
                             <option value="Provinsi">Provinsi</option>
                          </select>
                        </div>
                     )}
                     <div>
                        <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                           <ImageIcon className="w-4 h-4 text-islamic-green-600" /> URL Gambar Utama
                        </label>
                        <input 
                          type="text" 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium" 
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                     </div>
                  </div>

                  {/* Attachments Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                         <ImageIcon className="w-4 h-4 text-islamic-gold-500" /> Gambar Lampiran (Galeri)
                      </label>
                      <button 
                        type="button"
                        onClick={addAttachment}
                        className="text-xs font-bold text-islamic-green-600 flex items-center gap-1 hover:underline"
                      >
                        <Plus className="w-3 h-3" /> Tambah Lampiran
                      </button>
                    </div>
                    <div className="space-y-3">
                      {attachments.map((url, index) => (
                        <div key={index} className="flex gap-2">
                          <input 
                            type="text" 
                            className="flex-1 px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-islamic-green-500 text-sm"
                            placeholder="URL Gambar Lampiran..."
                            value={url}
                            onChange={(e) => updateAttachment(index, e.target.value)}
                          />
                          <button 
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Konten Berita</label>
                     <textarea rows={12} className="w-full px-6 py-6 bg-slate-50 border border-slate-100 rounded-[2.5rem]" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                  </div>
               </div>
            </section>
         </div>
         <div className="space-y-8">
            <section className="bg-islamic-green-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Sparkles className="w-6 h-6 text-islamic-gold-500" /> AI Helper</h3>
               <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm mb-6" placeholder="Masukkan poin-poin baru untuk rewrite artikel..." value={briefSketch} onChange={(e) => setBriefSketch(e.target.value)}></textarea>
               <button onClick={handleSmartAIWrite} disabled={isGenerating} className="w-full bg-islamic-gold-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3">
                 {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />} Rewrite with AI
               </button>
               <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-islamic-green-400">
                  <CheckCircle className="w-4 h-4" /> Hasil dapat diedit kembali
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};

export default EditNews;
