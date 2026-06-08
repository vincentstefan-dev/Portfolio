// app/coolstuff/thesis-paper-dataset/data/papers.ts

import papersJson from "../papers.json";
import type { LegacyPaper } from "../types/paper";

export const STORAGE_KEY = "thesis-paper-dataset";

export const importedPapers = papersJson as LegacyPaper[];