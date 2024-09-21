import { Typography } from 'antd';

const { Title } = Typography;

function ProfileInfo({ name, email }:{ name:string, email:string }) {
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginTop:'1em'}}>
      <Title level={2} style={{ color: 'white' ,margin:0}}>{name}</Title>
      <Title level={5} style={{ color: 'white' ,margin:0}} >{email}</Title>
    </div>
  );
}

export default ProfileInfo;
