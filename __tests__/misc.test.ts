import {createDataRef, mapDataToOption, sortByStarcount, sortByDate} from "@/common/misc"
import {ReferenceData, ResponseData, Repository, LocalRepo} from '@/common/Types'
import { render, screen } from '@testing-library/react'

describe('testing misc utiliies', () => {

    const Repo : Repository = {id : 2, created_at : '1/12', full_name : 'github/kihaen', stargazers_count : 42, language : 'Java', url:'/', html_url:'/', name: 'kihaen', description : 'some descript'}
    const localRepoItem : LocalRepo = {id : '1', fullName : '/kihaen', createdAt : new Date('2016-10-05T23:32:51Z'), stargazersCount : 0, language : 'Java', url:'/'}
    const localRepoItem2 : LocalRepo = {id : '2', fullName : '/kihaen/sub', createdAt : new Date ('2020-04-21T05:03:57Z'), stargazersCount : 90, language : 'Java', url:'/'}

    test('Expect data reference to be created', () => {
        expect(createDataRef([Repo])).toEqual({[2]: Repo});
    });

    test('Expect data to be mapped to JSX elements', () => {
        const JSXoptions : {value: number, label : JSX.Element}[] = mapDataToOption({items : [Repo]})
        expect(JSXoptions[0].value).toEqual(2)
        render(JSXoptions[0].label)
        expect(screen.getByRole('starcount')).toBeInTheDocument
    });

    test('Expect the sorting to be by StarCount Ascending', () => {
        const Sorted = sortByStarcount('asc', [localRepoItem2, localRepoItem])
        expect(Sorted).toEqual([localRepoItem, localRepoItem2])
    });

    test('Expect the sorting to be by StarCount Descending', () => {
        const Sorted = sortByStarcount('desc', [localRepoItem, localRepoItem2])
        expect(Sorted).toEqual([localRepoItem2, localRepoItem])
    });

    test('Expect the sorting to be by Date Ascending', () => {
        const Sorted = sortByDate('asc', [localRepoItem2, localRepoItem])
        expect(Sorted).toEqual([localRepoItem, localRepoItem2])
    });

    test('Expect the sorting to be by Date Descending', () => {
        const Sorted = sortByDate('desc', [localRepoItem, localRepoItem2])
        expect(Sorted).toEqual([localRepoItem2, localRepoItem])
    });


})