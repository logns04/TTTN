/**
 * Line-art nội thất dùng cho ảnh placeholder.
 * Mỗi icon vẽ trong hệ toạ độ 200×200, chỉ dùng stroke để scale lên kích cỡ
 * nào cũng nét. Bộ sinh ảnh tự lo việc scale và căn giữa.
 */
export type IconName =
  | 'sofa'
  | 'armchair'
  | 'coffeeTable'
  | 'tvStand'
  | 'bed'
  | 'wardrobe'
  | 'nightstand'
  | 'vanity'
  | 'diningTable'
  | 'chair'
  | 'cabinet'
  | 'wineRack'
  | 'desk'
  | 'officeChair'
  | 'bookshelf'
  | 'kitchen'
  | 'island'
  | 'spiceRack'
  | 'bathVanity'
  | 'towelRack'
  | 'gardenSet'
  | 'swing'
  | 'lamp'
  | 'mirror'
  | 'rug'
  | 'picture';

export const ICONS: Record<IconName, string> = {
  sofa: `
    <rect x="30" y="96" width="140" height="52" rx="12"/>
    <rect x="48" y="58" width="104" height="42" rx="10"/>
    <rect x="22" y="86" width="24" height="54" rx="10"/>
    <rect x="154" y="86" width="24" height="54" rx="10"/>
    <path d="M46 148 L46 166 M154 148 L154 166"/>`,

  armchair: `
    <rect x="62" y="92" width="76" height="50" rx="12"/>
    <rect x="70" y="50" width="60" height="46" rx="12"/>
    <rect x="50" y="84" width="18" height="52" rx="9"/>
    <rect x="132" y="84" width="18" height="52" rx="9"/>
    <path d="M70 142 L64 164 M130 142 L136 164"/>`,

  coffeeTable: `
    <rect x="34" y="88" width="132" height="14" rx="7"/>
    <path d="M56 102 L56 152 M144 102 L144 152"/>
    <path d="M56 132 L144 132"/>`,

  tvStand: `
    <rect x="30" y="96" width="140" height="46" rx="6"/>
    <path d="M100 96 L100 142"/>
    <rect x="72" y="44" width="56" height="40" rx="4"/>
    <path d="M100 84 L100 96 M86 96 L114 96"/>
    <path d="M44 142 L44 156 M156 142 L156 156"/>`,

  bed: `
    <rect x="28" y="102" width="144" height="42" rx="8"/>
    <rect x="28" y="56" width="34" height="48" rx="8"/>
    <rect x="74" y="82" width="48" height="22" rx="8"/>
    <path d="M34 144 L34 162 M166 144 L166 162"/>`,

  wardrobe: `
    <rect x="52" y="38" width="96" height="124" rx="6"/>
    <path d="M100 38 L100 162"/>
    <circle cx="92" cy="100" r="3.5"/>
    <circle cx="108" cy="100" r="3.5"/>
    <path d="M62 162 L62 172 M138 162 L138 172"/>`,

  nightstand: `
    <rect x="62" y="72" width="76" height="80" rx="6"/>
    <path d="M62 100 L138 100 M62 126 L138 126"/>
    <path d="M92 86 L108 86 M92 113 L108 113 M92 139 L108 139"/>
    <path d="M70 152 L70 164 M130 152 L130 164"/>`,

  vanity: `
    <circle cx="100" cy="62" r="30"/>
    <rect x="46" y="98" width="108" height="16" rx="6"/>
    <path d="M58 114 L58 158 M142 114 L142 158"/>
    <rect x="80" y="118" width="40" height="24" rx="4"/>`,

  diningTable: `
    <ellipse cx="100" cy="82" rx="72" ry="16"/>
    <path d="M100 98 L100 148 M74 152 L126 152"/>
    <rect x="40" y="106" width="26" height="30" rx="6"/>
    <rect x="134" y="106" width="26" height="30" rx="6"/>`,

  chair: `
    <rect x="72" y="42" width="56" height="58" rx="12"/>
    <rect x="62" y="100" width="76" height="14" rx="7"/>
    <path d="M72 114 L66 162 M128 114 L134 162"/>
    <path d="M70 138 L130 138"/>`,

  cabinet: `
    <rect x="46" y="46" width="108" height="112" rx="5"/>
    <path d="M100 46 L100 158 M46 92 L154 92"/>
    <circle cx="92" cy="120" r="3"/>
    <circle cx="108" cy="120" r="3"/>`,

  wineRack: `
    <rect x="50" y="52" width="100" height="96" rx="5"/>
    <path d="M50 84 L150 84 M50 116 L150 116 M83 52 L83 148 M117 52 L117 148"/>
    <circle cx="66" cy="68" r="7"/>
    <circle cx="134" cy="132" r="7"/>`,

  desk: `
    <rect x="26" y="76" width="148" height="13" rx="6"/>
    <path d="M42 89 L42 156 M158 89 L158 156"/>
    <rect x="104" y="93" width="54" height="36" rx="4"/>
    <path d="M116 105 L146 105 M116 117 L146 117"/>`,

  officeChair: `
    <rect x="74" y="38" width="52" height="60" rx="14"/>
    <rect x="66" y="98" width="68" height="14" rx="7"/>
    <path d="M100 112 L100 138"/>
    <path d="M70 158 L100 138 L130 158"/>
    <circle cx="68" cy="162" r="5"/>
    <circle cx="132" cy="162" r="5"/>`,

  bookshelf: `
    <rect x="46" y="40" width="108" height="122" rx="4"/>
    <path d="M46 80 L154 80 M46 120 L154 120"/>
    <path d="M60 52 L60 78 M70 52 L70 78 M80 56 L80 78"/>
    <path d="M120 92 L120 118 M130 92 L130 118"/>`,

  kitchen: `
    <rect x="34" y="70" width="132" height="18" rx="4"/>
    <rect x="34" y="88" width="132" height="72" rx="4"/>
    <path d="M100 88 L100 160"/>
    <path d="M64 120 L86 120 M114 120 L136 120"/>
    <path d="M46 56 L46 70 M154 56 L154 70"/>`,

  island: `
    <rect x="38" y="80" width="124" height="16" rx="6"/>
    <rect x="52" y="96" width="96" height="62" rx="4"/>
    <path d="M100 96 L100 158"/>
    <path d="M70 118 L86 118 M114 118 L130 118"/>`,

  spiceRack: `
    <rect x="56" y="56" width="88" height="94" rx="4"/>
    <path d="M56 88 L144 88 M56 120 L144 120"/>
    <rect x="70" y="66" width="14" height="20" rx="3"/>
    <rect x="92" y="66" width="14" height="20" rx="3"/>
    <rect x="70" y="98" width="14" height="20" rx="3"/>`,

  bathVanity: `
    <rect x="46" y="94" width="108" height="58" rx="6"/>
    <ellipse cx="100" cy="94" rx="40" ry="11"/>
    <path d="M100 72 L100 86 M88 72 L112 72"/>
    <path d="M100 110 L100 152"/>`,

  towelRack: `
    <path d="M46 60 L154 60"/>
    <path d="M52 60 L52 76 M148 60 L148 76"/>
    <rect x="62" y="72" width="30" height="72" rx="6"/>
    <rect x="108" y="72" width="30" height="60" rx="6"/>`,

  gardenSet: `
    <path d="M100 30 L100 62"/>
    <path d="M48 62 Q100 22 152 62 Z"/>
    <rect x="58" y="102" width="84" height="13" rx="6"/>
    <path d="M74 115 L74 152 M126 115 L126 152"/>
    <path d="M74 134 L126 134"/>`,

  swing: `
    <path d="M40 158 L70 52 M160 158 L130 52"/>
    <path d="M56 52 L144 52"/>
    <path d="M76 52 L76 104 M124 52 L124 104"/>
    <rect x="66" y="104" width="68" height="14" rx="7"/>
    <rect x="66" y="76" width="68" height="28" rx="8"/>`,

  lamp: `
    <path d="M66 84 L100 34 L134 84 Z"/>
    <path d="M100 84 L100 148"/>
    <path d="M78 152 L122 152"/>
    <path d="M100 34 L100 22"/>`,

  mirror: `
    <circle cx="100" cy="90" r="46"/>
    <circle cx="100" cy="90" r="36"/>
    <path d="M100 44 L100 30"/>`,

  rug: `
    <rect x="32" y="86" width="136" height="62" rx="10"/>
    <rect x="48" y="100" width="104" height="34" rx="6"/>
    <path d="M32 100 L48 100 M152 100 L168 100 M32 134 L48 134 M152 134 L168 134"/>`,

  picture: `
    <rect x="46" y="48" width="108" height="104" rx="4"/>
    <path d="M58 134 L84 96 L104 122 L124 86 L142 134 Z"/>
    <circle cx="126" cy="70" r="8"/>`,
};
