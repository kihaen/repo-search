import Layout from '@/components/Layout'
import CardComponent from '@/components/Card'
import { Stack, Menu, MenuButton,  Button,MenuList, MenuOptionGroup, MenuItemOption, MenuDivider, Text} from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import {sortByStarcount, sortByDate} from '@/common/misc'
import  {deleteFav} from '@/common/apiClient'
import { ResponseLocalData, LocalRepo } from '@/common/Types'

type props = {
  data : ResponseLocalData,
  invalidate : ()=>{},
}

const defaultSort ="asc"

const Favorite = (props : props)=> {
  const {data, invalidate} = props;
  const [dataArray, setDataArray] = useState<LocalRepo[]| undefined>([]);
  const [sortByOrder, setSortOrder] = useState<string | string[]>(defaultSort);
  const [sortByCategory, setSortCategory] = useState<string | string[]>('');

  useEffect(()=>{
    if(!setSortCategory){ // if we are not sorting by any category, just update regularly
      setDataArray(data?.repos?.map((obj)=> ({...obj, createdAt : new Date(obj.createdAt)})))
    }
    else{ // This is to keep the sort order consistent even when data updates
      handleSortSelect(sortByCategory, sortByOrder, data?.repos!)
      setDataArray(data?.repos?.map((obj)=> ({...obj, createdAt : new Date(obj.createdAt)})))
    }
    
  },[data])

  const handleRemoveFavorite = async(id : string) =>{
    await deleteFav(id)
    invalidate()
  }

  const handleSortSelect = (category: string | string[], direction : string | string[], data : LocalRepo[] | undefined) =>{
    switch(category){
        case 'created_at':
          setDataArray(sortByDate(direction, data))
          return;
        case 'stargazers_count':
          setDataArray(sortByStarcount(direction, data))
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
            <MenuOptionGroup defaultValue={defaultSort} title='Order' type='radio' onChange={(value)=> {setSortOrder(value); handleSortSelect(sortByCategory, value, dataArray)}}>
              <MenuItemOption value='asc'>Ascending</MenuItemOption>
              <MenuItemOption value='desc'>Descending</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup title='Category' type='radio' value ={sortByCategory} onChange={(value)=>{setSortCategory(value); handleSortSelect(value, sortByOrder, dataArray)}}>
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

export default Favorite;
