import React, {useState, useEffect} from "react";
import styles from '@/styles/Home.module.css'
import { Container, Stack} from "@chakra-ui/react";
import { backendAPI } from "@/common/Constants";
import { githubAPI } from "@/common/Constants";
import { AutoComplete } from "antd";
import { StarIcon } from "@chakra-ui/icons";
import { useToast } from '@chakra-ui/react'
import Favorite from "@/components/favorite";

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

export type LocalRepo = {
    id : string,
    fullName : string,
    createdAt : string | Date,
    stargazersCount : number,
    language : string,
    url : string
  }
  
  type responseLocalData = {
    repos? : Array<LocalRepo>
  }

const SearchGithub = () : JSX.Element =>{

    const [searchedInput, handleChange] = useState('');
    const [dataset, changeData] = useState<{value: number, label : JSX.Element}[]>([]);
    const [dataRef, setDataRef] = useState<{[key : string] : Repository}>({})
    const [favData, setFav] = useState<responseLocalData>({})
    const perPage = 10;

    const timeoutRef : {current : any} = React.useRef()
    const toast = useToast()

    useEffect(()=>{
        fetchFavs()
    },[])

    const fetchGithubContent = async(search : string) : Promise<void> =>{
        try{
            let dataMap : {[key: string]: Repository} = {}
            const response = await fetch(githubAPI + `/search/repositories?q=${search}&per_page=${perPage}`, {
                method: 'GET',
            });
            const result = await response.json()
            if(result){
                result?.items?.forEach((item : Repository) => {
                    dataMap[item.id] = item
                })
            }
            setDataRef(dataMap)
            const parsedData = mapDataToOption(result)
            changeData(parsedData)
        }
        catch(error){
            console.log(error)
        }
    }

    const invalidateData = async(): Promise<void> => {
        fetchFavs()
    }

    const fetchFavs = async() : Promise<void> =>{
    try{
        const response = await fetch( backendAPI + `/repo/`, {
            method: 'GET',
        });
        const result = await response.json()
        setFav(result)
    }
    catch(error){
        console.log(error)
    }
    }

    const renderItem = (item : Repository) => ({
        key : item.id,
        value: item.id,
        label: (
          <div className={styles.searchItem}>
            {item.name} | {item.description} | <span className="search-language">{item.language}</span>
            <span>
              <StarIcon /> {item.stargazers_count}
            </span>
          </div>
        ),
    });


    const mapDataToOption = (data : responseData): {value: number, label : JSX.Element}[] =>{
        const Options = data?.items?.map((item )=>{
            return renderItem(item)
        }) || []
        return Options;
    } 

    const handleSearchChange = (value : string)=>{
        handleChange(value)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            fetchGithubContent(value)
        }, 300);
    }

    const handleFavorite = async(id : string) =>{
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
            if(response?.statusText === 'Conflict'){
                toast({
                    position : 'top',
                    title: 'Conflict',
                    description: "The repository already exists on your favorite list",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }
            invalidateData()
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <Container maxW='8xl' minW="xl" width='80vw'>
        <Stack spacing={3}>
        <AutoComplete 
            size="large"
            className={styles.search}
            value = {searchedInput}
            onSearch={(text) => handleSearchChange(text)}
            options={dataset}
            placeholder="Search Github Repositories"
            onSelect={(id)=> handleFavorite(id)}
        />
        <Favorite data={favData} invalidate={()=> invalidateData()}/>
        </Stack>
        </Container>
    )
}

export default SearchGithub;