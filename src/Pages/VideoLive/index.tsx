import React, { useRef, useState, useEffect } from 'react';
import { Button, Space, Mask, DotLoading } from 'antd-mobile';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { GetSessionCode, VideoVerify } from '../../Util/Util';
import avator from '../../assets/images/avator.png';
import './index.css';
//这里因为用了browserrouter，所以要加。如果用hashrouter就不用了。
//同时要和package.json中的homepage参数保持一致
import { Common } from '../../Common';

const token = '24.8b5d9f9d25257ac79bdc93b47b65f256.2592000.1650612168.282335-25828496';

export const VideoLive = () => {
    const camRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [sessionCode, setSessionCode] = useState('');
    const [actions, setActions] = useState('');
    const [btnDisable, setBtnDisable] = useState(false);
    useEffect(() => {
        GetSessionCode(token).then((result) => {
            if(result[0]==='XXX')
            {
                setBtnDisable(true);
                return;
            }
            setSessionCode(result[0]);
            setActions(result[1]);
        });
    }, []);

    const navigate = useNavigate();

    const onCameraClick = () => {
        camRef.current && (camRef.current as HTMLInputElement).click();
    }


    const fileChange = (ev: any) => {
        var video = ev.target.files[0];  //选择的文件
        //https://blog.csdn.net/ligongke513/article/details/116231794
        //转换文件格式
        //var file = new File([video], 'temp.mp4',{type: 'video/mp4;codecs=h264;acodec=aac'});
        let reader = new FileReader();

        reader.readAsDataURL(video);
        // reader.readAsArrayBuffer(img)

        reader.onload = function (e: any) {
            setLoading(true);

            var dataBase64 = e.target.result; //result是你读取到的文件内容，此属性读取完成才能使用
            //console.log(encodeURIComponent(dataBase64.split(',')[1]));

            if (dataBase64) {
                //视频的base64编码是不包含视频头的，如 data:video/mp4;base64,；
                //setVideoStr(dataBase64.substring(45));
                //VideoVerify(token, sessionCode, encodeURI(dataBase64.substring(45)));
                VideoVerify(token, sessionCode, encodeURIComponent(dataBase64.split(',')[1]))
                    .then((score) => {
                        if (score >= 0.75) {
                            navigate(Common.Home + '/success');
                        }
                        else {
                            navigate(Common.Home + '/fail');
                        }

                        setLoading(false);
                    });
            }
        }
    }

    return (
        <>
            <p className='title'>请按要求录制视频</p>
            <img src={avator} alt='avator' style={{width:'30vw', left:'35vw', position:'relative'}} />
            <p className='action-num'>{actions}</p>
            <ul className='notice'>
                <li>环境安静，光线充足</li>
                <li>面部清晰完整</li>
                <li>普通话匀速朗读数字</li>
                <li>拍摄3秒以内</li>
            </ul>
            {/* <div className='list'>
                <div className='left'>
                    <img src={require("../../assets/images/subtitle-user.png")} alt="" className='subtitle-img' />
                </div>

                <div className='list-text'>
                    <p className='main-title'>确保真人操作</p>
                    <p>非真人操作将无法通过活体验证</p>
                </div>
            </div>

            <div className='list'>
                <div className='left'>
                    <img src={require("../../assets/images/subtitle-light.png")} alt="" className='subtitle-img' />
                </div>
                <div className='list-text'>
                    <p className='main-title'>识别光线适中</p>
                    <p>请保证光线不要过暗或过亮，不要背光</p>
                </div>
            </div>

            <div className='list'>
                <div className='left'>
                    <img src={require("../../assets/images/subtitle-face.png")} alt="" className='subtitle-img' />
                </div>
                <div className='list-text'>
                    <p className='main-title'>正面对准手机</p>
                    <p>保证您的脸出现在取景框内</p>
                </div>
            </div> */}

            <Space wrap block style={{ '--gap-vertical': '12px', position:'fixed', bottom:'30px', left:'15vw' }} align='center' justify='center' direction='vertical'>
                <Button disabled={btnDisable} shape='rounded' block color='primary' size='large' onClick={onCameraClick} style={{ width: '70vw' }}>
                    开始录制
                </Button>
                <input type='file' id='videoLive' accept='video/*' capture='user' onChange={fileChange}
                    style={{ display: 'none' }} ref={camRef} />
            </Space>

            {/* <Mask visible={loading} onMaskClick={() => setLoading(false)} /> */}
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