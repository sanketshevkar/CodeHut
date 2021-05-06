import '../App.css';
//asets
import LandingVector from '../assets/LandingVector.png';
//ant-design components
import { Row, Col, Typography, Button, Input } from 'antd';
import { PlusOutlined, RiseOutlined, FieldNumberOutlined } from '@ant-design/icons';


function Landing() {

  const { Title } = Typography;

  return (
      <div className="landing">
          <Row align="middle">
              <Col span={8}>
                  <Title code={true}>
                      &lt;Code /&gt;
                  </Title>
                  <Title code={true}>
                      &lt;Discuss /&gt;
                  </Title>
                  <Title code={true}>
                      &lt;Play /&gt;
                  </Title>
                  <p className="product-text">
                      From Practising Coding Interview to Casual Code Jamming. Do it all!
                  </p>
                  <Row align="middle">
                      <Col>
                        <Button type="primary" shape="round" icon={<PlusOutlined />}>
                            New Meeting
                        </Button>
                      </Col>
                      <Col push={1}>
                        <Input placeholder="Enter Meeting Code" prefix={<FieldNumberOutlined />} />
                      </Col>
                      <Col push={1}>
                        <Button type="ghost" shape="round" icon={<RiseOutlined />} />
                      </Col>
                  </Row>
              </Col>
              <Col span={10} push={5}>
                  <img alt="Landing Page Vector" src={LandingVector} style={{width:"500px", height:"500px"}} />
              </Col>
          </Row>
      </div>
  );
}

export default Landing;