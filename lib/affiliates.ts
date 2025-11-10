import affiliatesData from '@/data/affiliates.json';

export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  description?: string;
  cta?: string;
}

export function getAffiliateLink(id: string): AffiliateLink | null {
  const affiliate = affiliatesData.find((a: AffiliateLink) => a.id === id);
  return affiliate || null;
}

export function getAllAffiliates(): AffiliateLink[] {
  return affiliatesData;
}

export function hasAffiliateLinks(affiliateIds: string[]): boolean {
  return affiliateIds && affiliateIds.length > 0;
}
