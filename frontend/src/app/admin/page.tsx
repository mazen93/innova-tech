'use client';
import { useEffect, useState } from 'react';
import { Settings, Users, MessageSquare, Plus, Trash2, Edit3, X, Check, Lock, Palette } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function AdminDashboard() {
  const { theme, setTheme } = useAppContext();
  const [activeTab, setActiveTab] = useState('messages');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [themeForm, setThemeForm] = useState({ 
    primaryColor: theme.primaryColor, 
    primaryButtonTextColor: theme.primaryButtonTextColor || '#ffffff',
    textColor: theme.textColor,
    sectionBgColor: theme.sectionBgColor,
    sectionBgColorAlt: theme.sectionBgColorAlt,
    borderColor: theme.borderColor,
    sidebarBgColor: theme.sidebarBgColor,
    logoUrl: theme.logoUrl || '',
    facebookUrl: theme.facebookUrl || '',
    twitterUrl: theme.twitterUrl || '',
    instagramUrl: theme.instagramUrl || '',
    linkedinUrl: theme.linkedinUrl || '',
    youtubeUrl: theme.youtubeUrl || '',
    tiktokUrl: theme.tiktokUrl || ''
  });

  // Auth Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const result = await res.json();
    if (result.success) {
      setIsLoggedIn(true);
      localStorage.setItem('innova-auth', 'true');
    } else {
      alert('Invalid Password');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('innova-auth') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Data Fetching
  const fetchData = async () => {
    if (activeTab === 'theme') return;
    setLoading(true);
    try {
      const endpoint = activeTab === 'messages' ? 'contacts' : activeTab;
      const res = await fetch(`http://localhost:3000/api/${endpoint}`);
      const result = await res.json();
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [activeTab, isLoggedIn]);

  useEffect(() => {
    setThemeForm({ 
      primaryColor: theme.primaryColor, 
      primaryButtonTextColor: theme.primaryButtonTextColor || '#ffffff',
      textColor: theme.textColor,
      sectionBgColor: theme.sectionBgColor,
      sectionBgColorAlt: theme.sectionBgColorAlt,
      borderColor: theme.borderColor,
      sidebarBgColor: theme.sidebarBgColor,
      logoUrl: theme.logoUrl || '',
      facebookUrl: theme.facebookUrl || '',
      twitterUrl: theme.twitterUrl || '',
      instagramUrl: theme.instagramUrl || '',
      linkedinUrl: theme.linkedinUrl || '',
      youtubeUrl: theme.youtubeUrl || '',
      tiktokUrl: theme.tiktokUrl || ''
    });
  }, [theme]);

  // CRUD Actions
  const handleSaveTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:3000/api/theme', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(themeForm)
    });
    setTheme(themeForm);
    alert('Theme successfully updated!');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const endpoint = activeTab === 'messages' ? 'contacts' : activeTab;
    await fetch(`http://localhost:3000/api/${endpoint}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload: any = {};
    formData.forEach((value, key) => payload[key] = value);

    const method = editingItem ? 'PATCH' : 'POST';
    const url = editingItem 
      ? `http://localhost:3000/api/${activeTab}/${editingItem.id}` 
      : `http://localhost:3000/api/${activeTab}`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setShowModal(false);
    setEditingItem(null);
    fetchData();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--theme-text)' }}>
        <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto" style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: 'var(--theme-primary)' }}>
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Admin Portal</h1>
          <p className="text-slate-500 text-center mb-8">Please enter your password to continue.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition"
              style={{ '--tw-ring-color': 'var(--theme-primary)' } as any}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              className="w-full py-3 text-white font-bold rounded-xl transition hover:opacity-90"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12" style={{ backgroundColor: 'var(--theme-section-bg)' }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div 
          className="lg:w-64 border rounded-3xl p-6 h-fit lg:sticky lg:top-28"
          style={{ backgroundColor: 'var(--theme-sidebar-bg)', borderColor: 'var(--theme-border)' }}
        >
          <div className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-6">CMS Console</div>
          <nav className="space-y-2">
            {[
              { id: 'messages', label: 'Inbox', icon: MessageSquare },
              { id: 'services', label: 'Services', icon: Settings },
              { id: 'products', label: 'Ecosystem', icon: Users },
              { id: 'theme', label: 'Theme Config', icon: Palette },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === tab.id ? 'text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}
                style={activeTab === tab.id ? { 
                  backgroundColor: 'var(--theme-primary)',
                  boxShadow: `0 10px 15px -3px var(--theme-primary)40` 
                } : {}}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </nav>
          <button 
            onClick={() => { localStorage.removeItem('innova-auth'); setIsLoggedIn(false); }}
            className="w-full mt-8 text-sm text-slate-400 hover:text-red-500 transition text-left px-4"
          >
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 capitalize">{activeTab}</h1>
            {activeTab !== 'messages' && activeTab !== 'theme' && (
              <button 
                onClick={() => { setEditingItem(null); setShowModal(true); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition"
              >
                <Plus size={18} /> New {activeTab.slice(0, -1)}
              </button>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {activeTab === 'theme' ? (
              <form onSubmit={handleSaveTheme} className="p-10 space-y-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Primary Corporate Color</label>
                  <div className="flex items-center gap-4">
                    <input type="color" value={themeForm.primaryColor} onChange={e => setThemeForm({...themeForm, primaryColor: e.target.value})} className="w-16 h-16 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={themeForm.primaryColor} onChange={e => setThemeForm({...themeForm, primaryColor: e.target.value})} className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Primary Text Color</label>
                  <div className="flex items-center gap-4">
                    <input type="color" value={themeForm.textColor} onChange={e => setThemeForm({...themeForm, textColor: e.target.value})} className="w-16 h-16 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={themeForm.textColor} onChange={e => setThemeForm({...themeForm, textColor: e.target.value})} className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Section Background</label>
                  <div className="flex items-center gap-4">
                    <input type="color" value={themeForm.sectionBgColor} onChange={e => setThemeForm({...themeForm, sectionBgColor: e.target.value})} className="w-16 h-16 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={themeForm.sectionBgColor} onChange={e => setThemeForm({...themeForm, sectionBgColor: e.target.value})} className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Alternate Section Background</label>
                  <div className="flex items-center gap-4">
                    <input type="color" value={themeForm.sectionBgColorAlt} onChange={e => setThemeForm({...themeForm, sectionBgColorAlt: e.target.value})} className="w-16 h-16 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={themeForm.sectionBgColorAlt} onChange={e => setThemeForm({...themeForm, sectionBgColorAlt: e.target.value})} className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition uppercase font-mono" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Border Color</label>
                  <div className="flex items-center gap-4">
                    <input type="color" value={themeForm.borderColor} onChange={e => setThemeForm({...themeForm, borderColor: e.target.value})} className="w-16 h-16 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={themeForm.borderColor} onChange={e => setThemeForm({...themeForm, borderColor: e.target.value})} className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition uppercase font-mono" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Admin Sidebar Background</label>
                  <div className="flex items-center gap-4">
                    <input type="color" value={themeForm.sidebarBgColor} onChange={e => setThemeForm({...themeForm, sidebarBgColor: e.target.value})} className="w-16 h-16 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={themeForm.sidebarBgColor} onChange={e => setThemeForm({...themeForm, sidebarBgColor: e.target.value})} className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition uppercase font-mono" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                  </div>
                </div>
                {/* ── Logo Manager ── */}
                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700">Company Logo</label>
                      <p className="text-xs text-slate-400 mt-1">Paste a public image URL (PNG with transparent background recommended)</p>
                    </div>
                    {/* Live preview */}
                    <div className="w-32 h-14 bg-white border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden shadow-inner">
                      <img 
                        src={themeForm.logoUrl || '/logo.png'} 
                        alt="Logo preview" 
                        className="max-h-10 max-w-28 object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <input 
                      type="url" 
                      placeholder="https://example.com/your-logo.png" 
                      value={themeForm.logoUrl}
                      onChange={e => setThemeForm({...themeForm, logoUrl: e.target.value})}
                      className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button 
                      type="button" 
                      onClick={() => setThemeForm({...themeForm, logoUrl: ''})}
                      className="px-4 py-3 text-slate-500 hover:text-red-500 border border-slate-200 rounded-xl bg-white transition text-sm font-medium"
                      title="Reset to default logo"
                    >
                      Reset
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Leave empty to use the default /logo.png from the server.</p>
                </div>

                {/* ── Social Media Manager ── */}
                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Social Media Links</label>
                    <p className="text-xs text-slate-400 mb-4">Links will only appear in the footer if provided.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'facebookUrl', label: 'Facebook', placeholder: 'https://facebook.com/...' },
                      { id: 'instagramUrl', label: 'Instagram', placeholder: 'https://instagram.com/...' },
                      { id: 'twitterUrl', label: 'X (Twitter)', placeholder: 'https://twitter.com/...' },
                      { id: 'linkedinUrl', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...' },
                      { id: 'youtubeUrl', label: 'YouTube', placeholder: 'https://youtube.com/@...' },
                      { id: 'tiktokUrl', label: 'TikTok', placeholder: 'https://tiktok.com/@...' },
                    ].map((link) => (
                      <div key={link.id}>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">{link.label}</label>
                        <input 
                          type="url" 
                          placeholder={link.placeholder}
                          value={(themeForm as any)[link.id]}
                          onChange={e => setThemeForm({...themeForm, [link.id]: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 text-white font-bold rounded-xl transition shadow-lg hover:opacity-90"
                  style={{ backgroundColor: 'var(--theme-primary)', boxShadow: `0 10px 15px -3px var(--theme-primary)40` }}
                >
                  Save Theme Configuration
                </button>
              </form>
            ) : loading ? (
              <div className="p-20 text-center text-slate-400">Loading dynamic data...</div>
            ) : data.length === 0 ? (
              <div className="p-20 text-center text-slate-400">No entries found for {activeTab}.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-8 py-4 font-bold">Content Details</th>
                      {activeTab === 'messages' && <th className="px-8 py-4 font-bold">Sender</th>}
                      <th className="px-8 py-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition">
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-900 mb-1">{item.name} <span className="text-xs text-slate-400 ml-2 font-normal">{item.nameAr && `(${item.nameAr})`}</span></div>
                          <div className="text-sm text-slate-500 line-clamp-1">{item.description || item.message || item.tagline}</div>
                        </td>
                        {activeTab === 'messages' && (
                          <td className="px-8 py-6">
                            <div className="text-sm font-medium text-slate-700">{item.email}</div>
                            <div className="text-xs text-slate-400">{item.company || 'Private Individual'}</div>
                          </td>
                        )}
                        <td className="px-8 py-6 text-right space-x-2">
                          {activeTab !== 'messages' && (
                            <button 
                              onClick={() => { setEditingItem(item); setShowModal(true); }}
                              className="p-2 text-slate-400 hover:opacity-70 rounded-lg transition"
                              style={{ color: 'var(--theme-primary)' }}
                            >
                              <Edit3 size={18} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CRUD Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">{editingItem ? 'Edit' : 'Create'} {activeTab.slice(0,-1)}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Name (EN)</label>
                    <input name="name" defaultValue={editingItem?.name} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-2 transition" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                  </div>
                  <div className="flex-1" dir="rtl">
                    <label className="block text-sm font-bold text-slate-700 mb-2 text-right">الاسم (AR)</label>
                    <input name="nameAr" defaultValue={editingItem?.nameAr} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition text-right" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                  </div>
                </div>
                
                {activeTab === 'services' ? (
                  <>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Description (EN)</label>
                        <textarea name="description" defaultValue={editingItem?.description} required rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition resize-none" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                      <div className="flex-1" dir="rtl">
                        <label className="block text-sm font-bold text-slate-700 mb-2 text-right">الوصف (AR)</label>
                        <textarea name="descriptionAr" defaultValue={editingItem?.descriptionAr} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition resize-none text-right" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Icon ID (Lucide Name)</label>
                      <input name="icon" defaultValue={editingItem?.icon} placeholder="Globe, Smartphone, etc." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-2 transition" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Tagline (EN)</label>
                        <input name="tagline" defaultValue={editingItem?.tagline} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-2 transition" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                      <div className="flex-1" dir="rtl">
                        <label className="block text-sm font-bold text-slate-700 mb-2 text-right">الشعار اللفظي (AR)</label>
                        <input name="taglineAr" defaultValue={editingItem?.taglineAr} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition text-right" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Description (EN)</label>
                        <textarea name="description" defaultValue={editingItem?.description} required rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition resize-none" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                      <div className="flex-1" dir="rtl">
                        <label className="block text-sm font-bold text-slate-700 mb-2 text-right">الوصف (AR)</label>
                        <textarea name="descriptionAr" defaultValue={editingItem?.descriptionAr} rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition resize-none text-right" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                    </div>
                     <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Features (EN, Comma separated)</label>
                        <input name="features" defaultValue={editingItem?.features} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-2 transition" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                      <div className="flex-1" dir="rtl">
                        <label className="block text-sm font-bold text-slate-700 mb-2 text-right">المميزات (AR، مفصولة بفواصل)</label>
                        <input name="featuresAr" defaultValue={editingItem?.featuresAr} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 transition text-right" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-slate-700 mb-2">External Website Link</label>
                        <input name="link" defaultValue={editingItem?.link} placeholder="https://..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-2 transition" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Product Image URL</label>
                        <input name="image" defaultValue={editingItem?.image} placeholder="https://..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-2 transition" style={{ '--tw-ring-color': 'var(--theme-primary)' } as any} />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 font-bold rounded-xl shadow-lg transition hover:opacity-90" style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-text)' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
