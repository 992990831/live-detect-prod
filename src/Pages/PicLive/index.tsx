import React, { useRef } from 'react';
import { Button, Space } from 'antd-mobile';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";

export const PicLive = () => {
    const camRef = useRef(null);
    const onCameraClick = () => {
        camRef.current && (camRef.current as HTMLInputElement).click();
    }

    return(
        <>            
            <Space wrap block style={{ '--gap-vertical': '24px', marginTop:'10vh'}} align='center' justify='center' direction='vertical'>
                <Button block color='primary' size='large' onClick={onCameraClick}>
                &nbsp;&nbsp;&nbsp;&nbsp;点击拍照&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
                <input type="file" id="file1" accept="image/*"
                style={{display:'none'}} ref={camRef} />


            </Space>    
        </>
    )
}