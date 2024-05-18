import { useQuery } from "@tanstack/react-query"
import { getAvailableDatabases } from "../api/entrez"

export const EntrezSearch = () => {
    let databases;

    const entrezDatabaseListQuery = useQuery({
        queryKey: ["entrez"],
        queryFn: getAvailableDatabases,
    })

    if(entrezDatabaseListQuery.isSuccess){
        console.log('hi')
        databases = entrezDatabaseListQuery.data.map((data,index)=>{
            return <div key={index}>{data}</div>
        })
    }

    
    return (
        <>
        <div>Entrez Search</div>
        {databases}
        </>
        
    )
}