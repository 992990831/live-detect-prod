import React from 'react';
import { Button, Space } from 'antd-mobile';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import '../App.css';
import success from '../assets/images/succeed.png';
//这里因为用了browserrouter，所以要加。如果用hashrouter就不用了。
//同时要和package.json中的homepage参数保持一致
import { Common } from '../Common';

export const Success = () => {
    const navigate = useNavigate();

    const tryAgain = () => {
        navigate(Common.Home);
    }

    const close = () => {
        window.history.back()
        window.opener = null;
        window.open('', '_self');
        window.close();
    }

    return (
        <>
            <img src={success} alt="" className="success-logo" />
            <p className='comment'>活体验证通过</p>
            <Space wrap block style={{ '--gap-vertical': '24px' }} align='center' justify='center' direction='vertical' className='success-button-list'>
                <Button shape='rounded' block color='primary' size='large' onClick={tryAgain} style={{width:'70vw'}}>
                    &nbsp;&nbsp;&nbsp;&nbsp;再来一次&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
                {/* <Button block color='primary' size='large' onClick={close}>
                    &nbsp;&nbsp;&nbsp;&nbsp;关闭页面&nbsp;&nbsp;&nbsp;&nbsp;
                </Button> */}
            </Space>
        </>
    )
}