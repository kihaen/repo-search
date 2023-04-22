import React, {useState} from "react";
import Link from "next/link";
import styles from '@/styles/Home.module.css'
import { Input, InputGroup, InputLeftElement, Stack} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { githubAPI } from "@/common/Constants";
import GithubCard from "./GithubCard";

export type Repository = {
    id : number,
    full_name : string,
    created_at : string,
    stargazers_count : number,
    language : string,
    url : string,
    html_url : string,
    name : string,
    description : string,
}

type responseData = {
    items? : Array<Repository>
}

const Search = () : JSX.Element =>{

    const [searchedInput, handleChange] = useState('');
    const [dataset, changeData] = useState<responseData>({});
    const [perPage, setPage] = useState(10);

    const gatherContent = async(search : string) : Promise<void> =>{
        try{
            const response = await fetch(githubAPI + `/search/repositories?q=${search}&per_page=${perPage}`, {
                method: 'GET',
            });
            const result = await response.json()
            changeData(result)
        }
        catch(error){
            console.log(error)
        }
    }

    const handleKeypress = (e:React.KeyboardEvent)=>{
        if(e.key == "Enter"){
            gatherContent(searchedInput)
        }
    }

    return(
        <Stack spacing={3}>
        <InputGroup className={styles.search} >
            <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
            />
            <Input 
            onChange={(e)=> handleChange(e.target.value)}
            placeholder="Search Github Repositories"
            onKeyDown={(e)=>{(handleKeypress(e))}}
            value ={searchedInput}
            />
        </InputGroup>
        { dataset && 
            <>
                { dataset?.items && dataset?.items?.map((item)=>{
                    return(
                        <GithubCard {...item} />
                    )
                })}
            </>
        }
        </Stack>
    )
}

export default Search;