import api from '../api/interceptor'

export function getAvailableDatabases() {
    return api.get('/entrez/dbs_list')
        .then(res => res.data);
}

export async function searchEntrez(queryParams) {
    return await api.get(
        `/entrez/search`, 
        {
            params: queryParams
        }
    ).then(res=>res.data)
}