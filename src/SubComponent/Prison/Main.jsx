import React, { Component } from 'react';
import { Form, Select, DatePicker, Input, Button, notification, Icon, Spin } from 'antd';
import 'antd/dist/antd.css';
const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const successNoti = () => {
    notification.open({
        message: 'บันทึกสำเร็จ',
        description: 'บันทึกข้อมูลลงในฐานข้อมูลสำเร็จแล้ว...',
        icon: <Icon type="check-circle" style={{ color: '#39e600' }} />,
        duration: 4.5,
    });
};
const errorNoti = (type) => {
    let desc = '';
    if (type === 'no_connect') {
      desc = 'ไม่สามารถบันทึกข้อมูลลงในฐานข้อมูลได้ โปรดตรวจสอบให้แน่ใจว่าคุณได้เชื่อมต่ออินเตอร์เน็ตอยู่!';
    }
    else if (type === 'get_err_true') {
      desc = 'ไม่สามารถบันทึกข้อมูลลงในฐานข้อมูลได้ โปรดตรวจสอบว่ากรอกเลขที่ครุภัณฑ์ ซ้ำหรือไม่!';
    }
    notification.open({
        message: 'บันทึกไม่สำเร็จ',
        description: desc,
        icon: <Icon type="close-circle" style={{ color: '#ff0000' }} />,
        duration: 8,
    });
};


class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            id: '',
            type:'',
            date:'',
            location:'',
            item:'',
            amount:0,
            price_amount:0,
            price:0,
            lifetime:'',
            depreciate_pct:0,
            depreciate_b: 0,
            depreciate_col: 0,
            sum: 0,
            etc:'',

        };
    }
    PostData(data) {
        this.setState({ loading: true });//enable loading
        fetch('https://cal-prison-api.herokuapp.com/post_asset_main.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((response) => {
                console.log("post detail response: ", response);
                if (response.error === false) {
                    this.handleReset(); //reset form value
                    this.props.form.validateFields(); //reset saame reload page
                    successNoti();
                    this.setState({ loading: false });//disable loading
                }
                else {
                    errorNoti('get_err_true');
                    this.setState({ loading: false });//disable loading
                }
            }).catch(error => {
                errorNoti('no_connect');
                this.setState({ loading: false });//disable loading
            });
        this.setState({ sum: 0, depreciate_col: 0, id: '', depreciate_b: 0, }) //reset state to default
    }

    // getType() {
    //     fetch('https://cal-prison-api.herokuapp.com/get_type.php', {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     }).then((response) => response.json())
    //         .then((response) => {
    //             console.log("get detail response: ", response);
    //             if (response.error === false) {
    //                 console.log(response.types)
    //                 response.types.map((item) => {
    //                     console.log(item.type_name)
    //                     //store type to state
    //                     //this.setState({type:[item.id:item.type_name]});
    //                 })
    //             }
    //             else {
    //                 this.setState({ type_error: true });
    //             }

    //         }).catch(err => {
    //             this.setState({ type_error: true });
    //         });
    // }
    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.getType();
        this.props.form.validateFields();
    }
    handleReset = () => {
        this.props.form.resetFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const allvalues = {
                ...values,
                'date': values.date.format('YYYY-MM-DD')
            }
            this.PostData(allvalues);
            // console.log(allvalues);
        });
    }
    handleInputChange = (prop) => (event) => {
        this.setState({ [prop]: event.target.value });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


        // Only show error after a field is touched.
        const IdError = isFieldTouched('id') && getFieldError('id');
        const TError = isFieldTouched('type') && getFieldError('type');
        const DateError = isFieldTouched('date') && getFieldError('date');
        const LocationError = isFieldTouched('location') && getFieldError('location');
        const ItemError = isFieldTouched('item') && getFieldError('item');
        const AmountError = isFieldTouched('amount') && getFieldError('amount');
        const PriceAmountError = isFieldTouched('price_amount') && getFieldError('price_amount');
        const PriceError = isFieldTouched('price') && getFieldError('price');
        const LifeTimeError = isFieldTouched('lifetime') && getFieldError('lifetime');
        const DePctError = isFieldTouched('depreciate_pct') && getFieldError('depreciate_pct');
        const DeColError = isFieldTouched('depreciate_col') && getFieldError('depreciate_col');
        const DeBError = isFieldTouched('depreciate_b') && getFieldError('depreciate_b');
        const SumError = isFieldTouched('sum') && getFieldError('sum');
        const EtcError = isFieldTouched('etc') && getFieldError('etc');

        // const type_of_item = [
        //     { id: 1, name: 'ครุภัณฑ์ก่อสร้าง' },
        //     { id: 2, name: 'ครุภัณฑ์การศึกษา' },
        //     { id: 3, name: 'ครุภัณฑ์กีฬา' },
        //     { id: 4, name: 'ครุภัณฑ์เกษตร' },
        //     { id: 5, name: 'ครุภัณฑ์คอมพิวเตอร์' },
        //     { id: 6, name: 'ครุภัณฑ์โฆษณาและเผยแพร่' },
        //     { id: 7, name: 'ครุภัณฑ์งานบ้านงานครัว' },
        //     { id: 8, name: 'ครุภัณฑ์ดนตรี' },
        //     { id: 9, name: 'ครุภัณฑ์ไฟฟ้าและวิทยุ' },
        //     { id: 10, name: 'ครุภัณฑ์ยานพาหนะ' },
        //     { id: 11, name: 'ครุภัณฑ์โรงงาน' },
        //     { id: 12, name: 'ครุภัณฑ์วัสดุ' },
        //     { id: 13, name: 'ครุภัณฑ์วิทยาศาตร์' },
        //     { id: 14, name: 'ครุภัณฑ์สำนักงาน1' },
        //     { id: 15, name: 'ครุภัณฑ์อาคารและสิ่งก่อสร้าง' },
        // ];

        return (
            <Spin size="large" tip="กำลังบันทึก..." spinning={this.state.loading} delay={500}>
                <div>
                    <Form layout="inline" style={{ textAlign: 'center' }} onSubmit={this.handleSubmit}>
                        <h1 style={{ color: '#d9d9d9' }}>กรอกข้อมูลหลัก</h1>
                        <br></br>

                        <FormItem
                            validateStatus={IdError ? 'error' : ''}
                            help={IdError || ''}
                        >
                            {getFieldDecorator('id', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกเลขที่ครุภัณฑ์!',
                                    pattern: ''
                                }],
                            })(
                                <Input style={{ width: '300px' }} placeholder="เลขที่ครุภัณฑ์" onChange={this.handleInputChange('id')} />
                            )}
                        </FormItem>

                        <FormItem
                            validateStatus={TError ? 'error' : ''}
                            help={TError || ''}
                        >
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณาเลือกประเภท!',
                                    pattern: ''
                                }],
                            })(
                                <Select
                                    style={{ width: '300px' }}
                                    placeholder="ประเภท"
                                >
                                    {/* {type_of_item.map((item)=>{
                                    <Option value={item.id}>{item.name}</Option>
                                })} */}
                                    <Option value='1'>ครุภัณฑ์ก่อสร้าง</Option>
                                    <Option value='2'>ครุภัณฑ์การศึกษา</Option>
                                    <Option value='3'>ครุภัณฑ์กีฬา</Option>
                                    <Option value='4'>ครุภัณฑ์เกษตร</Option>
                                    <Option value='5'>ครุภัณฑ์คอมพิวเตอร์</Option>
                                    <Option value='6'>ครุภัณฑ์โฆษณาและเผยแพร่</Option>
                                    <Option value='7'>ครุภัณฑ์งานบ้านงานครัว</Option>
                                    <Option value='8'>ครุภัณฑ์ดนตรี</Option>
                                    <Option value='9'>ครุภัณฑ์ไฟฟ้าและวิทยุ</Option>
                                    <Option value='10'>ครุภัณฑ์ยานพาหนะ</Option>
                                    <Option value='11'>ครุภัณฑ์โรงงาน</Option>
                                    <Option value='12'>ครุภัณฑ์วัสดุ</Option>
                                    <Option value='13'>ครุภัณฑ์วิทยาศาตร์</Option>
                                    <Option value='14'>ครุภัณฑ์สำนักงาน</Option>
                                    <Option value='15'>ครุภัณฑ์อาคารและสิ่งก่อสร้าง</Option>

                                </Select>
                            )}
                        </FormItem>
                        <br></br>
                        <FormItem
                            validateStatus={LocationError ? 'error' : ''}
                            help={LocationError || ''}
                        >
                            {getFieldDecorator('location', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกสถานที่ตั้ง!',
                                    pattern: ''
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    placeholder="สถานที่ตั้ง"
                                    onChange={this.handleInputChange('location')} />
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={DateError ? 'error' : ''}
                            help={DateError || ''}
                        >
                            {getFieldDecorator('date', {
                                rules: [{
                                    type: 'object',
                                    required: true,
                                    message: 'กรุณาเลือกวันเดือนปี!'
                                }]
                            })(
                                <DatePicker style={{ width: '300px' }} placeholder="วันเดือนปี" />
                            )}
                        </FormItem>
                        {/* <hr></hr> */}
                        <br></br>
                        <br></br>
                        <FormItem
                            validateStatus={ItemError ? 'error' : ''}
                            help={ItemError || ''}
                        >
                            {getFieldDecorator('item', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกรายการ!',
                                    pattern: ''
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('item')}
                                    placeholder="รายการ" />
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={AmountError ? 'error' : ''}
                            help={AmountError || ''}
                        >
                            {getFieldDecorator('amount', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกจำนวนหน่วย! (เป็นจำนวนเต็มเท่านั้น)',
                                    pattern: '^[0-9]*$'
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('amount')}
                                    placeholder="จำนวนหน่วย" />
                            )}
                        </FormItem>
                        <br></br>
                        <FormItem
                            validateStatus={PriceAmountError ? 'error' : ''}
                            help={PriceAmountError || ''}
                        >
                            {getFieldDecorator('price_amount', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกราคาต่อหน่วย! (เป็นตัวเลขเท่านั้น)',
                                    pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$',
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('price_amount')}
                                    placeholder="ราคาต่อหน่วย" />
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={PriceError ? 'error' : ''}
                            help={PriceError || ''}
                        >
                            {getFieldDecorator('price', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกมูลค่ารวม! (เป็นตัวเลขเท่านั้น)',
                                    pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('price')}
                                    placeholder="มูลค่ารวม" />
                            )}
                        </FormItem>
                        <br></br>
                        <FormItem
                            validateStatus={LifeTimeError ? 'error' : ''}
                            help={LifeTimeError || ''}
                        >
                            {getFieldDecorator('lifetime', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกอายุใช้งาน! (เป็นจำนวนเต็มเท่านั้น)',
                                    pattern: '^[0-9]*$'
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('lifetime')}
                                    placeholder="อายุใช้งาน" />
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={DePctError ? 'error' : ''}
                            help={DePctError || ''}
                        >
                            {getFieldDecorator('depreciate_pct', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกอัตราค่าเสื่อมราคา! (เป็นตัวเลขเท่านั้น)',
                                    pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('depreciate_pct')}
                                    placeholder="อัตราค่าเสื่อมราคา" />
                            )}
                        </FormItem>
                        <br></br>
                        <FormItem
                            validateStatus={DeBError ? 'error' : ''}
                            help={DeBError || ''}
                        >
                            {getFieldDecorator('depreciate_b', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกค่าเสื่อมราคาประจำปี! (เป็นตัวเลขเท่านั้น)',
                                    pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('depreciate_b')}
                                    placeholder="ค่าเสื่อมราคาประจำปี" />
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={DeColError ? 'error' : ''}
                            help={DeColError || ''}
                        >
                            {getFieldDecorator('depreciate_col', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกค่าเสื่อมราคาสะสม! (เป็นตัวเลขเท่านั้น)',
                                    pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('depreciate_col')}
                                    placeholder="ค่าเสื่อมราคาสะสม" />
                            )}
                        </FormItem>
                        <br></br>
                        <FormItem
                            validateStatus={SumError ? 'error' : ''}
                            help={SumError || ''}
                        >
                            {getFieldDecorator('sum', {
                                rules: [{
                                    required: true,
                                    message: 'กรุณากรอกมูลค่าสุทธิ! (เป็นตัวเลขเท่านั้น)',
                                    pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('sum')}
                                    placeholder="มูลค่าสุทธิ" />
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={EtcError ? 'error' : ''}
                            help={EtcError || ''}
                        >
                            {getFieldDecorator('etc', {
                                rules: [{
                                    required: false,
                                    message: 'กรุณากรอกหมายเหตุ!',
                                    pattern: ''
                                }],
                            })(
                                <Input
                                    style={{ width: '300px' }}
                                    onChange={this.handleInputChange('etc')}
                                    placeholder="หมายเหตุ" />
                            )}
                        </FormItem>
                        <br></br>
                        <FormItem style={{ textAlign: 'center' }}>
                            <Button
                                style={{ width: '120px' }}
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                            >
                                บันทึก
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Spin>
        );
    }

}


export default Form.create()(MainContent);