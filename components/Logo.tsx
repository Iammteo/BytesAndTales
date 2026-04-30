import Image from 'next/image';

type LogoProps = {
  variant?: 'horizontal' | 'mark-only' | 'full';
  className?: string;
  /**
   * When the logo sits on the wine hero (transparent nav state),
   * pass onWine={true} so the mark gets a contrasting cream ring
   * and the wordmark switches to cream for readability.
   */
  onWine?: boolean;
  /** Force a specific colour for the wordmark, overriding onWine logic. */
  invertText?: boolean;
};

export function Logo({
  variant = 'horizontal',
  className = '',
  onWine = false,
  invertText,
}: LogoProps) {
  const useCreamText = invertText ?? onWine;
  const textColor = useCreamText ? 'text-cream' : 'text-ink';
  const subColor = useCreamText ? 'text-cream/70' : 'text-ink-mute';

  const markWrapperClass = onWine
    ? 'relative shrink-0 rounded-full bg-cream/95 p-1.5 ring-2 ring-cream/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.4)] transition-all duration-300'
    : 'relative shrink-0 transition-all duration-300';

  if (variant === 'mark-only') {
    return (
      <div className={markWrapperClass}>
        <Image
          src="/images/brand/logo-mark.png"
          alt="Bytes & Tales"
          width={48}
          height={64}
          className={className}
          priority
        />
      </div>
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
      <div className={markWrapperClass}>
        <Image
          src="/images/brand/logo-mark.png"
          alt=""
          width={28}
          height={36}
          className="block"
          priority
        />
      </div>
      <div className="leading-tight">
        <div className={`font-display text-lg ${textColor}`}>Bytes &amp; Tales</div>
        <div
          className={`font-sans text-[10px] uppercase tracking-[0.28em] mt-0.5 ${subColor}`}
        >
          Manchester · Est. 2024
        </div>
      </div>
    </div>
  );
}