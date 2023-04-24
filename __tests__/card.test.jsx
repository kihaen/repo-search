import { render, screen } from '@testing-library/react'
import Card from '../src/components/Card';
import '@testing-library/jest-dom'

describe('Card', () => {
  it('Render a Card', async() => {
    render(<Card name={'john'} description={'doe'} url={'/home'} stars={0} callBack={()=>{}} showDelete={true} />)
    
    expect(screen.getByRole('link')).toHaveTextContent('john');
    expect(screen.getByRole("button", {'aria-label' :'delete favorite' })).toBeInTheDocument();
  })
})