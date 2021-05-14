import '../App.css';
import { useState } from 'react';
//components
import MediaController from './MediaController';
//ant-design components
import { Popover, Button } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';

function MediaView(props) {

  const [visible, setVisible] = useState(false);

  const handleVisibleChange = visibility =>{
      setVisible(visibility);
  }

  return (
    <div>
      <Popover
        content={<MediaController localStream={props.localStream} />}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
        style={{padding: 0}}
      >
        <Button type="primary" shape="circle" size="large" icon={<ArrowsAltOutlined />} />
      </Popover>
    </div>
  );
}

export default MediaView;