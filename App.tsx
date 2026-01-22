import React, { useState, useEffect } from 'react';
import { Tab, Member } from './types';
import { MEMBERS } from './constants';
import { ScheduleView } from './components/ScheduleView';
import { ExpenseView } from './components/ExpenseView';
import { PlanningView } from './components/PlanningView';
import { JournalView } from './components/JournalView';
import { Calendar, DollarSign, BookOpen, CheckSquare, Settings, X } from 'lucide-react';
import { db } from './services/firebase';
import { collection, onSnapshot, doc, updateDoc, setDoc, getDocs } from 'firebase/firestore';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.SCHEDULE);
  const [members, setMembers] = useState<Member[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync Members from Firestore
  useEffect(() => {
    // 1. Listen for updates
    const unsubscribe = onSnapshot(collection(db, 'members'), (snapshot) => {
      const fetchedMembers: Member[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Member));
      
      // Sort by ID to keep order consistent (m1, m2...)
      fetchedMembers.sort((a, b) => a.id.localeCompare(b.id));

      if (fetchedMembers.length > 0) {
        setMembers(fetchedMembers);
      } else {
        // 2. Seed if empty (First run)
        seedMembers();
      }
    });

    return () => unsubscribe();
  }, []);

  const seedMembers = async () => {
    for (const member of MEMBERS) {
      await setDoc(doc(db, 'members', member.id), member);
    }
  };

  const handleUpdateMemberName = async (id: string, newName: string) => {
    await updateDoc(doc(db, 'members', id), { name: newName });
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.SCHEDULE:
        // Pass members to ScheduleView for the pre-trip checklist
        return <ScheduleView members={members} />;
      case Tab.EXPENSE:
        return <ExpenseView members={members} />;
      case Tab.PLANNING:
        return <PlanningView members={members} />;
      case Tab.JOURNAL:
        return <JournalView members={members} />;
      default:
        return <ScheduleView members={members} />;
    }
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-paper flex flex-col relative shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="px-6 py-5 flex justify-between items-center bg-paper z-10 border-b border-slate-100">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 tracking-tight">韓國之旅 🇰🇷</h1>
           <p className="text-xs text-slate-500 font-medium">2026/01/30 - 02/05</p>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center border-2 border-slate-100 hover:bg-slate-50 transition-colors"
        >
           <Settings size={20} className="text-slate-400" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-slate-100 pb-safe pt-2 px-2 flex justify-around items-center z-50">
        <NavButton 
          active={activeTab === Tab.SCHEDULE} 
          onClick={() => setActiveTab(Tab.SCHEDULE)} 
          icon={Calendar} 
          label="行程" 
        />
        <NavButton 
          active={activeTab === Tab.EXPENSE} 
          onClick={() => setActiveTab(Tab.EXPENSE)} 
          icon={DollarSign} 
          label="記帳" 
        />
        <NavButton 
          active={activeTab === Tab.PLANNING} 
          onClick={() => setActiveTab(Tab.PLANNING)} 
          icon={CheckSquare} 
          label="清單" 
        />
        <NavButton 
          active={activeTab === Tab.JOURNAL} 
          onClick={() => setActiveTab(Tab.JOURNAL)} 
          icon={BookOpen} 
          label="日誌" 
        />
      </nav>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl border-2 border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">旅伴設定</h2>
              <button onClick={() => setIsSettingsOpen(false)}><X className="text-slate-400" /></button>
            </div>
            <div className="space-y-4">
              {members.map(member => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 border-2 border-slate-100 overflow-hidden ${member.color}`}>
                    <img src={member.avatar} alt="avatar" className="w-full h-full object-cover transform scale-110" />
                  </div>
                  <input 
                    type="text" 
                    value={member.name}
                    onChange={(e) => handleUpdateMemberName(member.id, e.target.value)}
                    className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:border-winter-400 outline-none"
                  />
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsSettingsOpen(false)}
              className="w-full mt-6 py-3 bg-winter-500 text-white font-bold rounded-xl shadow-soft-sm active:scale-95 transition-transform"
            >
              完成
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.FC<{ size?: number; className?: string; strokeWidth?: number }>;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center w-16 py-1 group"
  >
    <div className={`mb-1 transition-colors duration-200 ${active ? 'text-winter-500' : 'text-slate-300 group-hover:text-slate-400'}`}>
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    </div>
    <span className={`text-[10px] font-bold transition-colors duration-200 ${active ? 'text-winter-500' : 'text-slate-300'}`}>
      {label}
    </span>
  </button>
);

export default App;