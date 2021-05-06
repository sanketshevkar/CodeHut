import '../App.css';
//asets
//import CodeHutLogo from '../assets/CodeHut.png';
//ant-design components
import { Row, Col } from 'antd';
import { Typography } from 'antd';


function Landing() {

  const { Title } = Typography;

  return (
      <div className="landing">
          <Row align="middle">
              <Col span={9}>
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
              </Col>
              <Col span={8} push={8}>
                  Hi World
              </Col>
          </Row>
      </div>
  );
}

export default Landing;