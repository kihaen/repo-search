import Layout from '@/components/Layout'
import CardComponent from '@/components/Card'
import { backendAPI } from '@/common/Constants'
import { Stack, Menu, MenuButton,  Button,MenuList, MenuOptionGroup, MenuItemOption, MenuDivider, Text} from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

export type LocalRepo = {
  id : string,
  fullName : string,
  createdAt : string | Date,
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


//HOC for favorite context in an array
const defaultSort ="asc"

const favorite = (props : props)=> {
  const {data, invalidate} = props;
  const [dataArray, setDataArray] = useState<LocalRepo[]| undefined>([]);
  const [sortByOrder, setSortOrder] = useState<string | string[]>(defaultSort);
  const [sortByCategory, setSortCategory] = useState<string | string[]>('');

  useEffect(()=>{
    if(!setSortCategory){ // if we are not sorting by any category, just update regularly
      setDataArray(data?.repos?.map((obj)=> ({...obj, createdAt : new Date(obj.createdAt)})))
    }
    else{ // This is to keep the sort order consistent even when data updates
      handleSortSelect(sortByCategory, sortByOrder, data?.repos)
      setDataArray(data?.repos?.map((obj)=> ({...obj, createdAt : new Date(obj.createdAt)})))
    }
    
  },[data])

  const handleRemoveFavorite = async(id : string) =>{
    try{
        const response = await fetch(backendAPI + `/repo/${id}`, {
            method : 'DELETE',
        })
        // removing favorite then callback to parent function to invalidate dataset causing refresh
        invalidate()
    }
    catch(error){
        console.log(error)
    }
  }

  const sortByStarcount = (direction : string | string[], data? : LocalRepo[]) =>{ // Data passthrough for when dataArray is not current
    let sorted = data ?  data : dataArray;
    if(direction === 'desc'){
      sorted?.sort((a, b)=> ( (b.stargazersCount || 0) - (a.stargazersCount || 0)))
    }
    else{
      sorted?.sort((a, b)=> ( (a.stargazersCount || 0) - (b.stargazersCount || 0)))
    }
    setDataArray(sorted)
  }


  const sortByDate = (direction : string | string[], data? : LocalRepo[]) =>{ //  Data passthrough for when dataArray is not current
    let localArray  = data ?  data : dataArray;
    if(direction === 'desc'){
      localArray?.sort((a, b) => {return +b.createdAt - +a.createdAt})
    }
    else{
      localArray?.sort((a, b) => {return +a.createdAt - +b.createdAt})
    }
    const final = localArray?.map(obj => { return { ...obj, createdAt: obj.createdAt} })
    setDataArray(final)
  }

  const handleSortSelect = (category: string | string[], direction : string | string[], data? : LocalRepo[]) =>{
    switch(category){
        case 'created_at':
          sortByDate(direction, data)
          return;
        case 'stargazers_count':
          sortByStarcount(direction, data)
          return;
        default:
          return;
    }
  }

  return (
    <>
      <Layout>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} colorScheme='linkedin'>
            Sort Favorite
          </MenuButton>
          <MenuList minWidth='240px'>
            <MenuOptionGroup defaultValue={defaultSort} title='Order' type='radio' onChange={(value)=> {setSortOrder(value); handleSortSelect(sortByCategory, value)}}>
              <MenuItemOption value='asc'>Ascending</MenuItemOption>
              <MenuItemOption value='desc'>Descending</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup title='Category' type='radio' value ={sortByCategory} onChange={(value)=>{setSortCategory(value); handleSortSelect(value, sortByOrder)}}>
              <MenuItemOption value='stargazers_count'>Stargazers Count</MenuItemOption>
              <MenuItemOption value='created_at'>Created Date</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Stack className={styles.menu} spacing={3}>
        { dataArray && dataArray?.length > 0 ?
            <>
                { dataArray?.map((item, index)=>{
                    const {fullName, createdAt, stargazersCount, url, id} = item;
                    return(
                      <CardComponent key={index} name={fullName} description={createdAt.toString()} url={url} stars={stargazersCount} callBack={()=> handleRemoveFavorite(id)} showDelete />
                    )
                })}
            </>
          :
          <div className={styles.empty}>
            <Text size={'lg'}>Favorites List is empty... Try Searching for your favorite repositories</Text>
          </div>
        }
        </Stack>
      </Layout>
    </>
  )
}

export default favorite;
