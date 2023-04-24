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

export type ReferenceData = {
    [key : number] : Repository
}

export type ResponseData = {
    items? : Array<Repository>  | undefined
}

export type LocalRepo = {
    id : string,
    fullName : string,
    createdAt : string | Date,
    stargazersCount : number,
    language : string,
    url : string
  }
  
export type ResponseLocalData = {
    repos? : Array<LocalRepo> | undefined
}