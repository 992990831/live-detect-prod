import React, { useEffect, useState } from 'react';
import { Button, Space, Checkbox } from 'antd-mobile';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import { VerifyAccount } from '../Util/Util';
import queryString from 'query-string';
import '../App.css';
import logoUser from '../assets/images/subtitle-user.png';
import logoLight from '../assets/images/subtitle-light.png';
import logoFace from '../assets/images/subtitle-face.png';
//这里因为用了browserrouter，所以要加。如果用hashrouter就不用了。
//同时要和package.json中的homepage参数保持一致
import { Common } from '../Common';

function Home() {
  const navigate = useNavigate();
  //const [clientId, setClientId] = useState();
  const [clientId, setClientId] = useState('');
  const [account, setAccount] = useState('');
  const [isEnable, setIsEnable] = useState(false);

      //验证商户号(ClientId)和账号(Account)
    //url中的account是加密后的
    const Verify = async ():Promise<boolean> => {
      let params: any = { clientId: '', account: '' };
      if (window.location.search) {
          params = queryString.parse(window.location.search);
      }
      else if (window.location.hash.indexOf('?') > -1) {
          params = queryString.parse(window.location.hash.split('?')[1]);
      }
  
      //写两个，防止大小写错误
      let { clientId, clientid, account } = params;
  
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

          localStorage.setItem('clientId', params.clientId || params.clientid);
          localStorage.setItem('account', response.account);
          localStorage.setItem('terms', response.terms);
      }
      return true;
  }

  useEffect(() => {
    //因为useEffect不支持async/awiat，所以用的workaround
    const fn = async () =>{
      let result = await Verify();
      if(!result)
      {
          return;
      }
  };

  fn();

  }, [])

  const gotoVideoLive = () => {
    navigate(Common.Home + '/videolive' + window.location.search);
  };

  // const gotoPicLive = () => {
  //   navigate(Common.Home + '/piclive');
  // };

  return (
    <>
      {/* <img src={logo} alt="" className="logo" />
      {
       decryptedAccount &&  <>
          <p className='comment'>欢迎, {decryptedAccount}</p>
        </>
      } */}

      <p className='home-sub-title'>为保证您的信息安全</p>
      <p className='home-title'>请进行人脸识别验证</p>
      <ul className='home-notice'>
        <li><div style={{ backgroundImage:`url(${logoUser})` }} /><span><p className='big-text'>确保本人操作</p><p className='small-text'>非本人操作将无法通过认证</p></span></li>
        <li><div style={{ backgroundImage:`url(${logoLight})` }} /><span><p className='big-text'>识别光线适中</p><p className='small-text'>请保证光线不要过暗或过亮</p></span></li>
        <li><div style={{ backgroundImage:`url(${logoFace})` }} /><span><p className='big-text'>正面对准手机</p><p className='small-text'>保持您的脸出现在取景框内</p></span></li>
      </ul>

      <Space wrap block style={{  '--gap-vertical': '12px', position: 'fixed', bottom: '5vh', left: '15vw' }} align='center' justify='center' direction='vertical'>

        <Button block color='primary' size='large' shape='rounded' onClick={gotoVideoLive} style={{ width: '70vw' }} disabled={!isEnable}>
          &nbsp;&nbsp;&nbsp;&nbsp;开始视频活体验证&nbsp;&nbsp;&nbsp;&nbsp;
        </Button>
        <Checkbox onChange={(value)=>{ setIsEnable(value); }} >阅读并同意 <a onClick={(e)=> {navigate(Common.Home + '/terms' + window.location.search); e.preventDefault();}}>《用户隐私条款》</a></Checkbox>
        {/* <Button block color='primary' size='large' onClick={gotoPicLive}>
          &nbsp;&nbsp;&nbsp;&nbsp;图片活体检测&nbsp;&nbsp;&nbsp;&nbsp;
          </Button> */}
      </Space>
    </>

  );
}

export default Home;