import React, { useRef, useState, useEffect } from 'react';
import { Button, Space, Mask, DotLoading } from 'antd-mobile';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { GetSessionCode, VideoVerify, AddLiveDetectRecord, AddLiveDetectCode } from '../../Util/Util';
import avator from '../../assets/images/avator.png';
import './index.css';
//这里因为用了browserrouter，所以要加。如果用hashrouter就不用了。
//同时要和package.json中的homepage参数保持一致
import { Common } from '../../Common';
import { VerifyAccount } from '../../Util/Util';
import queryString from 'query-string';
import axios from 'axios';

export const VideoLive = () => {
    const navigate = useNavigate();
    const camRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [sessionCode, setSessionCode] = useState('');
    const [actions, setActions] = useState('');
    const [btnDisable, setBtnDisable] = useState(false);

    const [token, setToken] = useState<string>();

    const [clientId, setClientId] = useState('');
    const [account, setAccount] = useState('');
    const [transId, setTransId] = useState('');

    //验证商户号(ClientId)和账号(Account)
    //url中的account是加密后的
    const Verify = async ():Promise<any> => {
        let params: any = { clientId: '', account: '' };
        if (window.location.search) {
            params = queryString.parse(window.location.search);
        }
        else if (window.location.hash.indexOf('?') > -1) {
            params = queryString.parse(window.location.hash.split('?')[1]);
        }
    
        //写两个clientId，防止大小写错误
        let { clientId, clientid, account, transId } = params;
    
        if (!(clientId || clientid) || !account) //必须要在url中传入clientId和account
        {
            navigate('unauthorized/缺少商户号或账号');
            return false;
        }

        var response = await VerifyAccount(clientId, account);
        
        if (!response || !response.success) {
            navigate('unauthorized/商户号或账号错误');
            return false;
        }
        else {
            setClientId(params.clientId || params.clientid);
            setAccount(response.account);
            setTransId(transId);

            localStorage.setItem('clientId', params.clientId || params.clientid);
            localStorage.setItem('account', response.account);
            localStorage.setItem('transId', transId);
        }
        return [params.clientId || params.clientid, response.account, transId];
    }

    useEffect(() => {
        //因为useEffect不支持async/awiat，所以用的workaround
        const fn = async () =>{
            let result = await Verify();
            if(!result)
            {
                return;
            }

            if(result)
            {
                const tempToken = await GetToken();

                if (!tempToken)
                    return;

                setToken(tempToken);

                GetSessionCode(tempToken).then((result) => {
                    if (result[0] === 'XXX') {
                        setBtnDisable(true);
                        return;
                    }
                    setSessionCode(result[0]);
                    setActions(result[1]);
                });

                AddLiveDetectCode(result[0], result[1], result[2]);
            }
        };

        fn();
    }, []);

    const GetToken = async (): Promise<string> => {
        const token = await axios.get('http://106.75.216.135:8004/api/livedetect/token');
        return token.data.access_token;
    }

    const onCameraClick = () => {
        camRef.current && (camRef.current as HTMLInputElement).click();
    }

    const fileChange = (ev: any) => {
        var video = ev.target.files[0];  //选择的文件
        //https://blog.csdn.net/ligongke513/article/details/116231794
        //转换文件格式
        let reader = new FileReader();

        reader.readAsDataURL(video);
        // reader.readAsArrayBuffer(img)

        reader.onload = function (e: any) {
            setLoading(true);

            var dataBase64 = e.target.result; //result是你读取到的文件内容，此属性读取完成才能使用

            if (dataBase64) {
                //视频的base64编码是不包含视频头的，如 data:video/mp4;base64,;
                let videoBase64:string = encodeURIComponent(dataBase64.split(',')[1]);   
                VideoVerify(token ?? '', sessionCode, videoBase64)
                    .then((results) => {
                        debugger;

                        if (results[0] >= 0.75) {
                            navigate(Common.Home + '/success' + window.location.search);
                        }
                        else {
                            navigate(Common.Home + '/fail' + window.location.search);
                        }

                        AddLiveDetectRecord(clientId, account, videoBase64, results[1], results[0], results[0]>0.75, transId);

                        setLoading(false);
                    });
            }
        }
    }

    return (
        <>
            <p className='title'>请按要求录制视频</p>
            <img src={avator} alt='avator' style={{ width: '30vw', left: '35vw', position: 'relative' }} />
            <p className='action-num'>{actions}</p>
            <ul className='notice'>
                <li>环境安静，光线充足</li>
                <li>面部清晰完整</li>
                <li>普通话匀速朗读数字</li>
                <li>拍摄3秒以内</li>
            </ul>           
            <Space wrap block style={{ '--gap-vertical': '12px', position: 'fixed', bottom: '30px', left: '15vw' }} align='center' justify='center' direction='vertical'>
                <Button disabled={btnDisable} shape='rounded' block color='primary' size='large' onClick={onCameraClick} style={{ width: '70vw' }}>
                    开始录制
                </Button>
                <input type='file' id='videoLive' accept='video/*' capture='user' onChange={fileChange}
                    style={{ display: 'none' }} ref={camRef} />
            </Space>
            <Mask visible={loading}>
                <DotLoading color='springgreen' style={{
                    position: 'fixed',
                    top: '50%',
                    left: '27%',
                    textAlign: 'center',
                    fontSize: 'xxx-large'
                }} />
            </Mask>
        </>
    )
}