import {logo} from '../assets'
const Hero = () => {
  return (
    <header className='w-full flex flex-col justify-center items-center'>
        <nav className="flex flex-row w-full mb-10 pt-3 justify-between items-center">
            <img src={logo} alt="logo" className="w-28 object-contain"/>
            <button onClick={() => {
                window.open('https:github.com')
            }}
            className='black-btn'></button>
        </nav>
        <h1 className='head_text'>
            Summarize Article with <br className='max-md:hidden'/>
          <span className='orange_gradient'>OPENAPI GPT-4</span>  
        </h1>
        <h2 className='desc'>
            Simplify reading with Summarize
        </h2>
    </header>
  )
}

export default Hero