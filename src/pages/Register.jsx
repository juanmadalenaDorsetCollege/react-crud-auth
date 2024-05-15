import { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/authContext/AuthContext'

export default function Register() {

    const { register, error, clearError } = useContext(AuthContext)
    let username = useRef(null)
    let password = useRef(null)
    let confirmPassword = useRef(null)

    useEffect(() => {
        return () => {
            clearError()
        }
    }, [])

    const handleRegister = () => {
        register({username: username.current, password: password.current, confirmPassword: confirmPassword.current})
    } 

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='w-96 rounded-lg mt-8'>
            <div className='px-4 py-2 h-full flex flex-col justify-between'>
                <div className='mb-4'>
                <input type="text" placeholder='Username' className='w-full p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4' onChange={({target}) => username.current = target.value }/>
                <input type="password" placeholder='Password' className='w-full p-3 rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4' onChange={({target}) => password.current = target.value}/>
                <input type="password" placeholder='Confirm Password' className='w-full p-3 rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4' onChange={({target}) => confirmPassword.current = target.value} />
                </div>
                <div className='mb-4'>
                    <p className='text-center text-red-600 font-medium' > {error}</p>
                </div>
                <button type='submit' className='w-full p-3 rounded-md border bg-neutral-300' onClick={handleRegister}>
                    <span className='font-bold'>
                        Register
                    </span>
                </button>
            </div>
            </div>
        </div>
  )
}
