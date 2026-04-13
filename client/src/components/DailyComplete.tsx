interface Props {
  count: number;
  limit: number;
}

export function DailyComplete({ count, limit }: Props) {
  return (
    <div className="flex flex-col items-center justify-center pt-28 px-8 fade-in">
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-5 shadow-sm">
        <span className="text-5xl">🌿</span>
      </div>
      <h2 className="text-base font-bold text-[#333] mb-2">
        今天看完了
      </h2>
      <p className="text-sm text-[#999] text-center leading-relaxed mb-1">
        今日已读 {count}/{limit} 篇优质内容
      </p>
      <p className="text-xs text-[#ccc] text-center">
        去做点别的事情吧，明天见 ☀️
      </p>
      <div className="mt-8 w-24 h-0.5 rounded-full bg-[#e5e7eb]" />
    </div>
  );
}
