import { backendAPI, githubAPI } from "@/common/Constants";
import {Repository, ResponseData, ResponseLocalData} from '@/common/Types'

export const fetchGithubContent = async(search : string) =>{
    const perPage = 10;
    try{
        const response = await fetch(githubAPI + `/search/repositories?q=${search}&per_page=${perPage}`, {
            method: 'GET',
        });
        return response.json() as Promise<ResponseData>
    }
    catch(error){
        console.log(error)
    }
}

export const addFavorite = async(id : string | number, dataRef : {[key : string] : Repository}) =>{
    const { full_name, created_at, stargazers_count, language, url} = dataRef[id];
    try{
        const bodyData = JSON.stringify({
            id : String(id),
            fullName : full_name,
            createdAt : created_at,
            stargazersCount : Number(stargazers_count),
            language,
            url, 
        });
        const response = await fetch(backendAPI + '/repo/', {
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : bodyData
        })
        return response;

    }
    catch(error){
        console.log(error)
    }
}

export const fetchFavs = async() =>{
    try{
        const response = await fetch( backendAPI + `/repo/`, {
            method: 'GET',
        });
        const result = await response.json()
        return result as Promise<ResponseLocalData>
    }
    catch(error){
        console.log(error)
    }
}

export const deleteFav = async(id : string) =>{
    try{
        const response = await fetch(backendAPI + `/repo/${id}`, {
            method : 'DELETE',
        })
        return response
    }
    catch(error){
        console.log(error)
    }
  }