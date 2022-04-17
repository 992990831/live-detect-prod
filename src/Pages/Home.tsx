import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd-mobile';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { VerifyAccount } from '../Util/Util';
import queryString from 'query-string';
import '../App.css';
import logo from '../assets/images/Logo-vertical.png';
//这里因为用了browserrouter，所以要加。如果用hashrouter就不用了。
//同时要和package.json中的homepage参数保持一致
import { Common } from '../Common';

function Home() {
  const navigate = useNavigate();
  //const [clientId, setClientId] = useState();
  const [decryptedAccount, setDecryptedAccount] = useState('');

  useEffect(() => {
    let params: any = { clientId: '', account: '' };
    if (window.location.search) {
      params = queryString.parse(window.location.search);
    }
    else if (window.location.hash.indexOf('?') > -1) {
      params = queryString.parse(window.location.hash.split('?')[1]);
    }

    //写两个，防止大小写错误
    let { clientId, clientid, account } = params;

    //存localstorage是考虑到有可能结束后再从succss、fail页面跳转过来，就没有querystring了
    if(localStorage.getItem('clientId') && localStorage.getItem('account'))
    {
      let decAcc = localStorage.getItem('account');
      setDecryptedAccount(decAcc?? '');
      return;
    }

    if (!(clientId || clientid) || !account) //必须要在url中传入clientId和account
    {
      navigate('unauthorized/缺少商户号或账号');
      return;
    }

    VerifyAccount(clientId, account).then((response: any)=> { 
      if(!response || !response.success) {
        navigate('unauthorized/商户号或账号错误');
      }
      else {
        localStorage.setItem('clientId', params.clientId || params.clientid);
        localStorage.setItem('account', response.account);
        setDecryptedAccount(response.account);
      }
      
    }).catch(()=>{
      navigate('unauthorized/商户号或账号错误');
    })

  }, [])

  const gotoVideoLive = () => {
    navigate('videolive');
  };

  // const gotoPicLive = () => {
  //   navigate(Common.Home + '/piclive');
  // };

  return (
    <>
      <img src={logo} alt="" className="logo" />
      {
       decryptedAccount &&  <>
          <p className='comment'>欢迎, {decryptedAccount}</p>
        </>
      }
      
      <Space wrap block style={{ '--gap-vertical': '24px' }} align='center' justify='center' direction='vertical' className='button-list'>

        <Button block color='primary' size='large' onClick={gotoVideoLive} style={{ width: '70vw' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;视频活体检测&nbsp;&nbsp;&nbsp;&nbsp;
        </Button>
        {/* <Button block color='primary' size='large' onClick={gotoPicLive}>
          &nbsp;&nbsp;&nbsp;&nbsp;图片活体检测&nbsp;&nbsp;&nbsp;&nbsp;
          </Button> */}
      </Space>
    </>

  );
}

export default Home;