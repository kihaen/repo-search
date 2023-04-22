import React, {useState} from "react"
import type { Repository } from "./Search";
import { backendAPI } from "@/common/Constants";
import CardComponent from "./Card";

const GithubCard = (props : Repository): JSX.Element=>{

    const handleFavorite = async() =>{
        const { id, full_name, created_at, stargazers_count, language, url} = props;
        try{
            const bodyData = JSON.stringify({
                id : String(id),
                fullName : full_name,
                createdAt : created_at,
                stargazersCount : stargazers_count,
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
        }
        catch(error){
            console.log(error)
        }
    }

    const {name, description, stargazers_count, html_url} = props;
    return(
        <CardComponent name={name} description={description} url={html_url} stars={stargazers_count} callBack={handleFavorite} />
    )
}

export default GithubCard;
