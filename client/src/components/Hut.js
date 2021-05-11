import '../App.css';
import { useRef } from 'react';
import Draggable from 'react-draggable';
//components
import ProblemTab from './ProblemTab';
import CodeEditor from './CodeEditor';
import MediaView from './MediaView';
//ant-design components
import { Layout } from 'antd';

function Hut() {

  const { Content, Sider } = Layout;
  const nodeRef = useRef(null);

  return (
    <div style={{position: 'relative'}}>
      <Layout>
        <Sider width="400" theme="light" className="problemtab">
          <ProblemTab />
        </Sider>
        <Content theme="light">
          <CodeEditor />
          <Draggable nodeRef={nodeRef}>
            <div className="dragDiv" ref={nodeRef}>
              <MediaView />
            </div>
          </Draggable>
        </Content>
      </Layout>
    </div>
  );
}

export default Hut;