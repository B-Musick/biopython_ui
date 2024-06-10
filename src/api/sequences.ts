import api from '../api/interceptor'
import { SequenceRecord } from '../lib/types';

export function getSequences(){
    return api.get("/api/sequences/").then((res) => res.data)
}


export const deleteSequence = (id) => {
    api
        .delete(`/api/sequences/delete/${id}/`)
        .then(res=>res.data)
};

export const createSequence = (sequenceRecord: SequenceRecord) => {
    console.log(sequenceRecord)
    return api.post("/api/sequences/", sequenceRecord)
        .then(res=>res.data)
};