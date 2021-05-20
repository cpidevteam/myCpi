import React, { Component } from 'react';
import Select from 'react-select';

const options = [
  { label: 'English', value: 'en' },
  { label: 'Deutsch', value: 'de' },
  { label: 'عربى', value: 'ar' },
  { label: '中文', value: 'zh' },
  { label: 'русский', value: 'ru' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' },
];

const languageStyles = {
  container: styles => ({
    ...styles,
    minWidth: '200px',
    lineHeight: '16px',
  }),
  option: (styles, { data }) => ({
    ...styles,
    color: 'black',
    direction: data.value === 'ar' ? 'rtl' : 'auto',
  }),
};

class LanguageSwitcher extends Component {
  onChange = option => {
    window.location = `https://${option.value}.cpiindex.io/`;
  };

  render() {
    return (
      <Select
        options={options}
        defaultValue={options[0]}
        styles={languageStyles}
        isSearchable={false}
        onChange={this.onChange}
        menuPlacement="auto"
      />
    );
  }
}

export default LanguageSwitcher;
