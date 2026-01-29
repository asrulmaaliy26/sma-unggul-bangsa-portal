
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectDetail, fetchProjects } from '../services/api';
import { ProjectItem } from '../types';
import { ArrowLeft, ArrowRight, User, Calendar, Lightbulb, Zap, Rocket, FileText, Download } from 'lucide-react';

const ProjectDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const [project, setProject] = useState<ProjectItem | null>(null);
   const [otherProjects, setOtherProjects] = useState<ProjectItem[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      const loadData = async () => {
         if (!id) return;
         setLoading(true);
         setError(false);
         try {
            const [detail, list] = await Promise.all([
               fetchProjectDetail(id),
               fetchProjects()
            ]);
            setProject(detail);
            setOtherProjects(list.filter(p => p.id !== id).slice(0, 3));
         } catch (err) {
            console.error(err);
            setError(true);
         } finally {
            setLoading(false);
         }
      };
      loadData();
   }, [id]);

   if (loading) return (
      <div className="flex justify-center py-40">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
   );

   if (error || !project) return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
         <h2 className="text-2xl font-bold">Projek tidak ditemukan</h2>
         <Link to="/projek" className="text-blue-600 hover:underline mt-4 inline-block">Kembali ke Projek</Link>
      </div>
   );

   return (
      <div className="max-w-7xl mx-auto px-4 py-12">
         <Link to="/projek" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-bold mb-8 gap-2 transition-all">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Galeri Projek
         </Link>

         <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
               <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="bg-blue-50 text-blue-600 p-2 rounded-xl"><Lightbulb className="w-6 h-6" /></div>
                     <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{project.title}</h1>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Dibuat Oleh</p>
                        <p className="text-sm font-bold text-slate-800 flex items-center gap-2"><User className="w-4 h-4" /> {project.author}</p>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tanggal Rilis</p>
                        <p className="text-sm font-bold text-slate-800 flex items-center gap-2"><Calendar className="w-4 h-4" /> {project.date}</p>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 col-span-2 md:col-span-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status Projek</p>
                        <p className="text-sm font-bold text-green-600 flex items-center gap-2"><Zap className="w-4 h-4" /> Terpublikasi</p>
                     </div>
                  </div>

                  <img src={project.imageUrl} className="w-full h-[400px] object-cover rounded-3xl mb-10 shadow-lg" alt={project.title} />

                  <div className="space-y-8 text-slate-700">
                     <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Rocket className="w-5 h-5 text-blue-600" /> Deskripsi Projek</h3>
                        <p className="leading-relaxed text-lg">{project.description}</p>
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Latar Belakang</h3>
                        <p className="leading-relaxed">Projek ini lahir dari pengamatan siswa terhadap permasalahan nyata di lingkungan sekitar sekolah. Dengan dukungan bimbingan dari laboratorium teknologi LPI Al Hidayah, tim berhasil mengembangkan prototipe ini selama 3 bulan pengembangan intensif.</p>
                     </div>
                     <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">Fitur Utama</h3>
                        <ul className="list-disc list-inside space-y-2 text-blue-700">
                           <li>Integrasi sensor real-time</li>
                           <li>Antarmuka berbasis web responsif</li>
                           <li>Efisiensi energi hingga 40%</li>
                           <li>Kemudahan instalasi bagi pemula</li>
                        </ul>
                     </div>

                     {project.documents && project.documents.length > 0 && (
                        <div>
                           <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-blue-600" /> Dokumen Pendukung
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {project.documents.map((doc, index) => (
                                 <a
                                    key={index}
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-colors group"
                                 >
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-red-500 font-black text-xs border border-slate-100">
                                       {doc.format.toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                       <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">{doc.title}</p>
                                       <p className="text-xs text-slate-400 capitalize">{doc.type}</p>
                                    </div>
                                    <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                 </a>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            <aside className="lg:w-1/3 space-y-8">
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
                  <h3 className="text-2xl font-bold mb-8 relative z-10">Projek Inovatif Lainnya</h3>
                  <div className="space-y-8 relative z-10">
                     {otherProjects.length > 0 ? otherProjects.map(p => (
                        <Link to={`/projek/${p.id}`} key={p.id} className="block group/item">
                           <div className="flex gap-4 items-center">
                              <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                                 <img src={p.imageUrl} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" alt={p.title} />
                              </div>
                              <div>
                                 <h4 className="font-bold text-sm leading-snug group-hover/item:text-blue-400 transition-colors line-clamp-2">{p.title}</h4>
                                 <p className="text-xs text-slate-400 mt-2">Karya: {p.author}</p>
                              </div>
                           </div>
                        </Link>
                     )) : (
                        <p className="text-slate-500 text-sm">Tidak ada projek lain saat ini.</p>
                     )}
                  </div>
                  <Link to="/projek" className="mt-10 inline-flex items-center gap-2 text-white font-bold text-sm bg-blue-600 px-6 py-4 rounded-2xl hover:bg-blue-700 transition-all w-full justify-center">
                     Jelajahi Semua Projek <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>

               <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Ingin Membuat Projek?</h3>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                     Daftarkan tim kamu ke Laboratorium Inovasi untuk mendapatkan dana pengembangan dan bimbingan mentor.
                  </p>
                  <button className="w-full bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">Proposal Projek</button>
               </div>
            </aside>
         </div>
      </div>
   );
};

export default ProjectDetail;
