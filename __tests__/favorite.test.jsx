import { render, screen } from '@testing-library/react'
import Favorite from '@/components/Favorite';
import '@testing-library/jest-dom'

describe('favorite component', () => {

  it('Render favorite component without data', async() => {
    render(<Favorite data={{repos : []}} />)
    expect(screen.getByRole("favs-empty-descript")).toBeInTheDocument();
  })

  it('Render favorite component with data', ()=>{
    const data = {repos : [
      {id:2, fullName : 'github/kihaen', createdAt:'2016-10-05T23:32:51Z', stargazersCount :900, language: 'Java', url:'/' }
    ]}
    render(<Favorite data={data}/>)
    expect(screen.getByRole("card-description")).toBeInTheDocument();
    expect(screen.getByRole("card-description")).toHaveTextContent(`Created At : ${new Date('2016-10-05T23:32:51Z').toString()}`)
  })

})