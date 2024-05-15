import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Header from '../../components/common/Header'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext/AuthContext'

export default function AuthLayout() {
  
  const TABS = [
    {name: 'Login', path: '/auth'},
    {name: 'Register', path: '/auth/register'}
  ]
  const navigate = useNavigate()
  const { status } = useContext(AuthContext)

  useEffect(() => {
    if(status === 'authorized') {
      navigate('/')
    }
  }, [status])

  return (
    <>
      <Header/>
      <main className='py-16 w-svw flex flex-col items-center '>
          <h1 className="text-2xl font-bold text-center mt-8">E-commerce</h1>
          <section className='w-2/3 min-w-96 max-w-sm mt-8 py-8 bg-neutral-100 rounded-lg flex items-center flex-col'>
            <div className='flex justify-between border-4 border-neutral-200 bg-neutral-200 w-80 rounded-lg'>
              {
                TABS.map((tab, index) => (
                  <NavLink 
                    end
                    to={tab.path} 
                    key={index} 
                    className={({isActive}) => isActive ? 'bg-neutral-50 rounded-lg w-full' : ' bg-neutral-200 text-neutral-400 w-full'}>
                      <button className='py-3 w-full'>
                        <span className='font-bold text-lg'>
                          {tab.name}
                        </span>
                      </button>
                  </NavLink>
                ))
              }
            </div>
            <section>
              <Outlet/>
            </section>
          </section>
      </main>
    </>
  )
}
