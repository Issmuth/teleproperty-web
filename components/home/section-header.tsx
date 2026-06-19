type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg lg:text-xl font-black text-gray-900">
        {title}
      </h2>
      {actionLabel && onActionPress && (
        <button
          onClick={onActionPress}
          className="text-sm font-bold text-[#0B8F55] hover:text-[#0A7A4A] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
