import { Image, Space, Typography } from "antd";
const { Title } = Typography;
import { Community } from "../../utils/types";


function CommunityListItem({ image, name }: Community) {
  return (
    <Space align="start" style={{backgroundColor:'#FFF9D0',width:'100%',padding:'1em'}}>
      <Image
        src={`${image}`}
        width={100} // Adjust width as needed
        height={70} // Set fixed height for the image
        style={{ objectFit: 'cover' }} // Ensure the image covers the container
      />
      <div
        style={{
          display: 'flex',
          marginLeft: '10px',  // Adjust the margin as needed
          maxWidth: '200px',  // Adjust the max width as needed
          maxHeight: '100px',  // Fixed height for the text
          overflow: 'hidden',  // Hide overflowed content
          textOverflow: 'ellipsis',  // Show ellipsis for overflowed text
          whiteSpace: 'nowrap',  // Prevent text from wrapping to a new line
        }}
      >
        <Title level={5} style={{ margin: 0, lineHeight: '1.2em' }}>
          {name}
        </Title>
      </div>
    </Space>
  );
}

export default CommunityListItem;
