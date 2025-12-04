import { DatePicker, ConfigProvider, theme, type DatePickerProps  } from 'antd';


type DatePickerElementProps = {
    onChange : DatePickerProps["onChange"],
    size?: 'large' | 'middle' | 'small';
}

function DatePickerElement({onChange , size} : DatePickerElementProps) {
  return (
     <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <DatePicker
        onChange={onChange}
        style={{ width: '100%' }}
        size={size}
        placeholder="Select expiry date"
        picker='month'
      />
    </ConfigProvider>
  )
}

export default DatePickerElement