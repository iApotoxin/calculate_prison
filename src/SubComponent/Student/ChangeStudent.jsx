import React, { Component } from 'react';
import { Form, Select, DatePicker, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './student.css'
const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class EditableTable extends React.Component {
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
            if (err) {
               return;
            }
            const allvalues = {
                ...values,
                'date':values.date.format('YYYY-MM-DD')
            }
            console.log(allvalues);
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
        const TError = isFieldTouched('type') && getFieldError('type');
        const DateError = isFieldTouched('date') && getFieldError('date');
        const LocationError = isFieldTouched('location') && getFieldError('location');
        const ItemError = isFieldTouched('item') && getFieldError('item');
        const AmountError = isFieldTouched('amount') && getFieldError('amount');
        const PriceAmountError = isFieldTouched('price_amount') && getFieldError('price_amount');
        const PriceError = isFieldTouched('price') && getFieldError('price');
        const LifeTimeError = isFieldTouched('life_time') && getFieldError('life_time');
        const DePctError = isFieldTouched('depreciate_pct') && getFieldError('depreciate_pct');
        const DeColError = isFieldTouched('depreciate_col') && getFieldError('depreciate_col');
        const DeBError = isFieldTouched('depreciate_b') && getFieldError('depreciate_b');
        const SumError = isFieldTouched('sum') && getFieldError('sum');
        const EtcError = isFieldTouched('etc') && getFieldError('etc');

        return (

            <Form layout="inline" style={{ textAlign: 'center' }} onSubmit={this.handleSubmit}>
                <h1 style={{ color: '#d9d9d9' }}>Add Main Information</h1>
                <br></br>

                <FormItem
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
                        <Input style={{ width: '25em' }} placeholder="Id" onChange={this.handleInputChange('id')} />
                    )}
                </FormItem>

                <FormItem
                    validateStatus={TError ? 'error' : ''}
                    help={TError || ''}
                >
                    {getFieldDecorator('type', {
                        rules: [{
                            required: true,
                            message: 'Please input type!',
                            pattern: ''
                        }],
                    })(
                        <Select
                            style={{ width: '25em' }}
                            placeholder="type"
                        >
                            <Option value="1">type1</Option>
                            <Option value="2">type2</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    validateStatus={LocationError ? 'error' : ''}
                    help={LocationError || ''}
                >
                    {getFieldDecorator('location', {
                        rules: [{
                            required: true,
                            message: 'Please input location!',
                            pattern: ''
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            placeholder="location"
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
                            message: 'Please select date!'
                        }]
                    })(
                        <DatePicker style={{ width: '25em' }} />
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
                            message: 'Please input item!',
                            pattern: ''
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('item')}
                            placeholder="item" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={AmountError ? 'error' : ''}
                    help={AmountError || ''}
                >
                    {getFieldDecorator('amount', {
                        rules: [{
                            required: true,
                            message: 'Please input amount!',
                            pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('amount')}
                            placeholder="amount" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={PriceAmountError ? 'error' : ''}
                    help={PriceAmountError || ''}
                >
                    {getFieldDecorator('price_amount', {
                        rules: [{
                            required: true,
                            message: 'Please input price_amount!',
                            pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('price_amount')}
                            placeholder="price_amount" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={PriceError ? 'error' : ''}
                    help={PriceError || ''}
                >
                    {getFieldDecorator('price', {
                        rules: [{
                            required: true,
                            message: 'Please input price!',
                            pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('price')}
                            placeholder="price" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={LifeTimeError ? 'error' : ''}
                    help={LifeTimeError || ''}
                >
                    {getFieldDecorator('life_time', {
                        rules: [{
                            required: true,
                            message: 'Please input life_time!',
                            pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('life_time')}
                            placeholder="life_time" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={DePctError ? 'error' : ''}
                    help={DePctError || ''}
                >
                    {getFieldDecorator('depreciate_pct', {
                        rules: [{
                            required: true,
                            message: 'Please input depreciate_pct!',
                            pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('depreciate_pct')}
                            placeholder="depreciate_pct" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={DeBError ? 'error' : ''}
                    help={DeBError || ''}
                >
                    {getFieldDecorator('depreciate_b', {
                        rules: [{
                            required: true,
                            message: 'Please input depreciate_b!',
                            pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('depreciate_b')}
                            placeholder="depreciate_b" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={DeColError ? 'error' : ''}
                    help={DeColError || ''}
                >
                    {getFieldDecorator('depreciate_col', {
                        rules: [{
                            required: true,
                            message: 'Please input depreciate_col!',
                            pattern: '^(?=.)([+-]?([0-9]*)(\.([0-9]+))?)$'
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('depreciate_col')}
                            placeholder="depreciate_col" />
                    )}
                </FormItem>
                <FormItem
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
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('sum')}
                            placeholder="sum" />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={EtcError ? 'error' : ''}
                    help={EtcError || ''}
                >
                    {getFieldDecorator('etc', {
                        rules: [{
                            required: false,
                            message: 'Please input etc!',
                            pattern: ''
                        }],
                    })(
                        <Input
                            style={{ width: '25em' }}
                            onChange={this.handleInputChange('etc')}
                            placeholder="etc" />
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
                        Submit
              </Button>
                </FormItem>
            </Form>
        );
    }

}


export default Form.create()(EditableTable);