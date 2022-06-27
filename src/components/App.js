import React, {useState} from 'react';
import InputFormLocal from './InputFormLocal';
import InputFormRemote from './InputFormRemote';

const getMedia = async () => {
  const constraints = {audio: true, video: true} //　要求するメディアの種類を指定

  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
    // ストリームを使用
  } catch(err) {
    console.error(err)
  }
}

// ユーザーにメディアの使用許可を求める
getMedia();

const App = () => {
  const [localName, setLocalName] = useState('') // 自分の名前を保持するState
  const [remoteName, setRemoteName] = useState('') // 相手の名前を保持するState
  console.log({localName, remoteName})
  return (
    <>
      <InputFormLocal
        localName={localName}
        setLocalName={setLocalName}
      />
      <InputFormRemote
        localName={localName}
        remoteName={remoteName}
        setRemoteName={setRemoteName}
      />
    </>
  )
}

export default App;
