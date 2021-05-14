import '../App.css';
import { useRef, useEffect } from 'react';
//ant-design components
import { Button, Tag } from 'antd';
import { VideoCameraOutlined, AudioOutlined } from '@ant-design/icons';

function MediaController(props) {

  const audioButtonStyle = {
    position: 'absolute',
    left: '35%',
    bottom: 0,
    margin: '15px'
  }

  const videoButtonStyle = {
    position: 'absolute',
    right: '35%',
    bottom: 0,
    margin: '15px' 
  }

  const localStream = useRef();
  const localStream2 = useRef();

  useEffect(() => {
    localStream.current.srcObject = props.localStream.current;
    localStream2.current.srcObject = props.localStream.current;
  }, [props.localStream])

  return (
    <div className="mediaControllerIncoming">
      <video className="incomingStream" muted autoPlay ref={localStream} playsInline />
      <div className="mediaControllerOutgoing">
          <Tag className="tag">User 2</Tag>
          <video className="outgoingStream" muted autoPlay ref={localStream2} playsInline/>
      </div>
      <Button shape="circle" ghost icon={<AudioOutlined />} style={ audioButtonStyle } />
      <Button shape="circle" ghost icon={<VideoCameraOutlined />} style={ videoButtonStyle } />
      <Tag className="tag">User 1</Tag>
    </div>
  );
}

export default MediaController;