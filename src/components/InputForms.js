import React from 'react';

import InputFormLocal from './InputFormLocal';
import InputFormRemote from './InputFormRemote';


const InputForms = (props) => {
    const { rtcClient } = props;
    if(rtcClient === null) return <></>;

    return (
    <>
        <InputFormLocal rtcClient={rtcClient} />
        <InputFormRemote rtcClient={rtcClient} />
    </>
    );
}

export default InputForms;