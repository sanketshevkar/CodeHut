import '../App.css';
//asets
import CodeHutLogo from '../assets/CodeHut.png';
//ant-design components
import { Row, Col, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';


function Navbar() {
  return (
      <nav>
          <Row align="middle">
              <Col span={8}>
                  <a href="www.google.com"><img alt="CodeHut" src={CodeHutLogo}/></a>
              </Col>
              <Col push={8}>
                  <span className="timestamp">Thu, May 6 | 9:06 PM </span>
                  <Button className="github" type="text" size="large" icon={<GithubOutlined style={{fontSize: '50px'}} />} />
              </Col>
          </Row>
      </nav>
  );
}

export default Navbar;