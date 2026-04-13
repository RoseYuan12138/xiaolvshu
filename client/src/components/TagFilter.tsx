import type { Tag } from '../api';

interface Props {
  tags: Tag[];
  selected: string | null;
  onSelect: (tag: string | null) => void;
}

const DEFAULT_TABS = ['推荐', '技术', '投资', '生活', '深度'];

export function TagFilter({ tags, selected, onSelect }: Props) {
  const allTabs = tags.length > 0
    ? ['推荐', ...tags.map(t => t.tag)]
    : DEFAULT_TABS;

  const uniqueTabs = [...new Set(allTabs)];

  return (
    <div className="flex overflow-x-auto no-scrollbar border-b border-[#f0f0f0]">
      {uniqueTabs.map((tab) => {
        const isSelected = tab === '推荐' ? selected === null : tab === selected;
        return (
          <button
            key={tab}
            onClick={() => onSelect(tab === '推荐' ? null : tab)}
            className="shrink-0 px-4 py-2.5 relative transition-colors"
          >
            <span className={`text-[13px] ${
              isSelected ? 'text-[#333] font-bold' : 'text-[#999]'
            }`}>
              {tab}
            </span>
            {isSelected && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-[#ff2442] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
