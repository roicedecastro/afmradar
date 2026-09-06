import { describe, expect, it } from "vitest";
import { PubMedRecordSchema } from "@/lib/sources/contracts";
import { sourceQueries } from "@/lib/sources/config";

describe("source contracts", () => {
  it("accepts a minimally traceable PubMed record", () => {
    expect(PubMedRecordSchema.parse({ pmid:"12345", title:"Example", sourceUrl:"https://pubmed.ncbi.nlm.nih.gov/12345/" }).pmid).toBe("12345");
  });
  it("requires source traceability", () => {
    expect(() => PubMedRecordSchema.parse({ pmid:"12345", title:"Example" })).toThrow();
  });
  it("keeps the AFM query in configuration", () => {
    expect(sourceQueries.pubmed).toContain("acute flaccid myelitis");
    expect(sourceQueries.pubmed).toContain("enterovirus D68");
  });
});
