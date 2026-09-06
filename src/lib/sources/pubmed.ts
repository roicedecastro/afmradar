import { PubMedRecordSchema, type PubMedRecord, type SourceAdapter } from "./contracts";
import { sourceConfig, sourceQueries } from "./config";

export class PubMedAdapter implements SourceAdapter<PubMedRecord> {
  readonly name = "pubmed";
  async fetch(since?: Date): Promise<PubMedRecord[]> {
    const term = `${sourceQueries.pubmed}${since ? ` AND ${since.toISOString().slice(0, 10)}[Date - Publication] : 3000[Date - Publication]` : ""}`;
    const params = new URLSearchParams({ db:"pubmed", term, retmode:"json", retmax:"100", ...(sourceConfig.pubmed.apiKey ? {api_key:sourceConfig.pubmed.apiKey} : {}) });
    const response = await fetch(`${sourceConfig.pubmed.baseUrl}/esearch.fcgi?${params}`, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`PubMed search failed: ${response.status}`);
    // Fetch/normalization is intentionally isolated for the Phase 2 ingestion job.
    const payload = await response.json() as { esearchresult?: { idlist?: string[] } };
    return (payload.esearchresult?.idlist ?? []).map(pmid => PubMedRecordSchema.parse({ pmid, title:`PubMed record ${pmid}`, sourceUrl:`https://pubmed.ncbi.nlm.nih.gov/${pmid}/` }));
  }
}
