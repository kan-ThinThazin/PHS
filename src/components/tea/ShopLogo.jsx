export default function ShopLogo({ size = 'md' }) {
  const dim = size === 'sm' ? 32 : size === 'lg' ? 56 : 40;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pyi Htaung Hsu Tea Shop Logo"
    >
      {/* Outer circle - deep ink */}
      <circle cx="40" cy="40" r="38" fill="#1F1B18" />

      {/* Inner ring accent */}
      <circle cx="40" cy="40" r="34" fill="none" stroke="#B37227" strokeWidth="1" opacity="0.5" />

      {/* Tea leaf - green */}
      <path
        d="M40 14 C28 18 22 30 26 42 C30 50 40 54 40 54 C40 54 50 50 54 42 C58 30 52 18 40 14Z"
        fill="#4A6741"
      />
      {/* Leaf vein */}
      <line x1="40" y1="16" x2="40" y2="52" stroke="#F9F5EF" strokeWidth="0.8" opacity="0.5" />

      {/* Cup body - amber/honey */}
      <path
        d="M26 52 L28 66 Q40 70 52 66 L54 52 Z"
        fill="#B37227"
      />

      {/* Cup steam wisps */}
      <path d="M33 48 Q31 43 33 40" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" fill="none" />
      <path d="M40 46 Q38 41 40 38" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" fill="none" />
      <path d="M47 48 Q45 43 47 40" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" fill="none" />

      {/* Flag stripe colors — Myanmar-inspired */}
      {/* Red accent dot top */}
      <circle cx="40" cy="10" r="3" fill="#CE1126" />
      {/* Yellow star dots */}
      <circle cx="30" cy="13" r="2" fill="#FECB00" />
      <circle cx="50" cy="13" r="2" fill="#FECB00" />

      {/* Bottom accent band */}
      <path d="M15 68 Q40 74 65 68" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  );
}