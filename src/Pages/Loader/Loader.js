import React from 'react';
import { Oval } from 'react-loader-spinner';
const Loader = () => {
    return (
        <Oval
            height={30}
            width={40}
            color="#5aac4e"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="white"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />
    );
}

export default Loader;
