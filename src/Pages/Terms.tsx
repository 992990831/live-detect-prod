import React, { useEffect, useState } from 'react';
import { Button, Space, Mask, DotLoading } from 'antd-mobile';
import { useNavigate } from "react-router-dom";
import { Common } from '../Common';

const Terms = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [terms, setTerms] = useState('');

    useEffect(()=>{
        const localTerms = localStorage.getItem('terms');
        localTerms &&  setTerms(localTerms);

        setLoading(false);
    });

    return (
        <>
            <div style={{ margin: '10vh 7vw' }}>
                <h2>
                    功能说明
                </h2>
                <div>
                   { 
                   terms? terms : 
                   '人脸实名认证操作会对您的身份信息进行认证，保证您的登录信息合法不被人冒充篡改，人挣钱将整的使用您的用户身份信息、人脸面部特质进行人脸识别认证的授权。'}
                </div>
                <h2>
                    授权与许可
                </h2>
                <div>
                    如您点击“开始视频活体验证”或以其他方式选择接受本协议规则，则视为您在使用人脸识别服务时，同意并授权、获取、使用您在申请过程中所提供的个人信息。
                </div>
                <h2>
                    信息安全声明
                </h2>
                <div>
                    承诺对您的个人信息严格保密，并基于国家监管部门认可的加密算法进行数据加密传输，承诺尽到信息安全保护义务。
                </div>
            </div>

            <Space wrap block style={{ '--gap-vertical': '12px', position: 'fixed', bottom: '30px', left: '15vw' }} align='center' justify='center' direction='vertical'>

                <Button block color='primary' size='large' shape='rounded' onClick={()=>{
                    navigate(Common.Home + window.location.search);
                }} style={{ width: '70vw' }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;返回&nbsp;&nbsp;&nbsp;&nbsp;
                </Button>
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
    );
}

export default Terms;