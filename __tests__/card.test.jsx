import { render, screen } from '@testing-library/react'
import Card from '@/components/Card';
import '@testing-library/jest-dom'

describe('Card tests', () => {

  const mockFunction = jest.fn

  it('Render a Card', async() => {
    render(<Card name={'john'} description={'1/12'} url={'/home'} stars={0} callBack={mockFunction} showDelete={true} />)
    
    expect(screen.getByRole('link')).toHaveTextContent('john');
    expect(screen.getByRole("button", {'aria-label' :'delete favorite' })).toBeInTheDocument();
    expect(screen.getByRole('card-description')).toHaveTextContent('1/12')
  })
})