import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import { breakpoints, colors } from '../constants';
import Close from '../icons/close.svg';

const Root = styled.div`
  border-radius: 24px;
  background-color: ${colors.white};
  box-shadow: 10px 10px 5px 0px ${colors.lightGray};
  top: 100px;
  padding: 25px 20px;
  color: ${colors.black};
  text-align: center;
  min-height: 200px;

  p {
    margin-top: 50px;
  }

  form {
    position: relative;
    flex: 1;
    margin-bottom: 0;
    margin-top: 15px;

    label {
      float: left;
      margin-top: 25px;
      margin-bottom: 5px;
    }

    input[type='email'],
    input[type='text'] {
      border-color: ${colors.primary};
      color: ${colors.primary};
    }

    input[type='checkbox'] {
      height: auto;
      width: auto;
      margin-bottom: 20px;
    }

    input[type='submit'] {
      background-color: ${colors.primary};
      color: white;
      border: none;
      margin-top: 50px;
      width: auto;
      padding: 20px;
      transition: background-color 0.3s;
      font-weight: 500;
      line-height: 15px;

      :hover {
        background-color: ${colors.darkPrimary};
        transition: background-color 0.3s;
      }

      :disabled {
        background: ${colors.lightPrimary};
      }
    }

    input {
      width: 100%;
      height: 50px;
      margin-right: 15px;
      padding: 0 10px;

      width: 100%;

      outline: none;

      color: ${colors.white};
      background: none;
      border: 2px solid #76746c;
      border-radius: 12px;

      transition: border-color 0.2s;

      &::-ms-input-placeholder {
        color: ${colors.darkGray};
      }

      &::-webkit-input-placeholder {
        color: ${colors.darkGray};
      }

      &::-moz-placeholder {
        color: ${colors.darkGray};
      }

      &:focus {
        border-color: ${colors.primary};
      }
    }
  }
`;

const Success = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  color: ${colors.primary};
`;

class PreRegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      success: false,
      msg: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('email-form');

    if (this.state.email) {
      const data = new FormData(form);

      const options = {
        method: 'post',
        body: data,
        mode: 'no-cors',
        header: {
          'content-type': 'application/x-www-urlencoded',
        },
      };

      fetch(this.props.url, options);
      this.setState({
        email: '',
        success: true,
        msg: this.props.successMsg,
      });
    } else {
      this.setState({ msg: 'You need to enter an email address' });
    }
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   addToMailchimp(this.state.fieldList.email, ...this.state.fieldList).then(
  //     data => {
  //       // I recommend setting data to React state
  //       // but you can do whatever you want
  //       this.setState({ msg: data.msg, fieldList: {} });
  //     }
  //   );
  //   window.scrollTo(0, 0);
  // };

  // handleChange = event => {
  //   const value = event.target.value || event.target.checked;
  //   this.setState({
  //     fieldList: { ...this.state.fieldList, [event.target.name]: value },
  //   });
  // };

  render() {
    return (
      <Root>
        {!this.state.msg && (
          <Fragment>
            <div>
              <h3>Hi!</h3>
              <p style={{ textAlign: 'center' }}>
                Sign up for our pre-registration and be notified when we launch
                our token sale!
              </p>
            </div>
            <form
              action={this.props.url}
              method="POST"
              id="email-form"
              style={{ width: '100%' }}
              onSubmit={this.handleSubmit}
            >
              <label htmlFor="email">Email address</label>
              <br />
              <input
                onChange={this.handleChange}
                id="email"
                type="email"
                name={this.props.inputemail}
                placeholder="Enter Your Email"
                value={this.state.email}
              />
              <br />
              <input type="hidden" name="u" value={this.props.userid} />
              <input type="hidden" name="id" value={this.props.listid} />
              <input
                className="cta-prereg"
                type="submit"
                value="Submit"
                disabled={
                  !this.state.email.match(
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                  )
                }
              />
            </form>
          </Fragment>
        )}
        <ul>

        </ul>
        {this.state.success && (
          <Success>
            <p>{this.state.msg}</p>
          </Success>
        )}
      </Root>
    );
  }
}

export default PreRegisterModal;
