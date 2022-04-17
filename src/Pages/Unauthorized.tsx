import React from 'react';
import { Space } from 'antd-mobile';
import { useParams } from 'react-router-dom';
import '../App.css';
import fail from '../assets/images/fail.png';

function Unauthorized() {
    const params = useParams();

    return (
        <>
            <>
                <img src={fail} alt="" className="success-logo" />
                <p className='comment'>{params.message}</p>                
            </>
        </>
    )
}

export default Unauthorized;
