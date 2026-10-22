'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ColorPreset {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
  accent: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'forest-green',
    name: 'Vedic Forest Green (Original)',
    primary: '#1b4332',
    primaryHover: '#143225',
    accent: '#d4a373',
  },
  {
    id: 'amber-gold',
    name: 'Heritage Amber Gold',
    primary: '#854d0e',
    primaryHover: '#713f12',
    accent: '#fbbf24',
  },
  {
    id: 'earthy-terracotta',
    name: 'Earthy Terracotta',
    primary: '#9a3412',
    primaryHover: '#7c2d12',
    accent: '#ea580c',
  },
  {
    id: 'organic-emerald',
    name: 'Organic Emerald',
    primary: '#065f46',
    primaryHover: '#044e39',
    accent: '#34d399',
  },
  {
    id: 'royal-indigo',
    name: 'Royal Heritage Indigo',
    primary: '#1e3a8a',
    primaryHover: '#172554',
    accent: '#60a5fa',
  },
  {
    id: 'midnight-luxury',
    name: 'Midnight Luxury Charcoal',
    primary: '#0f172a',
    primaryHover: '#020617',
    accent: '#e2e8f0',
  },
];

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  primaryColor: string;
  primaryHover: string;
  accentColor: string;
  setColors: (primary: string, hover: string, accent: string) => void;
  applyPreset: (presetId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [primaryColor, setPrimaryColor] = useState('#1b4332');
  const [primaryHover, setPrimaryHover] = useState('#143225');
  const [accentColor, setAccentColor] = useState('#d4a373');

  // Load saved theme on mount
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('rosier_theme_mode') as ThemeMode;
      if (savedMode === 'dark' || savedMode === 'light') {
        setModeState(savedMode);
        if (savedMode === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        // Default strictly to 'light' to match Rosier Foods authentic warm ivory branding
        setModeState('light');
        document.documentElement.classList.remove('dark');
      }

      const savedPrimary = localStorage.getItem('rosier_primary_color');
      const savedHover = localStorage.getItem('rosier_primary_hover');
      const savedAccent = localStorage.getItem('rosier_accent_color');

      if (savedPrimary) setPrimaryColor(savedPrimary);
      if (savedHover) setPrimaryHover(savedHover);
      if (savedAccent) setAccentColor(savedAccent);
    } catch (e) {
      console.warn('Could not read theme settings from localStorage', e);
    }
  }, []);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('rosier_theme_mode', newMode);
    if (newMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const setColors = (primary: string, hover: string, accent: string) => {
    setPrimaryColor(primary);
    setPrimaryHover(hover);
    setAccentColor(accent);
    localStorage.setItem('rosier_primary_color', primary);
    localStorage.setItem('rosier_primary_hover', hover);
    localStorage.setItem('rosier_accent_color', accent);
  };

  const applyPreset = (presetId: string) => {
    const preset = COLOR_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setColors(preset.primary, preset.primaryHover, preset.accent);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        primaryColor,
        primaryHover,
        accentColor,
        setColors,
        applyPreset,
      }}
    >
      {/* Dynamically inject CSS variables for branding color overrides */}
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --brand-primary: ${primaryColor};
            --brand-primary-hover: ${primaryHover};
            --brand-accent: ${accentColor};
          }
          .bg-brand-primary { background-color: var(--brand-primary) !important; }
          .text-brand-primary { color: var(--brand-primary) !important; }
          .border-brand-primary { border-color: var(--brand-primary) !important; }
          .hover\\:bg-brand-primary:hover { background-color: var(--brand-primary-hover) !important; }
        `
      }} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
