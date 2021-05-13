import '../App.css';
import { useState, useRef } from 'react';
import firebase from '../firebase/index';
import { Link } from "react-router-dom";
//asets
import LandingVector from '../assets/LandingVector.png';
//ant-design components
import { Row, Col, Typography, Button, Input, Divider } from 'antd';
import { PlusOutlined, RiseOutlined, FieldNumberOutlined } from '@ant-design/icons';


function Landing() {
  
  const [roomId, setRoomId] = useState("");

  const localStream = useRef();
  const remoteStream = useRef();

  const { Title } = Typography;

  const configuration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  const registerPeerConnectionListeners = () =>{
    console.log(peerConnection)
    peerConnection.addEventListener('icegatheringstatechange', () => {
      console.log(
          `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
    });
  
    peerConnection.addEventListener('connectionstatechange', () => {
      console.log(`Connection state change: ${peerConnection.connectionState}`);
    });
  
    peerConnection.addEventListener('signalingstatechange', () => {
      console.log(`Signaling state change: ${peerConnection.signalingState}`);
    });
  
    peerConnection.addEventListener('iceconnectionstatechange ', () => {
      console.log(
          `ICE connection state change: ${peerConnection.iceConnectionState}`);
    });
  }

  let peerConnection = null;

  const newMeetingHandler = async() =>{
    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').doc();
    console.log('Create PeerConnection with configuration: ', configuration);
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    localStream.current = stream;
    remoteStream.current = new MediaStream();
    peerConnection = new RTCPeerConnection(configuration); 
    registerPeerConnectionListeners();
    localStream.current.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream.current);
      });
    // Code for collecting ICE candidates below
    const callerCandidatesCollection = roomRef.collection('callerCandidates');

    peerConnection.addEventListener('icecandidate', event => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        callerCandidatesCollection.add(event.candidate.toJSON());
      });
    // Code for collecting ICE candidates above

    // Code for creating a room below
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('Created offer:', offer);

    const roomWithOffer = {
        'offer': {
        type: offer.type,
        sdp: offer.sdp,
        },
    };
    await roomRef.set(roomWithOffer);
    setRoomId(roomRef.id);
    // Code for creating a room above

    peerConnection.addEventListener('track', event => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach(track => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.current.addTrack(track);
      });
    });

    // Listening for remote session description below
    roomRef.onSnapshot(async snapshot => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });
    // Listening for remote session description above

    // Listen for remote ICE candidates below
    roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above
    console.log(roomId);
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
                        <Input placeholder="Enter Meeting Code" prefix={<FieldNumberOutlined />} />
                      </Col>
                      <Col push={1}>
                        <Button type="ghost" shape="round" icon={<RiseOutlined />} />
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

export default Landing;