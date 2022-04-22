import { Button, Space } from 'antd-mobile';
import { useNavigate } from "react-router-dom";
import { Common } from '../Common';

const Terms = () => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{ margin: '10vh 7vw' }}>
                <h2>
                    功能说明
                </h2>
                <div>
                    视频认证操作会对您的脸部信息进行采集，认证前将征得使用您脸部特征进行认证识别的授权。
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
        </>
    );
}

export default Terms;