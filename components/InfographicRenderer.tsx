import React, { forwardRef } from 'react';
import type { InfographicConfig } from '../types';

// ─── Style theme variables ────────────────────────────────────────────────────

interface StyleVars {
  bg: string;
  titleFont: string;
  titleColor: string;
  subtitleColor: string;
  textColor: string;
  sectionTitleColor: string;
  ingBg: string;
  ingBorder: string;
  stepNumBg: string;
  stepNumColor: string;
  cardBg: string;
  cardBorder: string;
  divider: string;
  ingPalette: string[];
  badges: Record<string, { bg: string; text: string; border: string }>;
}

const FONT = "'Be Vietnam Pro', 'Segoe UI', Arial, sans-serif";

const STYLES: Record<string, StyleVars> = {
  soft_pastel: {
    bg: '#f7ede0',
    titleFont: FONT,
    titleColor: '#3d2010',
    subtitleColor: '#8a6040',
    textColor: '#5a3820',
    sectionTitleColor: '#4a2c14',
    ingBg: '#fffaf4',
    ingBorder: '#e8c09a',
    stepNumBg: '#d4906a',
    stepNumColor: '#ffffff',
    cardBg: 'rgba(255,250,244,0.75)',
    cardBorder: '#e8d0b4',
    divider: '#e0c0a0',
    ingPalette: ['#f8d0b4', '#c8ecd8', '#f8e4b4', '#d4caf0', '#f4c8d8', '#c4d8f4', '#d0f0c4', '#f4d8c4'],
    badges: {
      pink:     { bg: '#fde8e0', text: '#b84030', border: '#f4b0a0' },
      mint:     { bg: '#e0f4ea', text: '#1a6040', border: '#9adcb8' },
      peach:    { bg: '#fdecd8', text: '#b86020', border: '#f4c090' },
      lavender: { bg: '#ece0f4', text: '#6a2090', border: '#c0a0e0' },
      blue:     { bg: '#dce8f8', text: '#1a4080', border: '#90b8e8' },
      green:    { bg: '#ddf4e0', text: '#1a6030', border: '#90d8a0' },
      orange:   { bg: '#fdecd4', text: '#b85010', border: '#f4b880' },
      yellow:   { bg: '#fdf4d0', text: '#a07010', border: '#f0d880' },
    },
  },
  clean_modern: {
    bg: '#ffffff',
    titleFont: FONT,
    titleColor: '#0a0a1a',
    subtitleColor: '#4a4a6a',
    textColor: '#3a3a5a',
    sectionTitleColor: '#1a1a3a',
    ingBg: '#f4f6fa',
    ingBorder: '#d4dae8',
    stepNumBg: '#2060c8',
    stepNumColor: '#ffffff',
    cardBg: '#f4f6fa',
    cardBorder: '#d4dae8',
    divider: '#d0d5e0',
    ingPalette: ['#e4ecf8', '#daf0ec', '#f8f0dc', '#ede4f8', '#daeef8', '#f0f8dc', '#f8e4e8', '#e4f0f8'],
    badges: {
      pink:     { bg: '#fce8e8', text: '#c02020', border: '#f0a8a8' },
      mint:     { bg: '#e0f4ec', text: '#186040', border: '#90d8b4' },
      peach:    { bg: '#fdecd8', text: '#c05820', border: '#f4c090' },
      lavender: { bg: '#ece0f8', text: '#601890', border: '#c0a0e8' },
      blue:     { bg: '#dce8f8', text: '#1840a0', border: '#90b8e8' },
      green:    { bg: '#ddf4e2', text: '#186030', border: '#8ed8a4' },
      orange:   { bg: '#fdecd4', text: '#b85010', border: '#f4c080' },
      yellow:   { bg: '#fdf4cc', text: '#a07010', border: '#f0d870' },
    },
  },
  dark_luxury: {
    bg: '#141414',
    titleFont: FONT,
    titleColor: '#d4af37',
    subtitleColor: '#a08858',
    textColor: '#c8b890',
    sectionTitleColor: '#d4af37',
    ingBg: 'rgba(212,175,55,0.09)',
    ingBorder: 'rgba(212,175,55,0.38)',
    stepNumBg: '#d4af37',
    stepNumColor: '#0d0d0d',
    cardBg: 'rgba(255,255,255,0.05)',
    cardBorder: 'rgba(212,175,55,0.28)',
    divider: 'rgba(212,175,55,0.22)',
    ingPalette: [
      'rgba(212,175,55,0.22)', 'rgba(80,200,140,0.18)', 'rgba(212,150,80,0.22)',
      'rgba(160,100,220,0.18)', 'rgba(80,140,220,0.18)', 'rgba(212,100,80,0.18)',
      'rgba(80,200,200,0.18)', 'rgba(220,80,160,0.18)',
    ],
    badges: {
      pink:     { bg: 'rgba(220,100,80,0.18)',  text: '#e09080', border: 'rgba(220,100,80,0.38)' },
      mint:     { bg: 'rgba(80,200,140,0.15)',  text: '#60d8a0', border: 'rgba(80,200,140,0.35)' },
      peach:    { bg: 'rgba(220,150,80,0.18)',  text: '#e0a060', border: 'rgba(220,150,80,0.38)' },
      lavender: { bg: 'rgba(160,100,220,0.18)', text: '#c080e8', border: 'rgba(160,100,220,0.38)' },
      blue:     { bg: 'rgba(80,140,220,0.18)',  text: '#80b0e8', border: 'rgba(80,140,220,0.38)' },
      green:    { bg: 'rgba(80,200,100,0.15)',  text: '#60d870', border: 'rgba(80,200,100,0.35)' },
      orange:   { bg: 'rgba(220,140,60,0.18)',  text: '#e0a050', border: 'rgba(220,140,60,0.38)' },
      yellow:   { bg: 'rgba(220,200,60,0.15)',  text: '#e0d040', border: 'rgba(220,200,60,0.35)' },
    },
  },
  colorful_vibrant: {
    bg: '#fff7ee',
    titleFont: FONT,
    titleColor: '#cc2800',
    subtitleColor: '#e06000',
    textColor: '#4a2a10',
    sectionTitleColor: '#cc2800',
    ingBg: '#ffffff',
    ingBorder: '#ffc070',
    stepNumBg: '#ff5500',
    stepNumColor: '#ffffff',
    cardBg: 'rgba(255,255,255,0.88)',
    cardBorder: '#ffc080',
    divider: '#ffd090',
    ingPalette: ['#ffe0cc', '#ccf0e0', '#ffe8c0', '#e4ccf4', '#ffd0e8', '#ccecf8', '#d8f0c0', '#f8e0cc'],
    badges: {
      pink:     { bg: '#fde0d8', text: '#c02828', border: '#f8a090' },
      mint:     { bg: '#d8f4e4', text: '#186040', border: '#88d8a4' },
      peach:    { bg: '#fdecd8', text: '#cc5000', border: '#f8c080' },
      lavender: { bg: '#ecdcf8', text: '#6010a0', border: '#c898e8' },
      blue:     { bg: '#d8e8f8', text: '#1040a8', border: '#88b0e8' },
      green:    { bg: '#d8f4dc', text: '#106030', border: '#88d898' },
      orange:   { bg: '#fde8cc', text: '#c84000', border: '#f8c078' },
      yellow:   { bg: '#fdf4c0', text: '#a07000', border: '#f0d868' },
    },
  },
  korean_minimal: {
    bg: '#f2ebe2',
    titleFont: FONT,
    titleColor: '#2c2018',
    subtitleColor: '#7a6a58',
    textColor: '#6a5848',
    sectionTitleColor: '#3a2c20',
    ingBg: 'rgba(255,250,244,0.88)',
    ingBorder: 'rgba(180,148,116,0.32)',
    stepNumBg: '#b89060',
    stepNumColor: '#ffffff',
    cardBg: 'rgba(255,250,244,0.65)',
    cardBorder: 'rgba(180,148,116,0.28)',
    divider: 'rgba(180,148,116,0.22)',
    ingPalette: ['#f0e4d4', '#d4ecd8', '#f0ecd4', '#e4d4f0', '#d4e4f0', '#d4f0d8', '#f0d4e8', '#d4ecf0'],
    badges: {
      pink:     { bg: '#f8e8e0', text: '#a84030', border: '#e8b8a8' },
      mint:     { bg: '#e4f0e8', text: '#286048', border: '#a8d8b8' },
      peach:    { bg: '#f8ece0', text: '#a86020', border: '#e8c8a0' },
      lavender: { bg: '#ece4f4', text: '#684090', border: '#c8b0e0' },
      blue:     { bg: '#e0eaf4', text: '#284888', border: '#a8c0e0' },
      green:    { bg: '#e4f0e4', text: '#285828', border: '#a8d0a8' },
      orange:   { bg: '#f8ede0', text: '#a85010', border: '#e8c4a0' },
      yellow:   { bg: '#f8f0d8', text: '#887018', border: '#e8d898' },
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getIngColor(palette: string[], i: number) {
  return palette[i % palette.length];
}

function getBadgeColors(sv: StyleVars, color: string) {
  return sv.badges[color] || sv.badges.pink;
}

// ─── Sub-renderers ────────────────────────────────────────────────────────────

function Badges({ config, sv }: { config: InfographicConfig; sv: StyleVars }) {
  const filled = config.badges.filter(b => b.label || b.value);
  if (filled.length === 0) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 36, flexWrap: 'wrap' }}>
      {filled.map((badge, i) => {
        const bc = getBadgeColors(sv, badge.color);
        return (
          <div key={i} style={{
            background: bc.bg,
            border: `2px solid ${bc.border}`,
            borderRadius: 100,
            padding: '12px 22px',
            textAlign: 'center',
            minWidth: 100,
          }}>
            <div style={{ fontSize: 10, color: bc.text, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>
              {badge.label}
            </div>
            <div style={{ fontSize: 18, color: bc.text, fontWeight: 900, lineHeight: 1 }}>
              {badge.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Ingredients({ config, sv }: { config: InfographicConfig; sv: StyleVars }) {
  const filled = config.ingredients.filter(i => i.name);
  return (
    <div>
      <div style={{
        fontSize: 18, fontWeight: 800, color: sv.sectionTitleColor,
        marginBottom: 18, fontFamily: sv.titleFont, letterSpacing: '-0.3px',
        paddingBottom: 10, borderBottom: `2px solid ${sv.divider}`,
      }}>
        {config.leftSectionTitle || 'Nguyên Liệu'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {filled.map((ing, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
              background: getIngColor(sv.ingPalette, i),
              border: `2px solid ${sv.ingBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: ing.amount ? 11 : 15, fontWeight: 800,
              color: sv.sectionTitleColor, textAlign: 'center', padding: 2,
              lineHeight: 1.1,
            }}>
              {ing.amount || (i + 1)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: sv.textColor, lineHeight: 1.3 }}>
                {ing.name}
              </div>
              {ing.note && (
                <div style={{ fontSize: 11, color: sv.subtitleColor, marginTop: 1, lineHeight: 1.3 }}>
                  {ing.note}
                </div>
              )}
            </div>
          </div>
        ))}
        {filled.length === 0 && (
          <p style={{ color: sv.subtitleColor, fontSize: 12, fontStyle: 'italic' }}>Chưa có thành phần</p>
        )}
      </div>
    </div>
  );
}

function Steps({ config, sv }: { config: InfographicConfig; sv: StyleVars }) {
  const filled = config.steps.filter(s => s.title);
  return (
    <div>
      <div style={{
        fontSize: 18, fontWeight: 800, color: sv.sectionTitleColor,
        marginBottom: 18, fontFamily: sv.titleFont, letterSpacing: '-0.3px',
        paddingBottom: 10, borderBottom: `2px solid ${sv.divider}`,
      }}>
        {config.rightSectionTitle || 'Quy Trình'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filled.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: sv.stepNumBg, color: sv.stepNumColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 14,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}>
              {i + 1}
            </div>
            <div style={{ flex: 1, paddingTop: 3 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: sv.textColor, lineHeight: 1.3 }}>
                {step.title}
              </div>
              {step.description && (
                <div style={{ fontSize: 11, color: sv.subtitleColor, marginTop: 4, lineHeight: 1.55 }}>
                  {step.description}
                </div>
              )}
            </div>
          </div>
        ))}
        {filled.length === 0 && (
          <p style={{ color: sv.subtitleColor, fontSize: 12, fontStyle: 'italic' }}>Chưa có bước thực hiện</p>
        )}
      </div>
      {config.additionalNotes && (
        <div style={{
          marginTop: 18, padding: '10px 14px',
          background: sv.cardBg, border: `1px solid ${sv.cardBorder}`,
          borderRadius: 10, color: sv.subtitleColor, fontSize: 11, lineHeight: 1.5,
        }}>
          <span style={{ fontWeight: 700, color: sv.textColor }}>Ghi chú: </span>
          {config.additionalNotes}
        </div>
      )}
    </div>
  );
}

function HeroImage({ heroImageUrl, sv, label }: { heroImageUrl: string | null; sv: StyleVars; label?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: '100%', borderRadius: 20, overflow: 'hidden',
        background: sv.cardBg, border: `2px solid ${sv.cardBorder}`,
        boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
      }}>
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt="Hero"
            crossOrigin="anonymous"
            style={{ width: '100%', height: 360, objectFit: 'contain', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: 360,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 72, color: sv.subtitleColor,
          }}>🍲</div>
        )}
      </div>
      {label && (
        <div style={{ fontSize: 13, color: sv.subtitleColor, fontStyle: 'italic', textAlign: 'center' }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ─── Layout variants ──────────────────────────────────────────────────────────

function ClassicLayout({ config, sv, heroImageUrl }: { config: InfographicConfig; sv: StyleVars; heroImageUrl: string | null }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 240px', gap: 36, alignItems: 'start' }}>
      <Ingredients config={config} sv={sv} />
      <HeroImage heroImageUrl={heroImageUrl} sv={sv} />
      <Steps config={config} sv={sv} />
    </div>
  );
}

function HeroCenterLayout({ config, sv, heroImageUrl }: { config: InfographicConfig; sv: StyleVars; heroImageUrl: string | null }) {
  return (
    <div>
      <div style={{ marginBottom: 32 }}><HeroImage heroImageUrl={heroImageUrl} sv={sv} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <Ingredients config={config} sv={sv} />
        <Steps config={config} sv={sv} />
      </div>
    </div>
  );
}

function LeftHeroLayout({ config, sv, heroImageUrl }: { config: InfographicConfig; sv: StyleVars; heroImageUrl: string | null }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, alignItems: 'start' }}>
      <HeroImage heroImageUrl={heroImageUrl} sv={sv} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <Ingredients config={config} sv={sv} />
        <Steps config={config} sv={sv} />
      </div>
    </div>
  );
}

function TopHeroLayout({ config, sv, heroImageUrl }: { config: InfographicConfig; sv: StyleVars; heroImageUrl: string | null }) {
  return (
    <div>
      <div style={{ marginBottom: 32 }}><HeroImage heroImageUrl={heroImageUrl} sv={sv} /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <Ingredients config={config} sv={sv} />
        <Steps config={config} sv={sv} />
      </div>
    </div>
  );
}

function GridLayout({ config, sv, heroImageUrl }: { config: InfographicConfig; sv: StyleVars; heroImageUrl: string | null }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 36, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <HeroImage heroImageUrl={heroImageUrl} sv={sv} />
        <Steps config={config} sv={sv} />
      </div>
      <Ingredients config={config} sv={sv} />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface Props {
  config: InfographicConfig;
  heroImageUrl: string | null;
}

export const InfographicRenderer = forwardRef<HTMLDivElement, Props>(
  ({ config, heroImageUrl }, ref) => {
    const sv = STYLES[config.style] || STYLES.soft_pastel;

    const renderLayout = () => {
      const props = { config, sv, heroImageUrl };
      switch (config.layout) {
        case 'hero_center':   return <HeroCenterLayout {...props} />;
        case 'left_hero':     return <LeftHeroLayout {...props} />;
        case 'top_hero':      return <TopHeroLayout {...props} />;
        case 'grid_showcase': return <GridLayout {...props} />;
        default:              return <ClassicLayout {...props} />;
      }
    };

    return (
      <div
        ref={ref}
        style={{
          width: 1200,
          background: sv.bg,
          borderRadius: 28,
          padding: '52px 60px',
          fontFamily: sv.titleFont,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Title */}
        <div style={{
          textAlign: 'center',
          fontSize: 62,
          fontWeight: 900,
          color: sv.titleColor,
          marginBottom: config.subtitle ? 6 : 28,
          lineHeight: 1.15,
          letterSpacing: '-1.5px',
          fontFamily: sv.titleFont,
        }}>
          {config.title || 'Tiêu đề'}
        </div>

        {/* Subtitle */}
        {config.subtitle && (
          <div style={{
            textAlign: 'center',
            fontSize: 18,
            color: sv.subtitleColor,
            marginBottom: 22,
            fontWeight: 500,
            letterSpacing: '0.2px',
          }}>
            {config.subtitle}
          </div>
        )}

        {/* Badges */}
        <Badges config={config} sv={sv} />

        {/* Layout */}
        {renderLayout()}
      </div>
    );
  }
);

InfographicRenderer.displayName = 'InfographicRenderer';
