import Image from 'next/image';

type LogoProps = {
  variant?: 'horizontal' | 'mark-only' | 'full';
  className?: string;
  invertText?: boolean;
};

export function Logo({ variant = 'horizontal', className = '', invertText = false }: LogoProps) {
  const textColor = invertText ? 'text-cream' : 'text-ink';
  const subColor = invertText ? 'text-cream/60' : 'text-ink-mute';

  if (variant === 'mark-only') {
    return (
      <Image
        src="/images/brand/logo-mark.png"
        alt="Bytes & Tales"
        width={48}
        height={64}
        className={className}
        priority
      />
    );
  }

  if (variant === 'full') {
    return (
      <Image
        src="/images/brand/logo-transparent.png"
        alt="Bytes & Tales"
        width={400}
        height={266}
        className={className}
        priority
      />
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/images/brand/logo-mark.png"
        alt=""
        width={28}
        height={36}
        className="shrink-0"
        priority
      />
      <div className="leading-tight">
        <div className={`font-display text-lg ${textColor}`}>Bytes &amp; Tales</div>
        <div className={`font-sans text-[10px] uppercase tracking-[0.28em] mt-0.5 ${subColor}`}>
          Manchester · Est. 2024
        </div>
      </div>
    </div>
  );
}
