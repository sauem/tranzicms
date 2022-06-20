const adminRouters = [
    {
        name: 'Trang chủ',
        path: '/',
        extract: true,
        icon: 'icon-dashboard'
    },
    {
        name: 'Banner',
        path: '/banner',
        extract: true,
        icon: 'icon-refer'
    },
    {
        name: 'Đơn hàng',
        path: '/order',
        extract: true,
        icon: 'icon-shopping-cart'
    },
    {
        name: 'Kho ảnh',
        path: '/media',
        extract: true,
        icon: 'icon-image'
    },
    {
        name: 'Sản phẩm',
        extract: true,
        icon: 'icon-pricing-table',
        subs: [
            {
                name: 'Sản phẩm',
                path: '/product',
            },
            {
                name: 'Danh mục sản phẩm',
                path: '/product/archive',
            },
            {
                name: 'Nhà sản xuất',
                path: '/product/manufacturer',
            }
        ]
    },
    {
        name: 'Quản lý kho',
        extract: true,
        icon: 'icon-widgets',
        subs: [
            {
                name: 'Danh sách kho',
                path: '/warehouse',
            },
            {
                name: 'Tồn kho',
                path: '/inventory',
            }
        ]
    },
    {
        name: 'Bài viết',
        extract: true,
        icon: 'icon-quote-backward',
        subs: [
            {
                name: 'Bài viết',
                path: '/article'
            },
            {
                name: 'Danh mục bài viết',
                path: '/article/archive',
            }
        ]
    }
]
export default adminRouters;
