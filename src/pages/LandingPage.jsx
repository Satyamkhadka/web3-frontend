import React from 'react';
import { useSelector } from 'react-redux';
export const LandingPage = () => {

    const UserState = useSelector((store) => store.user);
    return (<>
        <div className="container">

            {(UserState.isLogged) ?
                <h1 className="text-white mt-5 text-center">Welcome to the page!</h1> :

                <h3 className="text-white mt-3 text-center">Please login if you havent</h3>

            }




        </div>
    </>);
}