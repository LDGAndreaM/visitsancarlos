export type SocialNetwork = "facebook" | "instagram" | "tiktok" | "twitter" | "linkedin";

type SocialIconProps = {
  network: SocialNetwork;
  size?: number;
};

export default function SocialIcon({ network, size = 14 }: SocialIconProps) {
  const common = { width: size, height: size, viewBox: "0 0 24 24" } as const;
  switch (network) {
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M15 3h-2c-2.21 0-4 1.79-4 4v2H7v4h2v8h4v-8h3l1-4h-4V7c0-.55.45-1 1-1h3V3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} fill="currentColor">
          <path d="M16.5 3c.3 2.1 1.7 3.7 3.8 4v3c-1.4 0-2.7-.4-3.8-1.2v6.6c0 3.3-2.7 5.6-5.7 5.6-3.1 0-5.7-2.5-5.7-5.6 0-3.1 2.6-5.6 5.7-5.6.4 0 .8 0 1.1.1v3.1c-.3-.1-.7-.2-1.1-.2-1.4 0-2.6 1.1-2.6 2.6s1.2 2.6 2.6 2.6c1.5 0 2.7-1.1 2.7-2.6V3h3z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.3 3H21l-6.5 7.4L22 21h-6.1l-4.8-6.3L5.6 21H3l7-8-7.3-10h6.2l4.3 5.8L18.3 3z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <rect x="3" y="9" width="4" height="12" />
          <circle cx="5" cy="4" r="2.2" />
          <path d="M10 9h4v2c1-1.5 2.6-2.3 4.3-2.3 3.2 0 4.7 2.1 4.7 5.9V21h-4v-6c0-1.6-.6-2.7-2-2.7-1.1 0-1.8.8-2.1 1.5-.1.3-.1.6-.1 1V21h-4V9z" />
        </svg>
      );
  }
}
