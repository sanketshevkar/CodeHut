import '../App.css';
//ant-design components
import { Typography, Divider } from 'antd';

function ProblemTab() {

  const { Title, Text, Paragraph } = Typography;
  return (
    <div style={{padding: '5px'}} >
      <Divider style={{ borderWidth: 2, margin: 2 }} />
      <Title level={4}>
            Check for BST
      </Title>
      <Divider style={{ borderWidth: 2 }} />
      <Text><b>Question:</b></Text>
      <Paragraph>
            Given a binary tree. Check whether it is a BST or not.
            Note: We are considering that BSTs can not contain duplicate Nodes.
      </Paragraph>
      <Text><b>Task:</b></Text>
      <Paragraph>
            You don't need to read input or print anything.
            Your task is to complete the function <b>isBST()</b> which takes the root of the tree as a parameter and returns true if the given binary tree is BST, else returns false.
      </Paragraph>
      <Text><b>Time Complexity:</b></Text>
      <Paragraph>
            O(N).
      </Paragraph>
      <Text><b>Space Complexity:</b></Text>
      <Paragraph>
            O(Height of the BST).
      </Paragraph>
      <Text><b>Constraints:</b></Text>
      <Paragraph>
            0 &gt;= Number of edges &gt;= 100000
      </Paragraph>
      <Text><b>Example 1:</b></Text>
      <div className="codeBlock">
        <code style={{fontSize: "14px"}}>
        <b>Output:</b> 1 
        <br/>
        <br/>
        <b>Explanation:</b> 
        The left subtree of root node contains node 
        with key lesser than the root node’s key and 
        the right subtree of root node contains node 
        with key greater than the root node’s key.
        Hence, the tree is a BST.
        </code>
      </div>
    </div>
  );
}

export default ProblemTab;