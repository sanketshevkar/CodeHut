import '../App.css';
import { Link, useHistory, withRouter } from "react-router-dom";
//asets
import LandingVector from '../assets/LandingVector.png';
//ant-design components
import { Row, Col, Typography, Button, Input, Divider } from 'antd';
import { PlusOutlined, RiseOutlined } from '@ant-design/icons';


function Landing(props) {

  const { Title } = Typography;
  const { Search } = Input;
  let history = useHistory();

  const joinMeetingHandler = value =>{
    props.setOperation("join");
    props.setRoomId(value);
    history.push('/meeting');
  }

  const newMeetingHandler = () =>{
    props.setOperation("create");
  }

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
                      <Link to="/meeting">
                        <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={newMeetingHandler}>
                                New Meeting
                        </Button>
                      </Link>
                        
                      </Col>
                      <Col push={1}>
                        <Search
                          placeholder="Meeting Id"
                          onSearch={joinMeetingHandler}
                          style={{ width: 200 }}
                          enterButton={<Button type="ghost" shape="round" icon={<RiseOutlined />} />}
                        />
                      </Col>
                  </Row>
              </Col>
              <Col span={10} push={5}>
                  <img alt="Landing Page Vector" className="vectorimg" src={LandingVector} />
              </Col>
          </Row>
          <Divider />
      </div>
  );
}

export default withRouter(Landing);