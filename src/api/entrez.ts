import axios from "axios";

export function getAvailableDatabases() {
    return axios.get('http://localhost:8000/entrez/dbs_list').then(res => res.data);
}