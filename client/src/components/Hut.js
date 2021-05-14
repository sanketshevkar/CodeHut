import '../App.css';
import { useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import firebase from '../firebase/index';
//components
import ProblemTab from './ProblemTab';
import CodeEditor from './CodeEditor';
import MediaView from './MediaView';
//ant-design components
import { Layout } from 'antd';

function Hut(props) {

  const { Content, Sider } = Layout;
  const nodeRef = useRef(null);
  const localStream = useRef();
  const remoteStream = useRef();
  const peerConnection = useRef();

  const registerPeerConnectionListeners = () =>{
    console.log(peerConnection.current)
    peerConnection.current.addEventListener('icegatheringstatechange', () => {
      console.log(
          `ICE gathering state changed: ${peerConnection.current.iceGatheringState}`);
    });
  
    peerConnection.current.addEventListener('connectionstatechange', () => {
      console.log(`Connection state change: ${peerConnection.current.connectionState}`);
    });
  
    peerConnection.current.addEventListener('signalingstatechange', () => {
      console.log(`Signaling state change: ${peerConnection.current.signalingState}`);
    });
  
    peerConnection.current.addEventListener('iceconnectionstatechange ', () => {
      console.log(
          `ICE connection state change: ${peerConnection.current.iceConnectionState}`);
    });
  }

  useEffect(() => {
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

    if(props.operation === "create"){
      const createRoom = async() =>{
        const db = firebase.firestore();
        const roomRef = await db.collection('rooms').doc();
        console.log('Create PeerConnection with configuration: ', configuration);
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        // console.log(stream);
        localStream.current = stream;
        // setLStream(localStream.current);
        remoteStream.current = new MediaStream();
        peerConnection.current = new RTCPeerConnection(configuration); 
        registerPeerConnectionListeners();
        localStream.current.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, localStream.current);
          });
        // Code for collecting ICE candidates below
        const callerCandidatesCollection = roomRef.collection('callerCandidates');

        peerConnection.current.addEventListener('icecandidate', event => {
            if (!event.candidate) {
              console.log('Got final candidate!');
              return;
            }
            console.log('Got candidate: ', event.candidate);
            callerCandidatesCollection.add(event.candidate.toJSON());
          });
        // Code for collecting ICE candidates above

        // Code for creating a room below
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        console.log('Created offer:', offer);

        const roomWithOffer = {
            'offer': {
            type: offer.type,
            sdp: offer.sdp,
            },
        };
        await roomRef.set(roomWithOffer);
        // Code for creating a room above

        peerConnection.current.addEventListener('track', event => {
          console.log('Got remote track:', event.streams[0]);
          event.streams[0].getTracks().forEach(track => {
            console.log('Add a track to the remoteStream:', track);
            remoteStream.current.addTrack(track);
          });
        });

        // Listening for remote session description below
        roomRef.onSnapshot(async snapshot => {
          const data = snapshot.data();
          if (!peerConnection.current.currentRemoteDescription && data && data.answer) {
            console.log('Got remote description: ', data.answer);
            const rtcSessionDescription = new RTCSessionDescription(data.answer);
            await peerConnection.current.setRemoteDescription(rtcSessionDescription);
          }
        });
        // Listening for remote session description above

        // Listen for remote ICE candidates below
        roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(async change => {
            if (change.type === 'added') {
              let data = change.doc.data();
              console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
              await peerConnection.current.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
        // Listen for remote ICE candidates above
      }

      createRoom();

    }else if(props.operation === "join"){

    }
  }, [props.operation]);

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
              <MediaView localStream={localStream}/>
            </div>
          </Draggable>
        </Content>
      </Layout>
    </div>
  );
}

export default Hut;