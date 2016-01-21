import React, { Component, PropTypes } from 'react';

import Modal from 'antd/lib/modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';
import Icon from 'antd/lib/icon';

import { Form, Item as FormItem } from 'antd/lib/form';

import createForm from 'rc-form/lib/createForm';

class loginForm extends Component {

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    this.props.form.validateFields((error, values) => {
      if (!error) {
        onSubmit(values)
      }
    });
  }

  render() {
    const { form, auth } = this.props;
    const { getFieldProps, getFieldError } = form;
    return (
      <Form horizontal>
        {auth.error &&
          <Alert message="Github 账号或密码错误" type="error" showIcon />
        }
        <FormItem
          label=""
          labelCol={{span: 0}}
          wrapperCol={{span: 24}}
          validateStatus={ getFieldError('email') ? 'error' : '' }
          required
          >
          <Input className="ant-input" type="text" size="large" name="email" autoComplete="off" placeholder="账号"
            {...getFieldProps('email', {
              rules: [{
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "请输入账号",
              }] })}
          />
          <Col span="19">
            <p className="ant-form-explain">{ getFieldError('email') ? getFieldError('email') + '' : '' }</p>
          </Col>
        </FormItem>
        <FormItem
          label=""
          labelCol={{span: 0}}
          wrapperCol={{span: 24}}
          validateStatus={ getFieldError('pass') ? 'error' : '' }
          required
          >
          <Input className="ant-input" size="large" type="password" name="pass" placeholder="密码"
            {...getFieldProps('pass', { rules: [{
              required: true,
              message: "请输入密码",
            }] })}
          />
          <Col span="24">
            <p className="ant-form-explain">{ getFieldError('pass') ? getFieldError('pass') + '' : '' }</p>
          </Col>
        </FormItem>
        <Row>
          <Col span="24">
            <Button type="primary" size="large" htmlType="submit" onClick={this.onSubmit.bind(this)}>
              登 录 <Icon type="github" />
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default createForm()(loginForm);