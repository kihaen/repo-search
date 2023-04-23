import Header from '@/components/Header'
import Layout from '@/components/Layout'
import CardComponent from '@/components/Card'
import { backendAPI } from '@/common/Constants'
import { useEffect, useState } from 'react'
import { Stack } from '@chakra-ui/react'

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

type props = {
  data : responseData,
  invalidate : ()=>{},
}

const favorite = (props : props)=> {
  const {data, invalidate} = props;

  const handleRemoveFavorite = async(id : string) =>{
    try{
        const response = await fetch(backendAPI + `/repo/${id}`, {
            method : 'DELETE',
        })
        invalidate()
    }
    catch(error){
        console.log(error)
    }
  }

  return (
    <>
      <Layout>
        <Stack spacing={3}>
        { data && 
              <>
                  { data?.repos && data?.repos?.map((item, index)=>{
                      const {fullName, createdAt, stargazersCount, url, id} = item;
                      return(
                        <CardComponent key={index} name={fullName} description={createdAt} url={url} stars={stargazersCount} callBack={()=> handleRemoveFavorite(id)} showDelete />
                      )
                  })}
              </>
        }
        </Stack>
      </Layout>
    </>
  )
}

export default favorite;
