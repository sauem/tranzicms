import {observer} from "mobx-react";
import BreadPath from "../../../common/BreadPath";
import {Button, Popconfirm, Space, Spin, Table} from "antd";
import {articleStore, IArticle} from "../ArticleStore";
import Helper from "../../../common/Helper";
import {Link} from "react-router-dom";
import {useEffect} from "react";

const Article = () => {
    const onGetList = async (params?: any) => {
        await articleStore.getList(params);
    }
    useEffect(() => {
        (async () => onGetList())()
    }, [])
    return (
        <>
            <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Bài viết', link: '/article'},
            ]}/>

            <Spin spinning={articleStore.fetching}>
                <div className={`text-right mb-3`}>
                    <Link to={`/article/create`}>
                        <Button>Thêm bài viết</Button>
                    </Link>
                </div>
                <Table
                    dataSource={articleStore.list}
                    pagination={articleStore.page}
                    onChange={({current, pageSize}: any) => onGetList({page: (current - 1), size: pageSize})}
                    columns={[
                        {title: 'Tiêu đề', dataIndex: 'name', key: 'name'},
                        {title: 'Thể loại', dataIndex: 'type', key: 'type'},
                        {
                            title: 'Danh mục',
                            dataIndex: 'category',
                            key: 'category',
                            render: category => category?.name ?? '---'
                        },
                        {title: 'Trạng thái', dataIndex: 'state', key: 'state', render: stt => Helper.renderStt(stt)},
                        {
                            title: 'Hành động', dataIndex: 'id', key: 'id', render: (id, raw: IArticle) => {
                                return (
                                    <Space>
                                        <Link to={`/article/${id}`}>
                                            <Button>Sửa</Button>
                                        </Link>
                                        <Popconfirm onConfirm={() => articleStore.delete(id)} title={`Xóa bài viết?`}>
                                            <Button>Xóa</Button>
                                        </Popconfirm>
                                    </Space>
                                )
                            }
                        },
                    ]}
                />
            </Spin>
        </>
    )
}
export default observer(Article);
