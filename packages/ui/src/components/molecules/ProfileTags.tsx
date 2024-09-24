import {  Tag,Typography } from 'antd';
const { Title} = Typography
import { Tag as ITag } from "../../utils/types";
interface ProfileTagsProps {
  title: string
  data: ITag[] 
}
function ProfileTags({ data,title }: ProfileTagsProps) {
  return (
    <div style={{width:'100%',marginBottom:'1em'}}>
    <Title level={4}>{title}</Title> 
    <div style={{display:'flex',justifyContent:'flex-start',width:'100%',flexWrap:'wrap',backgroundColor:'#FFF9D0',padding:'1em'}}>
      {data.map((tag) => (
        <Tag key={tag.tag_id}>{tag.name}</Tag> // Display each tag from the data array
      ))}

    </div>
    </div>
  );
}

export default ProfileTags;
  