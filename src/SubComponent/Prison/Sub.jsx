import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, notification, Spin,DatePicker } from 'antd';
const FormItem = Form.Item;

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
const errorNoti = () => {
  notification.open({
    message: 'บันทึกไม่สำเร็จ',
    description: 'ไม่สามารถบันทึกข้อมูลลงในฐานข้อมูลได้ โปรดตรวจสอบให้แน่ใจว่าคุณได้เชื่อมต่ออินเตอร์เน็ตอยู่!',
    icon: <Icon type="close-circle" style={{ color: '#ff0000' }} />,
    duration: 8,
  });
};



class SubContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:'',
      id: '',
      depreciate_b: 0,
      depreciate_col: 0,
      sum: 0,  
      loading: false,
    };
  }
  PostData(data) {
    this.setState({ loading: true }); //enable loading
    fetch('https://cal-prison-api.herokuapp.com/post_asset.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    ).then((response) => response.json())
      .then((response) => {
        console.log("post detail response: ", response);
        if (response.error === false) {
          this.handleReset(); //reset form value
          this.props.form.validateFields(); //reset saame reload page
          successNoti();
          this.setState({ loading: false }) //disable loading
        }
        else {
          errorNoti();
          this.setState({ loading: false })//disable loading
        }
      }).catch(error => {
        errorNoti();
        this.setState({ loading: false })//disable loading
      });
    this.setState({ sum: 0, depreciate_col: 0, id: '', depreciate_b: 0, date:'', }) //reset state to default
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleReset = () => {
    this.props.form.resetFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (err) {
          return;
      }
      const allvalues = {
          ...values,
          'date': values.date.format('YYYY-MM-DD')
      }
      this.PostData(allvalues);
      console.log(allvalues);
      }
    });
  }
  handleInputChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  }

  render() {
    let summation = (parseFloat(this.state.depreciate_col) + parseFloat(this.state.sum)).toFixed(2);
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const IdError = isFieldTouched('id') && getFieldError('id');
    const BError = isFieldTouched('depreciate_b') && getFieldError('depreciate_b');
    const ColError = isFieldTouched('depreciate_col') && getFieldError('depreciate_col');
    const SumError = isFieldTouched('sum') && getFieldError('sum');
    const DateError = isFieldTouched('date') && getFieldError('date');

    return (
      <Spin size="large" tip="กำลังบันทึก..." spinning={this.state.loading} delay={500}>
        <div>
          <Form layout="vertical" style={{ textAlign: 'center' }} onSubmit={this.handleSubmit}>

            <h1 style={{ color: '#d9d9d9' }}>กรอกข้อมูลย่อย</h1>
            <br></br>

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
                <DatePicker  style={{ width: 300, margin: '0 auto' }} placeholder="วันเดือนปี" />
              )}
            </FormItem>
            <FormItem
              style={{ width: 300, margin: '0 auto', marginBottom: 20 }}
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
                <Input placeholder="เลขที่ครุภัณฑ์" onChange={this.handleInputChange('id')} />
              )}
            </FormItem>

            <FormItem
              style={{ width: 300, margin: '0 auto', marginBottom: 20 }}
              validateStatus={BError ? 'error' : ''}
              help={BError || ''}
            >
              {getFieldDecorator('depreciate_b', {
                rules: [{
                  required: true,
                  message: 'กรุณากรอกค่าเสื่อมราคาประจำปี! (เป็นตัวเลขเท่านั้น)',
                  pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                }],
              })(
                <Input placeholder="ค่าเสื่อมราคาประจำปี" onChange={this.handleInputChange('depreciate_b')} />
              )}
            </FormItem>
            <FormItem
              style={{ width: 300, margin: '0 auto', marginBottom: 20 }}
              validateStatus={ColError ? 'error' : ''}
              help={ColError || ''}
            >
              {getFieldDecorator('depreciate_col', {
                rules: [{
                  required: true,
                  message: 'กรุณากรอกค่าเสื่อมราคาสะสม! (เป็นตัวเลขเท่านั้น)',
                  pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                }],
              })(
                <Input placeholder="ค่าเสื่อมราคาสะสม" onChange={this.handleInputChange('depreciate_col')} />
              )}
            </FormItem>

            <FormItem
              style={{ width: 300, margin: '0 auto', marginBottom: 20 }}
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
                  onChange={this.handleInputChange('sum')}
                  placeholder="มูลค่าสุทธิ" />
              )}
            </FormItem>

            <FormItem style={{ textAlign: 'center' }}>
              <h1>summation = {summation}</h1>
            </FormItem>



            <FormItem style={{ textAlign: 'center' }}>
              <Button
                style={{ width: '120px' }}
                type="primary"
                htmlType="submit"
                // onClick={senderror}
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

export default Form.create()(SubContent);