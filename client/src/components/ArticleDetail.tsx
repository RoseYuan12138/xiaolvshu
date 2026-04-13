import { useState } from 'react';
import type { Article } from '../api';

interface Props {
  article: Article;
  onBack: () => void;
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

const PERSONA_AVATARS: Record<string, { bg: string; emoji: string }> = {
  '科技小明': { bg: 'bg-blue-500', emoji: '🔬' },
  '投资笔记': { bg: 'bg-amber-500', emoji: '📊' },
  '生活观察': { bg: 'bg-pink-500', emoji: '🌸' },
  '深度阅读': { bg: 'bg-purple-500', emoji: '📚' },
};

export function ArticleDetail({ article, onBack, isFavorited, onToggleFavorite }: Props) {
  const [closing, setClosing] = useState(false);
  const tags: string[] = article.ai_tags ? JSON.parse(article.ai_tags) : [];
  const displayTitle = article.rewritten_title || article.title;
  const displayContent = article.rewritten_content || article.content || article.summary;
  const persona = article.author_persona || article.feed_title;
  const avatar = PERSONA_AVATARS[persona] || { bg: 'bg-gray-400', emoji: persona.charAt(0) };
  const isMarkdown = article.rewritten_content != null;

  const handleBack = () => {
    setClosing(true);
    setTimeout(onBack, 250);
  };

  return (
    <div className={`fixed inset-0 bg-white z-50 overflow-y-auto ${closing ? 'slide-up-exit' : 'slide-up-enter'}`}>
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#f0f0f0] px-3 py-2.5 flex items-center justify-between z-10">
        <button onClick={handleBack} className="p-1 -ml-1 press-scale">
          <svg className="w-5 h-5 text-[#333]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full ${avatar.bg} flex items-center justify-center`}>
            <span className="text-white text-xs">{avatar.emoji.length > 1 ? avatar.emoji : persona.charAt(0)}</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-[#333]">{persona}</span>
          </div>
        </div>

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#ff2442] font-medium px-3 py-1 border border-[#ff2442] rounded-full press-scale"
        >
          关注
        </a>
      </div>

      {/* 封面图 */}
      {article.image_url && (
        <img src={article.image_url} alt="" className="w-full max-h-[50vh] object-cover" />
      )}

      {/* 正文 */}
      <div className="px-4 py-4">
        <h1 className="text-[17px] font-bold text-[#333] leading-snug mb-4 tracking-tight">
          {displayTitle}
        </h1>

        {isMarkdown ? (
          <div className="text-[15px] text-[#555] leading-[1.8] space-y-3">
            {displayContent.split('\n').map((line, i) => {
              if (!line.trim()) return null;
              if (line.startsWith('# '))
                return <h2 key={i} className="text-base font-bold text-[#333] mt-5 mb-1">{line.slice(2)}</h2>;
              if (line.startsWith('## '))
                return <h3 key={i} className="text-[15px] font-bold text-[#333] mt-4 mb-1">{line.slice(3)}</h3>;
              if (line.startsWith('- '))
                return <p key={i} className="pl-3 border-l-2 border-green-300 text-[14px]">{line.slice(2)}</p>;
              return <p key={i}>{line}</p>;
            })}
          </div>
        ) : (
          <div
            className="text-[15px] text-[#555] leading-[1.8]
                       [&_img]:rounded-lg [&_img]:my-3 [&_img]:w-full
                       [&_a]:text-green-600 [&_a]:no-underline
                       [&_p]:mb-3"
            dangerouslySetInnerHTML={{ __html: displayContent }}
          />
        )}

        {/* 标签 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#2f7df4] bg-[#f0f6ff] px-2.5 py-1 rounded-sm"
              >
                # {tag}
              </span>
            ))}
          </div>
        )}

        {/* 时间与摘要 */}
        <div className="text-xs text-[#ccc] mt-6 pt-4 border-t border-[#f5f5f5] space-y-1">
          {article.published_at && (
            <p>{new Date(article.published_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          )}
          {article.ai_summary && (
            <p className="text-[#aaa]">AI: {article.ai_summary}</p>
          )}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div
        className="sticky bottom-0 bg-white border-t border-[#f0f0f0] px-4 py-2.5 flex items-center gap-3"
        style={{ paddingBottom: 'calc(12px + var(--safe-bottom))' }}
      >
        <input
          type="text"
          placeholder="说点什么..."
          className="flex-1 px-3.5 py-2 bg-[#f5f5f5] rounded-full text-sm placeholder:text-[#ccc] focus:outline-none"
          readOnly
        />

        <button onClick={onToggleFavorite} className="p-2 press-scale">
          <svg
            className={`w-6 h-6 transition-colors ${isFavorited ? 'text-[#ff2442] fill-[#ff2442]' : 'text-[#ccc]'}`}
            fill={isFavorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <a href={article.link} target="_blank" rel="noopener noreferrer" className="p-2 press-scale">
          <svg className="w-6 h-6 text-[#ccc]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
