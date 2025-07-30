import { useState } from 'react'
import { RightOutlined } from '@ant-design/icons'
import { Button, Flex, Input, message } from 'antd'

import '../styles/InputBar.css'

export default function InputBar({ onClick }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Can't send empty input",
    });
  }

  const handleButtonClick = async () => {
    if (!query.trim()) {
      error()
      return;
    }
    try {
      setLoading(true);
      await onClick(query);
      setQuery('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Flex className='input-form' align='center'>
        <Input
          placeholder='Ask whatever you want'
          variant='borderless'
          value={query}
          onChange={e => setQuery(e.target.value)}
          onPressEnter={handleButtonClick}
        />
        <Button
          icon={<RightOutlined />}
          color='#1c4c9c'
          loading={loading}
          onClick={handleButtonClick} />
      </Flex>
    </>
  )
}
