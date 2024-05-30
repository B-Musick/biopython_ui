import { createContext } from "react";
import { SequenceRecord } from "../lib/types";

type SequenceRecordsContextProps = {
    savedRecords: SequenceRecord[],
    setSavedRecords: any
}

export const SequenceRecordsContext = createContext({} as SequenceRecordsContextProps)