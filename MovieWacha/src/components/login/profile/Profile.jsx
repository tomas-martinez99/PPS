import { useContext } from 'react'
import PropTypes from 'prop-types'
import { AuthenticationContext } from '../../../services/Authentication.context'

const Profile = () => {
    const { user } = useContext(AuthenticationContext)
    console.log(user, "perfil")
    if (!user) {
        // Mostrar algo mientras los datos de 'user' se cargan
        return <p>Cargando datos del usuario...</p>;
    }
    return (
        <div >
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{user.username}</h2>

                    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        <div className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-white">{user.firstName}</dt>
                            <dt className="font-medium text-white">{user.lastName}</dt>
                        </div>
                    </dl>
                    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        <div className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-white">{user.email}</dt>
                        </div>
                    </dl>
                    {user.status ? <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        <div className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-white">suscripcion activa</dt>
                        </div>
                    </dl>
                        :
                        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                            <div className="border-t border-gray-200 pt-4">
                                <button>Pagar Suscripcion</button>
                            </div>
                        </dl>
                    }
                </div>
            </div>
        </div>
    )
}

Profile.propTypes = {}

export default Profile