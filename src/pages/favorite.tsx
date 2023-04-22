import Header from '@/components/Header'
import Layout from '@/components/Layout'
import FavoriteCard from '@/components/FavoriteCard'
import { backendAPI } from '@/common/Constants'
import { useEffect, useState } from 'react'
import type { Repository } from "@/components/Search";

export type LocalRepo = {
  id : string,
  fullName : string,
  createdAt : string,
  stargazersCount : number,
  language : string,
  url : string
}

type responseData = {
  repos? : Array<LocalRepo>
}

const favorite = ()=> {

  const [favData, setFav] = useState<responseData>({})

  useEffect(()=>{
      fetchFavs()
  },[])

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

  return (
    <>
      <Header />
      <Layout>
        { favData && 
              <>
                  { favData?.repos && favData?.repos?.map((item)=>{
                      return(
                          <FavoriteCard {...item} />
                      )
                  })}
              </>
        }
      </Layout>
    </>
  )
}

export default favorite;