export interface HomePalette {
  id: string;
  name: string;
  mood: string;
  paper: string;
  ink: string;
  muted: string;
  accent: string;
  line: string;
  wash: string;
  onAccent: string;
  accentHover: string;
  scheme: 'light' | 'dark';
  headingAccent?: string;
  button?: string;
  buttonHover?: string;
  onButton?: string;
  reference?: { name: string; url: string };
  swatches?: readonly string[];
}

export const homePalettes = [
  {
    id: 'cobalt', name: 'Cobalt & Chalk', mood: 'Crisp, confident, and a little more electric.',
    paper: '#F7F8FC', ink: '#172033', muted: '#566175', accent: '#2451B2',
    line: '#D7DDE9', wash: '#E9EEF8', onAccent: '#FFFFFF', accentHover: '#193F91', scheme: 'light',
  },
  {
    id: 'terracotta', name: 'Terracotta & Linen', mood: 'Warm, tactile, and distinctly personal.',
    paper: '#FBF5EC', ink: '#33261F', muted: '#716055', accent: '#A14329',
    line: '#E0D1C3', wash: '#F0E5D7', onAccent: '#FFFFFF', accentHover: '#85361F', scheme: 'light',
  },
  {
    id: 'mulberry', name: 'Mulberry & Porcelain', mood: 'Rich plum with a soft, editorial feel.',
    paper: '#FBF7FB', ink: '#2E2333', muted: '#706076', accent: '#74345E',
    line: '#DFD2DF', wash: '#F0E7F0', onAccent: '#FFFFFF', accentHover: '#5D274B', scheme: 'light',
  },
  {
    id: 'petrol', name: 'Petrol & Sea Glass', mood: 'Fresh and calm, with deeper blue-green contrast.',
    paper: '#F3FAF7', ink: '#19322F', muted: '#526B63', accent: '#146763',
    line: '#CDDDD6', wash: '#E3F0EA', onAccent: '#FFFFFF', accentHover: '#0E514E', scheme: 'light',
  },
  {
    id: 'midnight', name: 'Midnight & Amber', mood: 'Dark ink, warm light, and the boldest contrast.',
    paper: '#17201F', ink: '#F7F0DE', muted: '#B8C4BC', accent: '#E7B86C',
    line: '#3D4A44', wash: '#22302D', onAccent: '#19231F', accentHover: '#F2CC8E', scheme: 'dark',
  },
] as const satisfies readonly HomePalette[];

// A second study uses color as the canvas, rather than a tint behind one accent.
export const boldHomePalettes = [
  {
    id: 'acid', name: 'Acid Press', mood: 'Chartreuse across the canvas. Dark ink, graphic contrast, and plenty of energy.',
    paper: '#DFF35A', ink: '#1F2A16', muted: '#4C512A', accent: '#263D16',
    line: '#94A448', wash: '#F0F7AE', onAccent: '#F1F7C7', accentHover: '#16290B', scheme: 'light',
  },
  {
    id: 'tomato', name: 'Tomato Studio', mood: 'A vivid red canvas with near-black type and peach surfaces.',
    paper: '#F34D35', ink: '#241711', muted: '#2E1B14', accent: '#241711',
    line: '#AA3828', wash: '#FBC4AD', onAccent: '#FFF2D6', accentHover: '#3E1B10', scheme: 'light',
  },
  {
    id: 'bubblegum', name: 'Bubblegum & Espresso', mood: 'Pink and deep brown. Playful color with the warmth of a printed magazine.',
    paper: '#F3B7D1', ink: '#3B251D', muted: '#66402F', accent: '#4D3429',
    line: '#B77D96', wash: '#F8D2E2', onAccent: '#FAE5A1', accentHover: '#2C1A14', scheme: 'light',
  },
  {
    id: 'pool', name: 'Pool Blue & Oxblood', mood: 'Bright cyan with deep red accents. An unexpected, expressive pairing.',
    paper: '#92E9F4', ink: '#172B35', muted: '#365763', accent: '#803226',
    line: '#55AFBB', wash: '#C2F2F7', onAccent: '#FFF4DD', accentHover: '#5F2018', scheme: 'light',
  },
  {
    id: 'carbon', name: 'Carbon & Signal', mood: 'Black and off-white, punctuated by electric lime.',
    paper: '#111111', ink: '#F5F5F0', muted: '#BBBBB5', accent: '#C7F500',
    line: '#42423E', wash: '#232321', onAccent: '#171B0B', accentHover: '#D9FF4D', scheme: 'dark',
  },
] as const satisfies readonly HomePalette[];

// Adaptations of observed live websites, with different roles for text,
// navigation, buttons, and surfaces. See README for research sources.
export const referenceHomePalettes = [
  {
    id: 'oura', name: 'Oura', mood: 'Sand, charcoal, and a small olive panel. Warmth without a colored headline.',
    paper: '#F7F1E8', ink: '#4A4741', muted: '#646057', accent: '#4A4741',
    line: '#D5CABC', wash: '#EFE6DB', onAccent: '#F7F1E8', accentHover: '#302E2A', scheme: 'light',
    swatches: ['#F7F1E8', '#EFE6DB', '#CED4B8', '#4A4741'],
    reference: { name: 'Oura', url: 'https://ouraring.com/' },
  },
  {
    id: 'pentagram', name: 'Pentagram', mood: 'White, black, and restrained red details. Project images supply the color.',
    paper: '#FFFFFF', ink: '#1A1A1A', muted: '#606060', accent: '#C7192D',
    line: '#E3E4E5', wash: '#F3F3F3', onAccent: '#FFFFFF', accentHover: '#A51424', scheme: 'light',
    headingAccent: '#1A1A1A', button: '#1A1A1A', buttonHover: '#363636', onButton: '#FFFFFF',
    reference: { name: 'Pentagram', url: 'https://www.pentagram.com/' },
  },
  {
    id: 'apple', name: 'Apple', mood: 'A black hero, white content, and blue controls. Contrast comes from sections.',
    paper: '#FFFFFF', ink: '#1D1D1F', muted: '#626267', accent: '#0066CC',
    line: '#D2D2D7', wash: '#F5F5F7', onAccent: '#FFFFFF', accentHover: '#0058B0', scheme: 'light',
    headingAccent: '#1D1D1F', button: '#0071E3', buttonHover: '#0066CC', onButton: '#FFFFFF',
    swatches: ['#FFFFFF', '#F5F5F7', '#0071E3', '#000000'],
    reference: { name: 'Apple', url: 'https://www.apple.com/' },
  },
  {
    id: 'linear', name: 'Linear', mood: 'Graphite, silver, and white controls. Lilac appears only in small interactive details.',
    paper: '#08090A', ink: '#F7F8F8', muted: '#9DA3AD', accent: '#828FFF',
    line: '#37393A', wash: '#191A1B', onAccent: '#08090A', accentHover: '#A0AAFF', scheme: 'dark',
    headingAccent: '#F7F8F8', button: '#E5E5E6', buttonHover: '#FFFFFF', onButton: '#08090A',
    reference: { name: 'Linear', url: 'https://linear.app/' },
  },
  {
    id: 'stripe', name: 'Stripe', mood: 'White and deep navy, with violet controls and color confined to the hero’s edge.',
    paper: '#FFFFFF', ink: '#061B31', muted: '#506279', accent: '#533AFD',
    line: '#DDE3EC', wash: '#F2F6FB', onAccent: '#FFFFFF', accentHover: '#4025DC', scheme: 'light',
    headingAccent: '#061B31',
    swatches: ['#FFFFFF', '#D9E6FF', '#533AFD', '#061B31'],
    reference: { name: 'Stripe', url: 'https://stripe.com/' },
  },
] as const satisfies readonly HomePalette[];

export function paletteCSS(palette: HomePalette) {
  return `--color-paper:${palette.paper};--color-ink:${palette.ink};--color-muted:${palette.muted};--color-accent:${palette.accent};--color-line:${palette.line};--color-wash:${palette.wash};--color-on-accent:${palette.onAccent};--color-accent-hover:${palette.accentHover};--color-heading-accent:${palette.headingAccent ?? palette.accent};--color-button:${palette.button ?? palette.accent};--color-button-hover:${palette.buttonHover ?? palette.accentHover};--color-on-button:${palette.onButton ?? palette.onAccent};color-scheme:${palette.scheme};`;
}

// Original adaptations of warm, graphic brand palettes. These are local
// explorations, not exact copies of the references' brand specifications.
export const warmHomePalettes = [
  {
    id: 'espresso', name: 'Espresso', mood: 'Parchment, dark brown, and a quiet caramel panel. Warm and minimal.',
    paper: '#F3EDE2', ink: '#30271F', muted: '#6B5E51', accent: '#594330',
    line: '#D4C8B8', wash: '#E8DFD1', onAccent: '#FFF9ED', accentHover: '#382A1E', scheme: 'light',
    headingAccent: '#30271F', button: '#30271F', buttonHover: '#4C3A2C', onButton: '#FFF9ED',
    swatches: ['#F3EDE2', '#D8BE9D', '#594330', '#30271F'],
    reference: { name: 'Aesop', url: 'https://www.aesop.com/' },
  },
  {
    id: 'forest', name: 'Forest', mood: 'A deep green hero with cream type, followed by a light reading surface.',
    paper: '#FAF8F0', ink: '#253D2C', muted: '#596252', accent: '#325E3B',
    line: '#D5DACC', wash: '#EEF0E6', onAccent: '#FFF8E5', accentHover: '#203F27', scheme: 'light',
    headingAccent: '#253D2C',
    swatches: ['#FAF8F0', '#D4D9B5', '#325E3B', '#183B28'],
    reference: { name: 'Flamingo Estate', url: 'https://flamingoestate.com/' },
  },
  {
    id: 'vermilion', name: 'Vermilion', mood: 'White and charcoal, with red reserved for buttons, links, and a fine underline.',
    paper: '#FFFFFF', ink: '#242320', muted: '#64615D', accent: '#C52B1C',
    line: '#DEDEDA', wash: '#F3F2EE', onAccent: '#FFFFFF', accentHover: '#9F2116', scheme: 'light',
    headingAccent: '#242320',
    swatches: ['#FFFFFF', '#F3F2EE', '#C52B1C', '#242320'],
    reference: { name: 'Leica', url: 'https://leica-camera.com/' },
  },
  {
    id: 'ochre', name: 'Ochre', mood: 'Soft white and ink, with warm yellow behind the current role and primary action.',
    paper: '#FCFBF7', ink: '#29271E', muted: '#686350', accent: '#756020',
    line: '#DDD8C7', wash: '#F2EEDF', onAccent: '#FFFFFF', accentHover: '#564615', scheme: 'light',
    headingAccent: '#29271E', button: '#EBCB67', buttonHover: '#DBB545', onButton: '#29271E',
    swatches: ['#FCFBF7', '#F4E5AF', '#EBCB67', '#29271E'],
    reference: { name: 'Mailchimp', url: 'https://mailchimp.com/' },
  },
  {
    id: 'cocoa', name: 'Cocoa', mood: 'Dark chocolate and vanilla, with a pale rose detail. A warmer take on a dark page.',
    paper: '#29211D', ink: '#F6ECDD', muted: '#C7B5A7', accent: '#E6B7A5',
    line: '#65544A', wash: '#3A2E27', onAccent: '#29211D', accentHover: '#F3CEC0', scheme: 'dark',
    headingAccent: '#F6ECDD', button: '#F6ECDD', buttonHover: '#E6B7A5', onButton: '#29211D',
    swatches: ['#29211D', '#665043', '#E6B7A5', '#F6ECDD'],
    reference: { name: 'Ghia', url: 'https://drinkghia.com/' },
  },
] as const satisfies readonly HomePalette[];
