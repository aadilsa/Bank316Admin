import React from 'react'
import { Oval } from 'react-loader-spinner';
const BigLoader = () => {
    return (
        <Oval
            height={300}
            width={90}
            color="#5aac4e"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="white"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />
    )
}

export default BigLoader
