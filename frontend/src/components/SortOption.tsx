import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';

type SortOptionProp = {
  onStateUpdate : (sortParem : String , orderParem : String) => void
}


const itemClass = "!text-white hover:!bg-zinc-700";

const items: MenuProps['items'] = [
  {
    label: 'Sort-Asc(a-z)',
    key: '1',
    className : itemClass
  },
  {
    label: 'Sort-Dec(z-a)',
    key: '2',
    className : itemClass
  },
  { type: 'divider', className: 'border-zinc-50' },

  {
    label: 'Date Updated(Newest)',
    key: '3',
    className : itemClass
  },
  {
    label: 'Date Updated(Oldest)',
    key: '4',
    className : itemClass
  },
];

function SortOption ({onStateUpdate} : SortOptionProp) {

  const handleMenuCheck : MenuProps['onClick'] = ({key}) => {
    switch(key)
    {
      case '1' : 
      onStateUpdate("name" , "asc");
      break;

      case '2' :
        onStateUpdate("name", "desc");
        break;

      case '3' :
        onStateUpdate("date" , "asc");
        break;

      case '4' :
        onStateUpdate("date", "desc");
        break;

        default :
        break;
    }
  }
  
  return (<Dropdown menu={{ items, onClick : handleMenuCheck, className : "!bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl" }}>
    <a onClick={(e) => e.preventDefault()} className='text-gray-100' >
      <Space>
        <span className="font-semibold">Sort Options</span>
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
)}

export default SortOption;