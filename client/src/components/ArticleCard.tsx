import type { Article } from '../api';

interface Props {
  article: Article;
  onClick: () => void;
  index: number;
}

const PERSONA_AVATARS: Record<string, { bg: string; emoji: string }> = {
  '科技小明': { bg: 'bg-blue-500', emoji: '🔬' },
  '投资笔记': { bg: 'bg-amber-500', emoji: '📊' },
  '生活观察': { bg: 'bg-pink-500', emoji: '🌸' },
  '深度阅读': { bg: 'bg-purple-500', emoji: '📚' },
};

const COVER_COLORS = [
  ['#e0f2fe', '#bae6fd', '#7dd3fc'], // sky
  ['#fce7f3', '#fbcfe8', '#f9a8d4'], // pink
  ['#ecfdf5', '#a7f3d0', '#6ee7b7'], // emerald
  ['#fef3c7', '#fde68a', '#fcd34d'], // amber
  ['#ede9fe', '#c4b5fd', '#a78bfa'], // violet
  ['#fff1f2', '#fecdd3', '#fda4af'], // rose
  ['#f0fdf4', '#bbf7d0', '#86efac'], // green
  ['#eff6ff', '#bfdbfe', '#93c5fd'], // blue
];

export function ArticleCard({ article, onClick, index }: Props) {
  const displayTitle = article.rewritten_title || article.title;
  const persona = article.author_persona || article.feed_title;
  const avatar = PERSONA_AVATARS[persona] || { bg: 'bg-gray-400', emoji: persona.charAt(0) };
  const score = article.ai_score;
  const colors = COVER_COLORS[article.id % COVER_COLORS.length];

  // 不同高度，模拟瀑布流参差感
  const aspectRatios = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[5/6]'];
  const coverAspect = aspectRatios[article.id % aspectRatios.length];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-md overflow-hidden cursor-pointer press-scale card-appear break-inside-avoid mb-2"
      style={{
        animationDelay: `${index * 50}ms`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* 封面 */}
      {article.image_url ? (
        <div className={`w-full ${coverAspect} overflow-hidden`}>
          <img
            src={article.image_url}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              const parent = el.parentElement!;
              el.remove();
              parent.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`;
              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><span class="text-3xl opacity-60">${avatar.emoji}</span></div>`;
            }}
          />
        </div>
      ) : (
        <div
          className={`w-full ${coverAspect} flex items-center justify-center`}
          style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})` }}
        >
          <span className="text-4xl opacity-50">{avatar.emoji}</span>
        </div>
      )}

      {/* 内容 */}
      <div className="px-2.5 pt-2 pb-2.5">
        <h3 className="text-[13px] font-bold text-[#333] leading-[1.35] line-clamp-2 mb-2 tracking-tight">
          {displayTitle}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className={`w-[18px] h-[18px] rounded-full ${avatar.bg} shrink-0 flex items-center justify-center`}>
              <span className="text-white text-[9px]">{avatar.emoji.length > 1 ? avatar.emoji : persona.charAt(0)}</span>
            </div>
            <span className="text-[11px] text-[#999] truncate leading-none">
              {persona}
            </span>
          </div>

          {score != null && score > 0 && (
            <div className="flex items-center gap-0.5 shrink-0">
              <svg className="w-3.5 h-3.5 text-[#ff2442]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="text-[11px] text-[#999]">{score.toFixed(0)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
