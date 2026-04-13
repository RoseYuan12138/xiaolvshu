type Tab = 'discover' | 'favorites' | 'settings';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
  readCount: number;
  dailyLimit: number;
}

export function BottomNav({ active, onChange, readCount, dailyLimit }: Props) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="flex items-center justify-around py-1.5">
        <button onClick={() => onChange('discover')} className="flex flex-col items-center gap-0.5 py-1 px-5">
          <svg className={`w-[22px] h-[22px] ${active === 'discover' ? 'text-[#333]' : 'text-[#bbb]'}`} fill="none" stroke="currentColor" strokeWidth={active === 'discover' ? 2.2 : 1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className={`text-[10px] ${active === 'discover' ? 'text-[#333] font-semibold' : 'text-[#bbb]'}`}>发现</span>
        </button>

        <button onClick={() => onChange('favorites')} className="flex flex-col items-center gap-0.5 py-1 px-5">
          <svg className={`w-[22px] h-[22px] ${active === 'favorites' ? 'text-[#333]' : 'text-[#bbb]'}`} fill={active === 'favorites' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className={`text-[10px] ${active === 'favorites' ? 'text-[#333] font-semibold' : 'text-[#bbb]'}`}>收藏</span>
        </button>

        {/* 中间阅读进度指示 */}
        <div className="flex flex-col items-center gap-0.5 py-1 px-3">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
              <circle
                cx="18" cy="18" r="15" fill="none"
                stroke="#22c55e" strokeWidth="2.5"
                strokeDasharray={`${(readCount / dailyLimit) * 94.2} 94.2`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[9px] font-bold text-[#333]">{readCount}</span>
          </div>
          <span className="text-[9px] text-[#bbb]">今日</span>
        </div>

        <button onClick={() => onChange('settings')} className="flex flex-col items-center gap-0.5 py-1 px-5">
          <svg className={`w-[22px] h-[22px] ${active === 'settings' ? 'text-[#333]' : 'text-[#bbb]'}`} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className={`text-[10px] ${active === 'settings' ? 'text-[#333] font-semibold' : 'text-[#bbb]'}`}>我的</span>
        </button>
      </div>
    </nav>
  );
}
