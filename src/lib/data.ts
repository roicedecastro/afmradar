export type EvidenceStatus = "Established" | "Supported" | "Emerging" | "Mixed evidence" | "Unresolved";
export type Publication = {
  id: string; title: string; journal: string; date: string; authors: string[];
  pmid: string; doi?: string; url: string; category: string; review: "Reviewed summary" | "Automated summary — review pending";
  question: string; methods: string; finding: string; meaning: string; limits: string; mechanism: string;
};

export const surveillance = {
  isDemo: true, source: "CDC AFM surveillance", sourceUrl: "https://www.cdc.gov/acute-flaccid-myelitis/",
  sourceUpdated: "Source integration not configured", ingestedAt: "2026-09-06T02:43:00Z",
  metrics: [
    ["Confirmed this year", "—", "Live ingestion required"],
    ["Patients under investigation", "—", "Live ingestion required"],
    ["States reporting confirmed cases", "—", "Live ingestion required"],
    ["Historical confirmed cases", "—", "Dataset pending"],
  ],
  years: [{year: 2014,cases:120},{year:2015,cases:22},{year:2016,cases:153},{year:2017,cases:35},{year:2018,cases:238},{year:2019,cases:47},{year:2020,cases:32},{year:2021,cases:32},{year:2022,cases:47},{year:2023,cases:30}],
};

export const publications: Publication[] = [
  { id:"afm-evidence-record", title:"AFM evidence records are awaiting source ingestion", journal:"AFM Signal development record", date:"September 6, 2026", authors:["AFM Signal"], pmid:"Not available", url:"https://pubmed.ncbi.nlm.nih.gov/", category:"System status", review:"Automated summary — review pending", question:"How should an empty research index be presented?", methods:"Product and data-model design.", finding:"No research publication has been imported into this development instance.", meaning:"The product preserves source traceability by declining to fabricate a research feed.", limits:"This is not scientific evidence and must not be cited as one.", mechanism:"No mechanism claim is made." },
];

export const mechanismWatch = [
  { name:"Neuroinvasion", status:"Emerging" as EvidenceStatus, note:"Evidence is being curated; no conclusion is presented here." },
  { name:"Host susceptibility", status:"Unresolved" as EvidenceStatus, note:"Why only a small subset of infections lead to AFM remains unknown." },
  { name:"Immune contribution", status:"Mixed evidence" as EvidenceStatus, note:"The relative contribution of immune-mediated injury remains under study." },
];

export const openQuestions = [
  "Why do only a very small subset of enterovirus infections lead to AFM?",
  "Which viral properties contribute to neurotropism?",
  "What is the relative contribution of direct viral injury versus immune-mediated injury?",
];
