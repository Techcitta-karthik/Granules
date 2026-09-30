export interface PipelineProduct {
  srNo: number;
  product: string;
  therapy: string;
  status: string;
}

export const COMPLEX_MOLECULE_PRODUCTS: PipelineProduct[] = [
  { srNo: 1, product: 'Abemaciclib', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 2, product: 'Avatrombopag Maleate', therapy: 'CVS', status: 'USDMF Filed' },
  { srNo: 3, product: 'Calcium Oxybate', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 4, product: 'Magnesium Oxybate', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 5, product: 'Potassium Oxybate', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 6, product: 'Sodium Oxybate', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 7, product: 'Elacestrant Di HCl', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 8, product: 'Fruquintinib', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 9, product: 'Lisdexamfetamine', therapy: 'CNS stimulant', status: 'USDMF Filed' },
  { srNo: 10, product: 'Ruxolitinib HCl', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 11, product: 'Ruxolitinib Phosphate', therapy: 'Oncology', status: 'USDMF Filed' },
  { srNo: 12, product: 'Serdexmethylphenidate', therapy: 'Oncology', status: 'USDMF Filed' },
];

export function matchesSearchQuery(text: string, rawQuery: string) {
  if (!text || !rawQuery) return false;
  const cleanQ = rawQuery.toLowerCase().replace(/[*+\\?^$\[\]{}()|]+/g, ' ').trim();
  if (!cleanQ) return false;

  const target = text.toLowerCase();
  if (target.includes(cleanQ)) return true;

  const searchWords = cleanQ.split(/\s+/).filter(Boolean);
  if (searchWords.length === 0) return false;

  const targetWords = target.split(/[\s,/\-\(\)\.]+/).filter(Boolean);
  return searchWords.every((sw) =>
    target.includes(sw) || targetWords.some((tw) => tw.startsWith(sw))
  );
}
