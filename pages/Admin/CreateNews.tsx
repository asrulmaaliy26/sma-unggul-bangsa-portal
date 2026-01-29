
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Wand2, 
  Loader2, 
  Image as ImageIcon,
  Tag,
  AlignLeft,
  CheckCircle,
  FileText,
  Trophy,
  Plus,
  Trash2,
  Layers
} from 'lucide-react';
import { generateNewsArticle } from '../../services/gemini';
import { EducationLevel } from '../../types';
import { LevelContext } from '../../App';

const CreateNews: React.FC = () => {
  const navigate = useNavigate();
  const { activeLevel } = useContext(LevelContext);
  const [isGenerating, setIsGenerating] = useState(false);
  const [briefSketch, setBriefSketch] = useState('');
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Akademik' | 'Kegiatan' | 'Pengumuman' | 'Prestasi'>('Kegiatan');
  const [level, setLevel] = useState<'Nasional' | 'Internasional' | 'Provinsi'>('Nasional');
  const [jenjang, setJenjang] = useState<EducationLevel>(activeLevel === 'UMUM' ? 'SMA' : activeLevel);
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleSmartAIWrite = async () => {
    if (!briefSketch.trim()) {
      alert("Masukkan poin-poin kegiatan terlebih dahulu.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const result = await generateNewsArticle(briefSketch);
      setContent(result);
      if (!title) {
        const titleSuggest = result.split('\n')[0].substring(0, 100).replace(/judul[:\s]*/i, '');
        setTitle(titleSuggest || title);
      }
    } catch (error) {
      alert("Maaf, AI gagal menghasilkan berita. Silakan coba lagi.");
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
    alert("Berita berhasil disimpan! (Mock)");
    navigate('/admin/news');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="flex justify-between items-center mb-12">
         <div className="flex items-center gap-4">
            <Link to="/admin/news" className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-slate-900 transition-all">
               <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
               <h1 className="text-3xl font-black text-slate-900">Buat Warta Baru</h1>
               <p className="text-slate-500 font-medium">Lengkapi form atau gunakan asisten AI.</p>
            </div>
         </div>
         <button 
           onClick={handleSubmit}
           className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-black/10"
         >
            <Save className="w-5 h-5 text-islamic-gold-500" /> Simpan Publikasi
         </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
               <div className="space-y-8">
                  <div>
                     <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        <Tag className="w-4 h-4 text-slate-400" /> Judul Artikel
                     </label>
                     <input 
                       type="text" 
                       className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900 font-black text-xl text-slate-800" 
                       placeholder="Judul yang menarik..."
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                           Kategori Konten
                        </label>
                        <select 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-700 appearance-none outline-none"
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                        >
                           <option value="Kegiatan">Kegiatan</option>
                           <option value="Akademik">Akademik</option>
                           <option value="Pengumuman">Pengumuman</option>
                           <option value="Prestasi">Prestasi</option>
                        </select>
                     </div>
                     <div>
                        <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                           <Layers className="w-4 h-4" /> Jenjang Pendidikan
                        </label>
                        <select 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-700 appearance-none outline-none"
                          value={jenjang}
                          onChange={(e) => setJenjang(e.target.value as any)}
                        >
                           <option value="MI">MI (SD)</option>
                           <option value="SMP">SMP</option>
                           <option value="SMA">SMA</option>
                           <option value="KAMPUS">STAI (Kampus)</option>
                        </select>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {category === 'Prestasi' && (
                       <div>
                          <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                             <Trophy className="w-4 h-4 text-islamic-gold-500" /> Tingkat Prestasi
                          </label>
                          <select 
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-700 appearance-none outline-none"
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
                           <ImageIcon className="w-4 h-4" /> URL Gambar Utama
                        </label>
                        <input 
                          type="text" 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" 
                          placeholder="https://images.unsplash.com/..." 
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                     </div>
                  </div>

                  {/* Attachments Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                         <ImageIcon className="w-4 h-4" /> Galeri Lampiran
                      </label>
                      <button 
                        type="button"
                        onClick={addAttachment}
                        className="text-xs font-black text-slate-900 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Tambah
                      </button>
                    </div>
                    <div className="space-y-3">
                      {attachments.map((url, index) => (
                        <div key={index} className="flex gap-2">
                          <input 
                            type="text" 
                            className="flex-1 px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-xs"
                            placeholder="URL Gambar..."
                            value={url}
                            onChange={(e) => updateAttachment(index, e.target.value)}
                          />
                          <button 
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                     <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        <AlignLeft className="w-4 h-4" /> Konten Berita
                     </label>
                     <textarea 
                       rows={12} 
                       className="w-full px-6 py-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] outline-none font-medium text-slate-700 leading-relaxed" 
                       placeholder="Tulis isi berita secara detail..."
                       value={content}
                       onChange={(e) => setContent(e.target.value)}
                     ></textarea>
                  </div>
               </div>
            </section>
         </div>

         <div className="space-y-8">
            <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <Sparkles className="w-6 h-6 text-islamic-gold-500" />
                     <h3 className="text-xl font-black">AI Auto-Write</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-8 leading-relaxed">
                     Masukkan poin-poin kegiatan, AI akan memprosesnya menjadi artikel formal sesuai jenjang pendidikan yang dipilih.
                  </p>
                  <textarea 
                    rows={6} 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs outline-none focus:bg-white/10 transition-all mb-6" 
                    placeholder="Contoh: Santri MI juara lomba kaligrafi tingkat kota..."
                    value={briefSketch}
                    onChange={(e) => setBriefSketch(e.target.value)}
                  ></textarea>
                  <button 
                    onClick={handleSmartAIWrite}
                    disabled={isGenerating}
                    className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 py-4 rounded-2xl font-black hover:bg-slate-100 disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />} Generate Konten
                  </button>
               </div>
            </section>
         </div>
      </div>
    </div>
  );
};

export default CreateNews;
