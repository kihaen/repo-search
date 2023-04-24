import { StarIcon } from "@chakra-ui/icons";
import styles from '@/styles/Home.module.css'
import {ReferenceData, ResponseData, Repository, LocalRepo} from '@/common/Types'


export const createDataRef = (data : Repository[] = []): ReferenceData =>{
    let dataMap : ReferenceData = {}
    data?.forEach((item : Repository) => {
        dataMap[item?.id] = item
    })
    return dataMap
}

export const mapDataToOption = (data : ResponseData = {}): {value: number, label : JSX.Element}[] =>{
    const Options = data?.items?.map((item )=>{
        return renderItem(item)
    }) || []
    return Options;
}

const renderItem = (item : Repository) => ({
    key : item.id,
    value: item.id,
    label: (
      <div className={styles.searchItem}>
        {item.name} | {item.description} | <span className="search-language">{item.language}</span>
        <span role="starcount">
          <StarIcon /> {item.stargazers_count}
        </span>
      </div>
    ),
});

export const sortByStarcount = (direction : string | string[], data : LocalRepo[] | undefined) =>{ // Data passthrough for when dataArray is not current
  let sorted = data;
  if(direction === 'desc'){
    sorted?.sort((a, b)=> ( (b.stargazersCount || 0) - (a.stargazersCount || 0)))
  }
  else{
    sorted?.sort((a, b)=> ( (a.stargazersCount || 0) - (b.stargazersCount || 0)))
  }
  return sorted
}


export const sortByDate = (direction : string | string[], data : LocalRepo[] | undefined) =>{ //  Data passthrough for when dataArray is not current
  let localArray  = data;
  if(direction === 'desc'){
    localArray?.sort((a, b) => {return +b.createdAt - +a.createdAt})
  }
  else{
    localArray?.sort((a, b) => {return +a.createdAt - +b.createdAt})
  }
  const final = localArray?.map(obj => { return { ...obj, createdAt: obj.createdAt} })
  return final
}