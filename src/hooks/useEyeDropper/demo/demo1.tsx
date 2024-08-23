import { useEyeDropper } from 'jhooks';

export default () => {
  const { color, openEyeDropper, isSupported } = useEyeDropper();
  if (!isSupported) {
    return <div>EyeDropper API is not supported in your browser.</div>;
  }
  
  return (
    <div>
        <button onClick={openEyeDropper}>Open EyeDropper</button>
        {color && <div>Color: {color}</div>}
    </div>
  );
};
