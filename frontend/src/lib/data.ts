export interface Note {
  id: string;
  title: string;
  source?: string;
  preview: string;
  timestamp: string;
  createdBy: string;
}

export interface StickyNote {
  id: string;
  title: string;
  content: string[];
  color: string;
  darkColor: string;
}

export const notes: Note[] = [
  {
    id: '1',
    title: 'June Grocery List',
    source: 'Amazon',
    preview: 'Aashirvaad atta 17 * 215 = 3655',
    timestamp: '9:40 AM',
    createdBy: 'me'
  },
  {
    id: '2',
    title: 'July Grocery List',
    source: 'Local Store',
    preview: 'Ganesh atta: 10 * 210 = 2100',
    timestamp: '8:42 AM',
    createdBy: 'me'
  },
  {
    id: '3',
    title: 'May Grocery List',
    preview: 'Here is the summarized data from your May Grocery List, in bullet points:',
    timestamp: '8:35 AM',
    createdBy: 'me'
  },
  {
    id: '4',
    title: 'work culture sweden video',
    preview: 'https://youtu.be/HU37QlZQOA4?si=X-cl8V-qKinczaM6',
    timestamp: '8:23 AM',
    createdBy: 'shared'
  },
  {
    id: '5',
    title: 'This week i need to learn',
    preview: 'Kuernetes',
    timestamp: '8:12 AM',
    createdBy: 'me'
  }
];

export const stickyNotes: StickyNote[] = [
  {
    id: '1',
    title: 'July',
    content: [
      'Due from May - 42363',
      'Due from June - 61323',
      'TOTAL 103686',
      'Paid 2/7/25- 13686',
      'Paid 6/7/25 - 10000',
      'Pais 8/7/25 - 10000',
      'Paid 15/7/25 - 20000',
      '',
      'Amazon',
      'Aashirvaad atta 4*215 860',
      'Ganesh atta 4*210 840',
      'Fortune mustard 20*150 3000',
      'Fortune refined 3*130 390',
      'Dalda 3*140 420',
      '...'
    ],
    color: 'bg-amber-200',
    darkColor: 'dark:bg-amber-800/40'
  },
  {
    id: '2',
    title: '1 June',
    content: [
      'Amazon',
      'Aashirvaad atta 15*215 3225',
      'Ganesh atta 2*210 420',
      'Coldrink 32*4 128',
      'Fortune sarso 6*145 870',
      'Horlicks 500g 4*170 680',
      'Emami sarso 4*140 560',
      'Engine 2*165 330',
      'Fortune refined 5*135 675',
      'Dalda 5*140 700',
      'Emami refined 5*130 650',
      'Saffola gold 4*175 700',
      'Indiagate 3*128 384',
      'TOTAL 8327 (267)',
      '...'
    ],
    color: 'bg-green-200',
    darkColor: 'dark:bg-green-800/40'
  },
  {
    id: '3',
    title: 'Market',
    content: [
      '1. Coffee can investing copied from Terry Smith',
      '2. American ka pet capita kb india jaisa tha tb konse sector m maximum growth tha',
      '3. PE, ROE, Growth, Scalability,',
      '4. ROCE for different division of company but ROE for full company.',
      '5. If loan book is not increasing as before then there must be some problem as bank will say to stop new loans as previous loans are not being paid.',
      '6. S - Small and...'
    ],
    color: 'bg-blue-200',
    darkColor: 'dark:bg-blue-800/40'
  },
  {
    id: '4',
    title: 'Angel list',
    content: [],
    color: 'bg-purple-200',
    darkColor: 'dark:bg-purple-800/40'
  },
  {
    id: '5',
    title: 'Paisa ka hisaab',
    content: [
      '453345',
      '',
      '4800(mera pnb wala hai)',
      '729699 Mera',
      '512000 mummy',
      '',
      'Bua ka baaki 612000',
      '',
      'FEE',
      '600 5/5',
      '600 12/5',
      '1500 19/5',
      '2000 9/6'
    ],
    color: 'bg-rose-200',
    darkColor: 'dark:bg-rose-800/40'
  }
];