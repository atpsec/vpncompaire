function daysSince(value: string): number | null {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;
  return Math.max(0, Math.floor((Date.now() - date.valueOf()) / 86_400_000));
}

export function Freshness({ checkedAt }: { checkedAt: string | null }) {
  if (!checkedAt) {
    return <span className="text-ink-muted">Not yet verified</span>;
  }
  const days = daysSince(checkedAt);
  const label = days === null ? checkedAt : days === 0 ? "Verified today" : `Verified ${days} days ago`;
  const stale = days !== null && days > 90;
  return (
    <span className={stale ? "text-orange-700" : "text-ink-muted"} title={`Checked ${checkedAt}`}>
      {stale ? "Verification may be stale · " : ""}{label} ({checkedAt})
    </span>
  );
}

export function LastVerified({ value }: { value: string | null }) {
  return (
    <p className="text-sm text-ink-muted">
      Last verified: <Freshness checkedAt={value} />
    </p>
  );
}
