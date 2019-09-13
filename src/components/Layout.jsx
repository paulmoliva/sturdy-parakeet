import React from 'react'
import { AutoComplete, Layout, Menu, Breadcrumb, Badge, Icon, Tooltip, Modal } from 'antd';
import { uniq } from 'lodash'
import ItemList from './ItemList'
import Catalog from './catalog';

const { Option } = AutoComplete;
const { Header, Content, Footer } = Layout;

class AppLayout extends React.Component {
    constructor(props) {
        super(props)
        this.setItemList = this.setItemList.bind(this)
        this.addItem = this.addItem.bind(this)
        this.state = {
            items: [],
            result: [],
            count: 0,
            cart: [],
            visibleCatalog: false
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    catlogShowModal = () => {
        this.setState({
            visibleCatalog: true,
        });
    };

    catalogHandleOk = e => {
        console.log(e);
        this.setState({
            visibleCatalog: false,
        });
    };

    catalogHandleCancel = e => {
        console.log(e);
        this.setState({
            visibleCatalog: false,
        });
    };

    setItemList(items) {
        this.setState({ items })
    }

    handleSearch = value => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
            result = [];
        } else {
            result = this.state.items.filter(item => item.name.indexOf(value) > -1).map(item => item);
        }
        this.setState({ result });
    };

    addItem(item) {
        this.setState({
            count: this.state.count + 1,
            cart: this.state.cart.concat(item)
        })
    }

    render() {
        const { result } = this.state;
        const children = result.map(value => (
            <Option key={value.name}>{value.name}
                <Icon type="plus" onClick={this.addItem} /> Buy Me
            </Option>
        ));
        return <Layout className="layout">
            <Modal
                title="Cart"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <ul>
                    {uniq(this.state.cart).map(item => {
                        const count = this.state.cart.filter(iteree => iteree.name === item.name).length
                        const price = parseInt(item.price)
                        return (
                            <li>
                                {item.name} X {count} X ${price.toFixed(2)} = ${(count * price).toFixed(2)}
                            </li>
                        )
                    })}
                </ul>
            </Modal>
            <Modal
                title="Products"
                visible={this.state.visibleCatalog}
                onOk={this.catalogHandleOk}
                onCancel={this.catalogHandleCancel}
                width='88%'
            >
                <p>Price and Name are sortable, just click on the column header.</p>
                <Catalog products={this.state.items} />
            </Modal>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><img className="logo" src="https://via.placeholder.com/40" /></Menu.Item>
                    <AutoComplete
                        onSearch={this.handleSearch}
                        style={{ width: 800, marginRight: '10px' }}
                        size='large'
                    >
                        {children}
                    </AutoComplete>
                    <Menu.Item key="2" onClick={() => this.showModal()}>
                        <Badge count={this.state.count}>
                            <Icon type='shopping-cart' size={30} color='blue' />
                        </Badge>
                    </Menu.Item>
                    <Menu.Item key="3"><Icon type='bell' size={30} /></Menu.Item>
                    <Menu.Item key="4"><a onClick={this.catlogShowModal}  href="#">Products</a></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <ItemList setItems={this.setItemList} addItem={this.addItem} />
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Footer</Footer>
        </Layout>
    }
}

export default AppLayout;