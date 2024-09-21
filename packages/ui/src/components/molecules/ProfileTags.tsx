import {  Tag,Typography } from 'antd';
const { Title} = Typography

function ProfileTags({ data,title }: { data: string[],title:string }) {
  return (
    <div style={{width:'100%',marginBottom:'1em'}}>
    <Title level={4}>{title}</Title> 
    <div style={{display:'flex',justifyContent:'flex-start',width:'100%',flexWrap:'wrap',backgroundColor:'#FFF9D0',padding:'1em'}}>
      {data.map((tag, index) => (
        <Tag key={index}>{tag}</Tag> // Display each tag from the data array
      ))}

    </div>
    </div>
  );
}

export default ProfileTags;
  