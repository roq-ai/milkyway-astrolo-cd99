const mapping: Record<string, string> = {
  astrologers: 'astrologer',
  'astrology-books': 'astrology_book',
  birthcharts: 'birthchart',
  'birthchart-analyses': 'birthchart_analysis',
  'birthchart-interpretations': 'birthchart_interpretation',
  chats: 'chat',
  companies: 'company',
  readings: 'reading',
  'reading-histories': 'reading_history',
  'reading-schedules': 'reading_schedule',
  users: 'user',
  'user-profiles': 'user_profile',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
