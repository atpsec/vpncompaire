type SiteMarkProps = {
  className?: string;
};

export function SiteMark({ className }: SiteMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3.5 25 7v7.3c0 6.1-3.8 10.8-9 14.2-5.2-3.4-9-8.1-9-14.2V7l9-3.5Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m11.5 15.6 3 3 6-6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
