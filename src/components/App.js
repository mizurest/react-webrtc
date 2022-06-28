import React, {useState} from 'react';

import InputFormLocal from './InputFormLocal';
import InputFormRemote from './InputFormRemote';
import VideoGrid from './VideoGrid';

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
      <VideoGrid
        localName={localName}
        remoteName={remoteName}
      />
    </>
  )
}

export default App;
