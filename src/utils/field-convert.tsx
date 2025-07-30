function Field({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  const display =
    value === null || value === undefined || value === ''
      ? '—'
      : typeof value === 'number'
        ? String(value)
        : String(value);
  return (
    <div className="space-y-1">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="text-sm break-words">{display}</div>
    </div>
  );
}

export { Field };
