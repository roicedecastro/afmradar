export const sourceQueries = {
  pubmed: `("acute flaccid myelitis"[Title/Abstract]) OR ("enterovirus D68"[Title/Abstract] AND (neurolog*[Title/Abstract] OR neuron*[Title/Abstract] OR spinal[Title/Abstract] OR paralysis[Title/Abstract] OR myelitis[Title/Abstract] OR neurotrop*[Title/Abstract] OR axonal[Title/Abstract]))`,
} as const;

export const sourceConfig = {
  pubmed: { baseUrl: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils", maxRequestsPerSecond: 3, apiKey: process.env.NCBI_API_KEY },
  openAlex: { baseUrl: "https://api.openalex.org", mailto: process.env.OPENALEX_MAILTO },
  clinicalTrials: { baseUrl: "https://clinicaltrials.gov/api/v2" },
} as const;
