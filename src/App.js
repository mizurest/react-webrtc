import React from 'react';

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
  return <div>Hello, React!</div>;
}

export default App;
