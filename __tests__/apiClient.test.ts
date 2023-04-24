import {fetchGithubContent, addFavorite, fetchFavs, deleteFav} from "@/common/apiClient"
import {ReferenceData, ResponseData, Repository, LocalRepo} from '@/common/Types'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ content : true }),
  }),
) as jest.Mock;

const Repo : Repository = {id : 2, created_at : '1/12', full_name : 'github/kihaen', stargazers_count : 42, language : 'Java', url:'/', html_url:'/', name: 'kihaen', description : 'some descript'}

describe('testing the api Client', ()=>{

    test('Expect that Github Api is working', async()=>{
        let response = await fetchGithubContent('next')
        expect(response).toEqual({ content : true })
    })

    test('Expect that addFavorite is working', async()=>{
        let response = await addFavorite( 2 , {[2]: Repo})
        expect(await response?.json()).toEqual({ content : true })
    })

    test('Expect that fetchFavs is working', async()=>{
        let response = await fetchFavs()
        expect(response).toEqual({ content : true })
    })

    test('Expect that deleteFav is working', async()=>{
        let response = await deleteFav('2')
        expect(await response?.json()).toEqual({ content : true })
    })
})