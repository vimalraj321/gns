interface StatDisplayProps {
  label: string;
  value: string | number;
  alignment?: 'left' | 'center' | 'right';
}

export function StatDisplay({ label, value, alignment = 'left' }: StatDisplayProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={alignmentClasses[alignment]}>
      <h3 className="text-gray-400 text-sm">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}