import '../App.css';
//ant-design components
import { Button, Tag } from 'antd';
import { VideoCameraOutlined, AudioOutlined } from '@ant-design/icons';

function MediaController() {

  const audioButtonStyle = {
    position: 'absolute',
    left: '35%',
    bottom: 0,
    margin: '5px'
  }

  const videoButtonStyle = {
    position: 'absolute',
    right: '35%',
    bottom: 0,
    margin: '5px' 
  }

  return (
    <div className="incomingStream">
      <div className="outgoingStream">
        <Tag style={{margin: '3px'}}>User 2</Tag>
      </div>
      <Button shape="circle" ghost icon={<AudioOutlined />} style={ audioButtonStyle } />
      <Button shape="circle" ghost icon={<VideoCameraOutlined />} style={ videoButtonStyle } />
      <Tag style={{margin: '3px'}}>User 1</Tag>
    </div>
  );
}

export default MediaController;