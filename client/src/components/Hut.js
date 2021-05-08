import '../App.css';
//components
import ProblemTab from './ProblemTab';
import CodeEditor from './CodeEditor';
import MediaView from './MediaView';
//ant-design components
import { Layout } from 'antd';

function Hut() {

  const { Content, Sider } = Layout;

  return (
    <div>
      <Layout>
        <Sider width="400" theme="light" className="problemtab">
          <ProblemTab />
        </Sider>
        <Content theme="light">
          <CodeEditor />
          <MediaView />
        </Content>
      </Layout>
    </div>
  );
}

export default Hut;