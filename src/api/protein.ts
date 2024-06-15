import api from '../api/interceptor'
import { SwissProtRecord } from '../lib/types';

export async function uniprot(queryParams) {
    return await api.get(
        `/protein/uniprot`, 
        {
            params: queryParams
        }
    ).then(res=>res.data)
}

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