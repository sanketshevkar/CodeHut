import '../App.css';
//asets
import CodeHutLogo from '../assets/CodeHut.png';
//ant-design components
import { Row, Col } from 'antd';


function Navbar() {
  return (
      <nav>
          <Row align="middle">
              <Col span={8}>
                  <a href="www.google.com"><img alt="CodeHut" src={CodeHutLogo}/></a>
              </Col>
              <Col span={8} push={8}>
                  <span className="timestamp">Thu, May 6 | 9:06 PM </span>
              </Col>
          </Row>
      </nav>
  );
}

export default Navbar;