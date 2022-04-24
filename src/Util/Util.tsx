import axios from 'axios';
import { debug } from 'console';

export const GetSessionCode = async (token: string) => {
    const url = `https://aip.baidubce.com/rest/2.0/face/v1/faceliveness/sessioncode?access_token=${token}`;

    // fetch(url, {
    //     method: "POST",
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         'type': 1
    //     })
    // }).then(response => response.json()).then(json => { 
    //     alert(json.result.session_id);
    // })

    let json = await fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 
        'type=0&min_code_length=4&max_code_length=4'
        // JSON.stringify({
        //     //https://cloud.baidu.com/doc/FACE/s/Ikrycq2k2
        //     //0为语音验证和唇语验证步骤， 1为视频动作活体 默认0
        //     'type': 0,
        //     'min_code_length': 4,
        //     'max_code_length': 4
        // })
    }).then(response => response.json()).catch(error => {
        alert('请检查是否余额不足');
        return ['XXX', '000'];
    });
    
    return [json.result.session_id, json.result.code];
}

export const VideoVerify = async (token:string, sessionCode: string, videoBase64: string) => {
    const url = `https://aip.baidubce.com/rest/2.0/face/v1/faceliveness/verify?access_token=${token}`;

    // let formData = new FormData();
    // formData.append("session_id", sessionCode)
    // formData.append("lip_identify", "OFF")
    // formData.append("video_base64", videoBase64)

    let json = await fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'//'application/json;charset=UTF-8'
        },
        body: `type_identify=voice&video_base64=${videoBase64}&session_id=${sessionCode}&lip_identify=COMMON`
        
        // JSON.stringify({
        //     'type_identify': 'action',
        //     'video_base64': videoBase64,
        //     'session_id': sessionCode
        // })
    }).then(response => response.json()).catch(error => {
        //alert(error);

        return {
            err_msg: 'failed'
        }
    });
    //alert(JSON.stringify(json));
    
    let success = json.err_msg === 'SUCCESS';

    //参考：
    //https://ai.baidu.com/ai-doc/FACE/Ikrycq2k2
    if(success)
    {
        return [json.result.code.similarity, json.result.best_image.pic];
    }

    return [0, ''];
}

export const VerifyAccount = async (clientId: string, account: string) => {
    const url = `http://106.75.216.135:8004/api/livedetect/verify/${clientId}/${account}`;

    let json = await axios.get(url, {
        method: "GET",
    }).then(response => response.data).catch(error => {
        //alert(error);

        return {
            err_msg: 'failed'
        }
    });
    
    console.log(json);
    return json;
}

export const AddLiveDetectRecord = async (clientId: string, account: string, bestImg: string, score: number, result: boolean, transId: string ) => {
   
    const url = 'http://106.75.216.135:8004/api/livedetect/record';
    /// 如果客户端用content-type: application/json的话，这里可以在入参中使用对象(FromBody)
    /// 但遇到了preflight的问题，由于现在的方式，服务是host在另一个.net framework IIS服务上，所以遇到了options preflight无法处理的情况
    /// 只能把content-type改为application/x-www-form-urlencoded;charset=utf-8，这样就不能在入参中使用对象。 只能读取body再做json转换

    debugger;
    const request = axios.create({
        timeout: 10000
    });

    let data = {
        clientId,
        account,
        bestImg,
        score,
        result,
        transId
    }
    
    //提交数据
    const json = await request({
        url,
        method:'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data:JSON.stringify(data)//注意这里要使用data，如果需要在url上面拼接参数则需要使用param
    });

    //  debugger;
    // let json = await axios.post(url, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //     },
    //     body: JSON.stringify({
    //         clientId,
    //         account,
    //         videoBase64,
    //         bestImg,
    //         score,
    //         result
    //     })
    // }).then(response => response.data).catch(error => {
    //     //alert(error);

    //     return {
    //         err_msg: 'failed'
    //     }
    // });
    
    console.log(json);

    return json;
}

export const AddLiveDetectCode = async (clientId: string, account: string, transId: string ) => {
   
    const url = 'http://106.75.216.135:8004/api/livedetect/code';
    /// 如果客户端用content-type: application/json的话，这里可以在入参中使用对象(FromBody)
    /// 但遇到了preflight的问题，由于现在的方式，服务是host在另一个.net framework IIS服务上，所以遇到了options preflight无法处理的情况
    /// 只能把content-type改为application/x-www-form-urlencoded;charset=utf-8，这样就不能在入参中使用对象。 只能读取body再做json转换

    const request = axios.create({
        timeout: 10000
    });

    let data = {
        clientId,
        account,       
        transId
    }
    
    //提交数据
    const json = await request({
        url,
        method:'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data:JSON.stringify(data)//注意这里要使用data，如果需要在url上面拼接参数则需要使用param
    });
}

export const ClientCallback = async (clientId: string, transId: string, bestImg: string, score: number, result: boolean ) => {
   
    const url = 'http://106.75.216.135:8004/api/livedetect/client/callback';
    /// 如果客户端用content-type: application/json的话，这里可以在入参中使用对象(FromBody)
    /// 但遇到了preflight的问题，由于现在的方式，服务是host在另一个.net framework IIS服务上，所以遇到了options preflight无法处理的情况
    /// 只能把content-type改为application/x-www-form-urlencoded;charset=utf-8，这样就不能在入参中使用对象。 只能读取body再做json转换

    const request = axios.create({
        timeout: 10000
    });

    let data = {
        clientId,
        transId,
        bestImg,
        score,
        result
    }
    
    //提交数据
    const json = await request({
        url,
        method:'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        data:JSON.stringify(data)//注意这里要使用data，如果需要在url上面拼接参数则需要使用param
    });
}