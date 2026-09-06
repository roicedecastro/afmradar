import { z } from "zod";

export const PubMedRecordSchema = z.object({
  pmid: z.string().min(1),
  title: z.string().min(1),
  abstract: z.string().optional(),
  journal: z.string().optional(),
  publicationDate: z.string().optional(),
  doi: z.string().optional(),
  authors: z.array(z.object({ fullName: z.string(), affiliation: z.string().optional() })).default([]),
  sourceUrl: z.url(),
});
export type PubMedRecord = z.infer<typeof PubMedRecordSchema>;

export interface SourceAdapter<T> {
  readonly name: string;
  fetch(since?: Date): Promise<T[]>;
}
