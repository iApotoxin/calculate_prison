import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddStudentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      depreciate_b: '',
      depreciate_col: 0,
      sum: 0,
    };
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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

    return (

      <Form layout="vertical" style={{ textAlign: 'center' }} onSubmit={this.handleSubmit}>
        <h1 style={{ color: '#d9d9d9' }}>Add Sub Information</h1>
        <br></br>
        <FormItem
          style={{ width: 300, margin: '0 auto', marginBottom: 20, marginTop: 20 }}
          validateStatus={IdError ? 'error' : ''}
          help={IdError || ''}
        >
          {getFieldDecorator('id', {
            rules: [{
              required: true,
              message: 'Please input id!',
              pattern: ''
            }],
          })(
            <Input placeholder="Id" onChange={this.handleInputChange('id')} />
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
              message: 'Please input depreciate_b!',
              pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
            }],
          })(
            <Input placeholder="Depreciate_b" onChange={this.handleInputChange('depreciate_b')} />
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
              message: 'Please input depreciate_col!',
              pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
            }],
          })(
            <Input placeholder="Depreciate_col" onChange={this.handleInputChange('depreciate_col')} />
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
              message: 'Please input sum!',
              pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
            }],
          })(
            <Input
              onChange={this.handleInputChange('sum')}
              placeholder="Sum" />
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
            disabled={hasErrors(getFieldsError())}
          >
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AddStudentComponent);