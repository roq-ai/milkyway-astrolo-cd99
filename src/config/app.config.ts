interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Astrologer'],
  tenantName: 'Company',
  applicationName: 'Milkyway Astrology v1',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage reading history',
    'Manage birthchart interpretation',
    'Manage user profile',
    'Manage reading schedule',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/6845edfc-4c85-4566-888e-7ddfc0254075',
};
