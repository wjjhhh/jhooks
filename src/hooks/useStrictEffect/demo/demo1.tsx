import useStrictEffect from '..';
import react, { useEffect, useState, StrictMode } from 'react';

import ReactDom from 'react-dom/client';


const App = () => {
  const [num, setNum] = useState(0);
  useStrictEffect(() => {
    console.log('effect', num);

    return () => {
      console.log('clean up', num);
    };
  }, []);
//   console.count('app');
  return <>App</>;
};

const OtherApp = () => {
    useStrictEffect(() => {
        console.log('OtherApp effect');
        return () => {
            console.log('OtherApp clean up');
          };
    }, [])
    return <>OtherApp</>;
}

export default () => {
  const [visible, setVisible ] = useState(true)

  return (
    <StrictMode>
      <div>严格模式</div>
 
      <>
        {visible && <App />}
        {visible &&  <OtherApp />}
        
        <button onClick={() => setVisible(!visible)}>{visible ? '销毁App': '展示App'}</button>
      </>
    </StrictMode>
  );
};




