import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm,message, Form, Dropdown, Menu, Icon, Button } from 'antd';
import 'antd/dist/antd.css';

const data = [];
// for (let i = 0; i < 100; i++) {
//     data.push({
//         key: i.toString(),
//         id: `0000${i}`,
//         firstname: `firstname ${i}`,
//         lastname: `lastname ${i}`,
//         class: `6/${i}`,
//         password: `password ${i}`
//     });
// }

const FormItem = Form.Item;
const Search = Input.Search;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            datasearch: [],
            searchby: 'เลขที่ครุภัณฑ์',
            editingKey: '',
            searchvalue:'',
        };


        this.columns = [
            {
                title: 'เลขที่ครุภัณฑ์',
                dataIndex: 'id',
                width: 150,
                fixed:'left',
                key:'id',
                editable: false,
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'ประเภท',
                dataIndex: 'type',
                key:'type',
                width: 100,
                editable: true,
            },
            {
                title: 'สถานที่ตั้ง',
                dataIndex: 'location',
                key:'location',
                width: 150,
                editable: true,
            },
            {
                title: 'วันเดือนปี',
                dataIndex: 'date',
                key:'date',
                width: 150,
                editable: true,
            },
            {
                title: 'รายการ',
                dataIndex: 'item',
                key:'item',
                width: 200,
                editable: true,
            },
            {
                title: 'จำนวนหน่วย',
                dataIndex: 'amount',
                key:'amount',
                width: 150,
                editable: true,
            },
            {
                title: 'ราคาต่อหน่วย',
                dataIndex: 'price_amount',
                key:'price_amount',
                width: 150,
                editable: true,
            },
            {
                title: 'มูลค่ารวม',
                dataIndex: 'price',
                key:'price',
                width: 150,
                editable: true,
            },
            {
                title: 'อายุใช้งาน',
                dataIndex: 'lifetime',
                key:'lifetime',
                width: 150,
                editable: true,
            },
            {
                title: 'อัตราค่าเสื่อมราคา',
                dataIndex: 'depreciate_pct',
                key:'depreciate_pct',
                width: 150,
                editable: true,
            },
            {
                title: 'ค่าเสื่อมราคาประจำปี',
                dataIndex: 'depreciate_b',
                key:'depreciate_b',
                width: 180,
                editable: true,
            },
            {
                title: 'ค่าเสื่อมราคาสะสม',
                dataIndex: 'depreciate_col',
                key:'depreciate_col',
                width: 150,
                editable: true,
            },
            {
                title: 'มูลค่าสุทธิ',
                dataIndex: 'sum',
                key:'sum',
                width: 150,
                editable: true,
            },
            {
                title: 'หมายเหตุ',
                dataIndex: 'etc',
                key:'etc',
                width: 150,
                editable: true,
            },
            {
                // title: 'Operation',
                // dataIndex: 'operation',
                // render: (text, record) => {
                //     const editable = this.isEditing(record);
                //     return (
                //         <div>
                //             {editable ? (
                //                 <span>
                //                     <EditableContext.Consumer>
                //                         {form => (
                //                             <a
                //                                 href="javascript:;"
                //                                 onClick={() => this.save(form, record.key)}
                //                                 style={{ marginRight: 8 }}
                //                             >
                //                                 Save
                //           </a>
                //                         )}
                //                     </EditableContext.Consumer>
                //                     <Popconfirm
                //                         title="Sure to cancel?"
                //                         onConfirm={() => this.cancel(record.key)}
                //                     >
                //                         <a>Cancel</a>
                //                     </Popconfirm>
                //                 </span>
                //             ) : (
                //                     <div>
                //                         <a onClick={() => this.edit(record.key)} style={{ marginRight: 10 }} >Edit</a>
                //                         {
                //                             this.state.searchvalue ? (this.state.datasearch.length >= 1
                //                                 ? (
                //                                     <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                //                                         <a href="javascript:;">Delete</a>
                //                                     </Popconfirm>
                //                                 ) : null)
                //                                 : (this.state.data.length >= 1
                //                                     ? (
                //                                         <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                //                                             <a href="javascript:;">Delete</a>
                //                                         </Popconfirm>
                //                                     ) : null)
                //                         }
                //                     </div>


                //                 )}
                //         </div>
                //     );
                // },
            },
        ];
    }
    componentDidMount() {
       //load data
       this.get_main_data();
       
      }
    get_main_data=()=> {
        this.setState({ loading: true }); //enable loading
        fetch(`https://cal-prison-api.herokuapp.com/get_main_data.php?`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
        ).then((response) => response.json())
          .then(response => {
            // console.log("get detail response: ", response);
            if (response.error === false) {
              //set data to state
                // console.log(response.main_data);
                this.setState({data:response.main_data});
            }
            else {
              //notify faail
    
            }
    
          }).catch(error => {
            //notify fail
          });
      }

    // handleDelete = (key) => {
    //     if (this.state.searchvalue) {
    //         const datasearch = [...this.state.datasearch];
    //         this.setState({ datasearch: datasearch.filter(item => item.key !== key) });
    //     }
    //     else {
    //         const data = [...this.state.data];
    //         this.setState({ data: data.filter(item => item.key !== key) });
    //     }

    // }

    // isEditing = (record) => {
    //     return record.key === this.state.editingKey;
    // };

    // edit(key) {
    //     this.setState({ editingKey: key });
    // }

    // save(form, key) {
    //     form.validateFields((error, row) => {
    //         if (error) {
    //             return;
    //         }
    //         if (!this.state.searchvalue) {
    //             const newData = [...this.state.data];
    //             const index = newData.findIndex(item => key === item.key);
    //             if (index > -1) {
    //                 const item = newData[index];
    //                 newData.splice(index, 1, {
    //                     ...item,
    //                     ...row,
    //                 });
    //                 this.setState({ data: newData, editingKey: '' });
    //                 console.log("ba");
    //             } else {
    //                 console.log("aa");
    //                 newData.push(row);
    //                 this.setState({ data: newData, editingKey: '' });
    //             }

    //         }
    //         else {
    //             const newData = [...this.state.data];
    //             const index = newData.findIndex(item => key === item.key);
    //             if (index > -1) {
    //                 const item = newData[index];
    //                 newData.splice(index, 1, {
    //                     ...item,
    //                     ...row,
    //                 });
    //                 this.setState({ datasearch: newData, editingKey: '' });
    //                 console.log("ba");
    //             } else {
    //                 console.log("aa");
    //                 newData.push(row);
    //                 this.setState({ datasearch: newData, editingKey: '' });
    //             }
    //         }

    //     });
    // }

    // cancel = () => {
    //     this.setState({ editingKey: '' });
    // };

    SearchHandle = (e) => {
        this.setState({searchvalue:e.target.value});
        let textsearch = e.target.value;
        let newData;
        if (this.state.searchby === 'เลขที่ครุภัณฑ์') {
            newData = this.state.data.filter(a_data => a_data.id.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'ประเภท') {
            newData = this.state.data.filter(a_data => a_data.type.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'สถานที่ตั้ง') {
            newData = this.state.data.filter(a_data => a_data.location.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'วันเดือนปี') {
            newData = this.state.data.filter(a_data => a_data.date.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'รายการ') {
            newData = this.state.data.filter(a_data => a_data.item.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'จำนวนหน่วย') {
            newData = this.state.data.filter(a_data => a_data.amount.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'ราคาต่อหน่วย') {
            newData = this.state.data.filter(a_data => a_data.price_amount.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'มูลค่ารวม') {
            newData = this.state.data.filter(a_data => a_data.price.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'อายุใช้งาน') {
            newData = this.state.data.filter(a_data => a_data.lifetime.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'อัตราค่าเสื่อมราคา') {
            newData = this.state.data.filter(a_data => a_data.depreciate_pct.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'ค่าเสื่อมราคาประจำปี') {
            newData = this.state.data.filter(a_data => a_data.depreciate_b.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'ค่าเสื่อมราคาสะสม') {
            newData = this.state.data.filter(a_data => a_data.depreciate_col.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'มูลค่าสุทธิ') {
            newData = this.state.data.filter(a_data => a_data.sum.indexOf(textsearch) > -1);
        }
        else if (this.state.searchby === 'หมายเหตุ') {
            newData = this.state.data.filter(a_data => a_data.etc.indexOf(textsearch) > -1);
        }
        this.setState({ datasearch: newData });
    }

    handleMenuClick = (e) => {
        // console.log(e.item.props.children);
        message.info('ค้นหาโดย ' + e.item.props.children, 0.8);
        this.setState({ searchby: e.item.props.children });
    }

    emitEmpty = () => {
        this.setState({ searchvalue: '' });
      }


    render() {

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    // editing: this.isEditing(record),
                }),
            };
        });
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="id">เลขที่ครุภัณฑ์</Menu.Item>
                <Menu.Item key="type">ประเภท</Menu.Item>
                <Menu.Item key="location">สถานที่ตั้ง</Menu.Item>
                <Menu.Item key="date">วันเดือนปี</Menu.Item>
                <Menu.Item key="item">รายการ</Menu.Item>
                <Menu.Item key="amount">จำนวนหน่วย</Menu.Item>
                <Menu.Item key="price_amount">ราคาต่อหน่วย</Menu.Item>
                <Menu.Item key="price">มูลค่ารวม</Menu.Item>
                <Menu.Item key="lifetime">อายุใช้งาน</Menu.Item>
                <Menu.Item key="depreciate_pct">อัตราค่าเสื่อมราคา</Menu.Item>
                <Menu.Item key="depreciate_b">	ค่าเสื่อมราคาประจำปี</Menu.Item>
                <Menu.Item key="depreciate_col">ค่าเสื่อมราคาสะสม</Menu.Item>
                <Menu.Item key="sum">มูลค่าสุทธิ</Menu.Item>
                <Menu.Item key="etc">หมายเหตุ</Menu.Item>
            </Menu>
        );
        const suffix = this.state.searchvalue ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;


        return (
            <div>
                <div style={{ marginBottom: 10, textAlign: 'center'  }}>
                    <Dropdown overlay={menu}>
                        <Button style={{ marginRight: 1 }}>
                            เลือกคอลัม <Icon type="down" />
                        </Button>
                    </Dropdown>
                    <Input
                        placeholder={"ค้นหาโดย " + this.state.searchby}
                        // onSearch={value => console.log(value)}
                        suffix={suffix}
                        onChange={this.SearchHandle}
                        value={this.state.searchvalue}
                        style={{ width: '30vw'}}
                    />
                </div>
                <Table
                    scroll={{ x: 2100 }}
                    pagination={{ pageSize: 5 }}
                    components={components}
                    bordered
                    dataSource={this.state.searchvalue ? this.state.datasearch : this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                />
            </div>
        );
    }
}


export default EditableTable