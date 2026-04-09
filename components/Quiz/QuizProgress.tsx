interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="h-[3px] bg-slate-100" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      <div
        className="relative h-full rounded-r-sm bg-gradient-to-r from-blue to-indigo-400 transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ width: `${percentage}%` }}
      >
        <span className="absolute -right-1 top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-blue shadow-[0_0_0_3px_var(--color-blue-glow)]" />
      </div>
    </div>
  );
}
