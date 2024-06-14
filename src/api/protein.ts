import api from '../api/interceptor'
import { SwissProtRecord } from '../lib/types';

export function getProteins(){
    return api.get("/protein/").then((res) => res.data)
}

export const deleteProtein = (id) => {
    api
        .delete(`/protein/delete/${id}/`)
        .then(res=>res.data)
};

export const createProtein = (proteinRecord: SwissProtRecord) => {
    return api.post("/protein/", proteinRecord)
        .then(res=>res.data)
};