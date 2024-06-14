import api from '../api/interceptor'

export function getProteins(){
    return api.get("/protein/").then((res) => res.data)
}

export const deleteProtein = (id) => {
    api
        .delete(`/api/protein/delete/${id}/`)
        .then(res=>res.data)
};