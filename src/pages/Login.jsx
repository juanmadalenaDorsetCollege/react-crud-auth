import { useRef } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext/AuthContext'

export default function Login() {

  const { login } = useContext(AuthContext)
  let username = useRef(null).current
  let password = useRef(null).current

  const handleLogin = () => {
    login({username, password})
  }

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='w-96 rounded-lg mt-8'>
          <div className='px-4 py-2 h-full flex flex-col justify-between'>
            <div className='mb-10'>
              <input type="text" placeholder='Username' className='w-full p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4' onChange={({target}) => username = target.value}/>
              <input type="password" placeholder='Password' className='w-full p-3 rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4' onChange={({target}) => password = target.value}/>
            </div>
            <button className='w-full p-3 rounded-md border bg-neutral-300' onClick={handleLogin}>
                <span className='font-bold'>
                    Login
                </span>
            </button>
          </div>
        </div>
    </div>
  )
}
