import { render, screen } from '@testing-library/react'
import Favorite from '../src/components/favorite';
import '@testing-library/jest-dom'

describe('favorite component', () => {
  it('Render favorite component', async() => {
    render(<Favorite id={'1'} fullName={'github/kihaen'} createdAt={'2/19'} language={'Java'} url="/" />)
    
    expect(screen.getByRole('link')).toHaveTextContent('john');
    expect(screen.getByRole("button", {'aria-haspopup' :"menu" })).toBeInTheDocument();
  })
})