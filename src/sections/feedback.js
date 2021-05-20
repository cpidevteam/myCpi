import React, { Component } from 'react';
import styled from 'styled-components';
import Container from '../components/container';
import { SquareButton } from '../components/button';

import RocketIcon from '../icons/newsletter-send.svg';

import { breakpoints, colors } from '../constants';

const Root = styled.div`
  position: relative;
  z-index: 10;
  border-radius: 24px;
  background-color: ${colors.white};
  box-shadow: 0px 18px 65px 0px rgba(0, 0, 0, 0.35);
  height: 185px;
  padding: 25px 20px;

  color: ${colors.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;

  header {
    h3 {
      font-size: 20px;

      margin: 0 0 15px;

      text-transform: uppercase;
      color: ${colors.primary};
    }

    p {
      font-size: 13px;
      line-height: 18px;
      margin: 0;
      color: ${colors.lightGray};
    }
  }

  form {
    position: relative;
    display: flex;
    flex: 1;
    margin-bottom: 0;
    margin-top: 15px;

    input {
      width: 100%;
      height: 50px;
      margin-right: 15px;
      padding: 0 10px;

      width: 100%;

      outline: none;

      color: ${colors.primary};
      background: none;
      border: 2px solid ${colors.primary};
      border-radius: 12px;

      transition: border-color 0.2s;

      &::-ms-input-placeholder {
        color: ${colors.lightGray};
      }

      &::-webkit-input-placeholder {
        color: ${colors.lightGray};
      }

      &::-moz-placeholder {
        color: ${colors.lightGray};
      }

      &:focus {
        border-color: ${colors.darkPrimary};
      }
    }
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    padding: 40px;

    text-align: left;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    header h3 {
      font-size: 28px;
    }

    header p {
      font-size: 15px;
    }

    form {
      margin-left: 30px;
      margin-top: 0;

      input {
        height: 65px;
      }
    }
  }
  @media screen and (max-width: ${breakpoints.desktop}px) {
    height: auto;
    header {
      width: 100%;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    header h3 {
      font-size: 32px;
    }

    form {
      margin-left: 100px;

      input {
        padding: 0 15px 0 63px;
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

const EmailIcon = styled(require('../icons/newsletter-email.svg'))`
  position: absolute;
  left: 20px;
  top: 17px;

  display: none;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: block;
  }
`;

const StyledInput = styled.input`
  @media screen and (max-width: 365px) {
    margin-right: 0 !important;
  }
`;

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      success: false,
    };
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

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    const { url, userid, listid, inputemail } = this.props;
    return (
      <Container>
        <Root>
          <header>
            <h3>Receive Latest News!</h3>
            <p>Subscribe to our newsletter to receive news about our ICO.</p>
          </header>
          <form
            action={url}
            method="POST"
            id="email-form"
            style={{ width: '100%' }}
            onSubmit={this.handleSubmit.bind(this)}
          >
            <label htmlFor="email">
              <EmailIcon width={29} height={29} />
            </label>
            <StyledInput
              id="email"
              type="email"
              name={inputemail}
              placeholder="Enter Your Email"
              value={this.state.email}
              onChange={this.handleChange.bind(this)}
            />
            <input type="hidden" name="u" value={userid} />
            <input type="hidden" name="id" value={listid} />
            <SquareButton secondary type="submit" className="cta-newsletter">
              <RocketIcon width={40} height={40} />
            </SquareButton>
          </form>
          {this.state.success && (
            <Success>
              <p>{this.state.msg}</p>
            </Success>
          )}
        </Root>
      </Container>
    );
  }
}

Feedback.propTypes = {};

export default Feedback;
