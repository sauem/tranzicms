import {observer} from "mobx-react";
import {Button, Card, Image, Table} from "antd";
import {useState} from "react";

const Banner = () => {
    const [visible, setVisible] = useState(false);
    return (
        <Card title={`Banner / Slider`}
              extra={<Button onClick={() => setVisible(true)}>Thêm banner</Button>}>
            <Table
                dataSource={[]}
                columns={[
                    {
                        title: 'STT',
                        dataIndex: 'id',
                        render: (id, raw, key) => {
                            return `#${key}`;
                        }
                    },
                    {
                        title: 'Image',
                        dataIndex: 'image',
                        key: 'image',
                        render: image => {
                            return <Image
                                width={80}
                                height={60}
                            />
                        }
                    },
                    {title: 'Vị trí', dataIndex: 'order', key: 'order'}
                ]}
            />
        </Card>
    )
}
export default observer(Banner)
