'use client';

import { useMemo } from 'react';
import Image from 'next/image';

interface LogoProps {
  /** The background color the logo sits on (hex). Used to decide if we invert to white. */
  bgColor: string;
  /** Optional custom logo URL — if not set, falls back to /logo.png */
  src?: string | null;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace('#', '');
  const full =
    cleaned.length === 3
      ? cleaned.split('').map((c) => c + c).join('')
      : cleaned;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function luminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function isDark(hex: string): boolean {
  try {
    const [r, g, b] = hexToRgb(hex);
    return luminance(r, g, b) < 0.35;
  } catch {
    return false;
  }
}

/**
 * Smart Logo — renders the logo image (admin-set URL or default /logo.png)
 * and auto-inverts to white on dark backgrounds for perfect legibility.
 * Uses next/image for automatic WebP/AVIF optimization.
 */
export function Logo({ bgColor, src, className = '' }: LogoProps) {
  const dark = useMemo(() => isDark(bgColor), [bgColor]);
  const logoSrc = src || '/logo.png';
  const isExternal = logoSrc.startsWith('http');

  const imgStyle = {
    filter: dark ? 'brightness(0) invert(1)' : 'none',
    transition: 'filter 0.3s ease',
  };

  if (isExternal) {
    // For dynamic external URLs (from admin), we still use next/image but unoptimized won't apply
    // We need width/height for next/image — we use fill with a container instead
    return (
      <div className={`relative ${className}`} style={{ width: 'auto', aspectRatio: '4/1' }}>
        <Image
          src={logoSrc}
          alt="Innova Tech"
          fill
          className="object-contain"
          style={imgStyle}
          priority
        />
      </div>
    );
  }

  // For local /logo.png, use optimized next/image with known dimensions
  return (
    <Image
      src={logoSrc}
      alt="Innova Tech"
      width={140}
      height={35}
      className={`object-contain ${className}`}
      style={{ ...imgStyle, width: 'auto' }}
      priority
    />
  );
}
