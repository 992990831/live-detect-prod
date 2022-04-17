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
    
    debugger
    let success = json.err_msg === 'SUCCESS';

    if(success)
    {
        return json.result.code.similarity;
    }

    return 0;
}

export const VerifyAccount = async (clientId: string, account: string) => {
    const url = `http://106.75.216.135:8004/api/livedetect/verify/${clientId}/${account}`;

    let json = await fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'//'application/json;charset=UTF-8'
        },
      
    }).then(response => response.json()).catch(error => {
        //alert(error);

        return {
            err_msg: 'failed'
        }
    });
    
    console.log(json);

    return json;
}