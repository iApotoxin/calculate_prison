import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state={
            usr:'',
            pass:'',
        };
    }

    checkId_getSum(username,password){
        this.setState({ loading: true }); //enable loading
        fetch(`https://cal-prison-api.herokuapp.com/get_sum.php?usr="${username}"`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
        ).then((response) => response.json())
        .then(response=>{
          // console.log("get detail response: ", response);
          if (response.error === false) {
            //set data to state
          
          }
          else {
            //notify faail
 
          }
    
        }).catch(error=>{
          //notify fail

        });
      }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ width: 300, margin: 'auto', paddingTop: 100 }}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                            Log in
                      </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default Form.create()(LoginPage);