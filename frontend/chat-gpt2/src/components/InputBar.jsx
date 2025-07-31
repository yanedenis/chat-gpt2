import { useState, useRef } from 'react'
import { RightOutlined, AudioFilled, XFilled } from '@ant-design/icons'
import { Button, Flex, Input, message } from 'antd'

import '../styles/InputBar.css'

export default function InputBar({ onClick }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

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



  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition не поддерживается этим браузером');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      console.log('🎙️ Началось прослушивание...');
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setQuery(result);
      console.log('📝 Результат:', result);
    };

    recognition.onerror = (event) => {
      console.error('❌ Ошибка:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('🛑 Прослушивание завершено');
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return (
    <>
      {contextHolder}
      <Flex className='input-bar' align='center'>
        <Button
          type='text'
          style={{ width: 50, height: 50, marginInline: 6 }}
          icon={!isListening ? <AudioFilled style={{ fontSize: 20 }} /> : <XFilled style={{ fontSize: 20 }} />}
          onClick={!isListening ? startListening : stopListening} />
        <Input
          placeholder='Ask whatever you want'
          variant='borderless'
          value={query}
          onChange={e => setQuery(e.target.value)}
          onPressEnter={handleButtonClick}
        />
        <Button
          style={{ width: 55, height: 50, backgroundColor: "#165DFF", borderColor: "#1c4c9c" }}
          icon={<RightOutlined style={{ fontSize: 20 }} />}
          loading={loading}
          onClick={handleButtonClick} />
      </Flex>
    </>
  )
}
