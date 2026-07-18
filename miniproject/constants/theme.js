export const COLORS = {
  // Core palette
  primary: '#070355ff',       
  primaryDark: '#3730A3',   
  primaryLight: '#41488bff',  
  accent: '#053f49ff',        
  accentLight: '#8ae0ecff',   

  // Backgrounds
  background: '#F1F5F9',    // Slate 100
  backgroundDark: '#E2E8F0',// Slate 200
  card: '#FFFFFF',

  // Text
  text: '#0F172A',          // Slate 900
  textMedium: '#334155',    // Slate 700
  subtext: '#64748B',       // Slate 500
  textLight: '#94A3B8',     // Slate 400

  // Semantic
  danger: '#EF4444',        // Red 500
  dangerDark: '#fa6666ff',    // Red 600
  success: '#10B981',       // Emerald 500
  warning: '#F59E0B',       // Amber 500
  info: '#3B82F6',          // Blue 500

  // UI
  border: '#E2E8F0',        // Slate 200
  divider: '#F1F5F9',
  white: '#FFFFFF',
  overlay: 'rgba(15,23,42,0.5)',
};

export const SHADOWS = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const RADIUS = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
};

// Action card colors — one per card type
export const CARD_COLORS = {
  'New Survey':  ['#070269ff', '#2b0b61ff'],  // Indigo → Purple
  'Camera':      ['#070269ff', '#2b0b61ff'],  // Teal → Cyan
  'Location':    ['#070269ff', '#2b0b61ff'],  // Emerald
  'Contacts':    ['#070269ff', '#2b0b61ff'],  // Amber
  'Clipboard':   ['#070269ff', '#2b0b61ff'],  // Purple → Violet
  'History':     ['#070269ff', '#2b0b61ff'],  // Pink
};