import { useState } from 'react';
import { X, Minus, Wrench, RefreshCw, Terminal, CheckCircle, ShieldAlert, LayoutDashboard, Settings } from 'lucide-react';

declare global { interface Window { api: any; } }

export default function App() {
  const [steamPath, setSteamPath] = useState("C:\\Program Files (x86)\\Steam");
  const [isValidPath, setIsValidPath] = useState(true);
  const [status, setStatus] = useState("Pronto");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleChangePath = async () => {
    const result = await window.api.selectPath();
    if (result) {
      if (result.valid) {
        setSteamPath(result.path);
        setIsValidPath(true);
        setStatus("Novo caminho definido.");
      } else {
        setStatus(result.error);
        setIsValidPath(false);
      }
    }
  };

  const handleAction = async (action: string) => {
    if (!isValidPath && action !== 'reinstall') {
      setStatus("Caminho da Steam inválido!");
      return;
    }

    setLoading(true);
    setStatus("Processando...");
    
    try {
      let res;
      if (action === 'dll') res = await window.api.fixDlls(steamPath);
      if (action === 'reinstall') res = await window.api.reinstallTools();
      if (action === 'dev') res = await window.api.forceDevMode(steamPath);

      if (res && res.success) {
        setStatus(res.logs[0]);
      } else {
        setStatus(`Erro: ${res?.error || "Falha"}`);
      }
    } catch (e) {
      setStatus("Erro de comunicação.");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-[#09090b] text-white font-sans flex overflow-hidden border border-purple-900/40 rounded-lg shadow-2xl">
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0518] via-[#09090b] to-[#050505] -z-20" />
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="w-64 bg-black/40 backdrop-blur-md border-r border-white/5 flex flex-col z-10">
        
        <div className="h-14 flex items-center px-6 border-b border-white/5 select-none" style={{ WebkitAppRegion: 'drag' } as any}>
          <Wrench className="text-purple-500 mr-2" size={20} />
          <span className="font-bold tracking-widest text-purple-100">CALY<span className="text-purple-600">PATCHER</span></span>
        </div>

        <div className="flex-1 py-6 px-3 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-purple-600/20 text-purple-200 border border-purple-500/20' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          
          <button 
             onClick={handleChangePath}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${!isValidPath ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}
          >
            <Settings size={18} /> 
            <div className="flex flex-col items-start overflow-hidden">
              <span>Caminho Steam</span>
              <span className="text-[10px] opacity-50 truncate w-32">{steamPath}</span>
            </div>
          </button>
        </div>

        <div className="p-4 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isValidPath ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`} />
            <span className="text-xs text-zinc-400">{isValidPath ? "Steam Detectada" : "Caminho Inválido"}</span>
          </div>
          <div className="text-[10px] text-zinc-600">v1.0.0 Stable</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative z-0">
        
        <div className="h-14 flex justify-end items-center px-4 gap-2 select-none" style={{ WebkitAppRegion: 'drag' } as any}>
           <div className="flex gap-2" style={{ WebkitAppRegion: 'no-drag' } as any}>
            <button onClick={() => window.api.windowControl('minimize')} className="p-2 hover:bg-white/5 rounded text-zinc-400 hover:text-white transition"><Minus size={16}/></button>
            <button onClick={() => window.api.windowControl('close')} className="p-2 hover:bg-red-500/80 rounded text-zinc-400 hover:text-white transition"><X size={16}/></button>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Painel de Ferramentas</h1>
            <p className="text-zinc-400 text-sm flex items-center gap-2">
              {loading ? <RefreshCw className="animate-spin text-purple-500" size={14}/> : <Terminal size={14}/>} 
              <span className="text-purple-300">{status}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <DashboardCard 
              title="Corrigir Download"
              desc="Deleta xinput1_4.dll e hid.dll. Resolve o erro do botão 'Jogar' não aparecer."
              icon={<CheckCircle className="text-green-400" size={24} />}
              onClick={() => handleAction('dll')}
              color="group-hover:border-green-500/50"
              glow="group-hover:shadow-[0_0_30px_-5px_rgba(74,222,128,0.1)]"
            />

            <DashboardCard 
              title="Forçar Modo Dev"
              desc="Usa Start-Process para abrir a Steam com flag -dev. Corrige tela preta do Millennium."
              icon={<Terminal className="text-purple-400" size={24} />}
              onClick={() => handleAction('dev')}
              color="group-hover:border-purple-500/50"
              glow="group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.1)]"
            />

            <div className="col-span-2">
               <DashboardCard 
                title="Reinstalação Completa"
                desc="Executa 'irm steam.run | iex' no PowerShell."
                icon={<RefreshCw className="text-blue-400" size={24} />}
                onClick={() => handleAction('reinstall')}
                color="group-hover:border-blue-500/50"
                glow="group-hover:shadow-[0_0_30px_-5px_rgba(96,165,250,0.1)]"
              />
            </div>

            {!isValidPath && (
              <div className="col-span-2 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-4 animate-pulse">
                <ShieldAlert className="text-red-500" size={30} />
                <div>
                  <h3 className="font-bold text-red-200">Pasta da Steam não encontrada!</h3>
                  <p className="text-xs text-red-300">Use o menu lateral para selecionar onde a Steam está instalada.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, desc, icon, onClick, color, glow }: any) {
  return (
    <div 
      onClick={onClick}
      className={`group relative bg-zinc-900/40 border border-white/5 p-6 rounded-xl cursor-pointer transition-all duration-300 hover:bg-zinc-800/60 hover:-translate-y-1 ${color} ${glow}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="font-bold text-lg text-zinc-100 mb-1">{title}</h3>
      <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
    </div>
  );
}