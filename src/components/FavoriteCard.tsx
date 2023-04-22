import React, {useState} from "react"
import type { Repository } from "./Search";
import { backendAPI } from "@/common/Constants";
import CardComponent from "./Card";
import {LocalRepo} from "@/pages/favorite"

const FavoriteCard = (props : LocalRepo): JSX.Element=>{

    const handleRemoveFavorite = async() =>{
        // const { id, full_name, created_at, stargazers_count, language, url} = props;
        // try{
        //     const bodyData = JSON.stringify({
        //         id : String(id),
        //         fullName : full_name,
        //         createdAt : created_at,
        //         stargazersCount : stargazers_count,
        //         language,
        //         url, 
        //     });
        //     const response = await fetch(backendAPI + '/repo/', {
        //         method : 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body : bodyData
        //     })
        // }
        // catch(error){
        //     console.log(error)
        // }
    }

    const {fullName, createdAt, stargazersCount, url} = props;
    return(
        <CardComponent name={fullName} description={createdAt} url={url} stars={stargazersCount} callBack={handleRemoveFavorite} />
    )
}

export default FavoriteCard;

