import React, {useState, useEffect} from "react";
import styles from '@/styles/Home.module.css'
import { Container, Stack} from "@chakra-ui/react";
import { fetchGithubContent, addFavorite, fetchFavs } from "@/common/apiClient";
import {Repository, ResponseLocalData} from "@/common/Types"
import { AutoComplete } from "antd";
import { useToast } from '@chakra-ui/react'
import Favorite from "@/components/favorite";
import { createDataRef, mapDataToOption } from "@/common/misc";

const SearchGithub = () : JSX.Element =>{

    const [searchedInput, handleChange] = useState('');
    const [dataset, changeData] = useState<{value: number, label : JSX.Element}[]>([]);
    const [dataRef, setDataRef] = useState<{[key : string] : Repository}>({})
    const [favData, setFav] = useState<ResponseLocalData>({})

    const timeoutRef : {current : any} = React.useRef()
    const toast = useToast()

    useEffect(()=>{
        getFavorites()
    },[])

    const getFavorites = async() =>{
        const response = await fetchFavs()
        setFav(response!) 
    }

    const handleAddFavorite = async(id :string)=>{
        const response = await addFavorite(id, dataRef)
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

    const invalidateData = async(): Promise<void> => {
        getFavorites()
    }

    const handleSearchChange = (value : string)=>{
        handleChange(value)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(async() => {
            const resp = await fetchGithubContent(value)
            setDataRef(createDataRef(resp?.items))
            changeData(mapDataToOption(resp))
        }, 300);
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
            onSelect={(id)=> handleAddFavorite(id)}
        />
        <Favorite data={favData} invalidate={()=> invalidateData()}/>
        </Stack>
        </Container>
    )
}

export default SearchGithub;