import { useState } from 'react'
import axios from 'axios'
import InputBar from './components/InputBar'

// ANTD
import { Skeleton } from 'antd'
import { CommentOutlined } from '@ant-design/icons'

import './App.css'

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (query) => {
    try {
      setLoading(true)
      setResponse('')
      const response = await axios.post('http://localhost:3000/chat', {
        message: query,
      })
      setResponse(response.data.reply)
    } catch (error) {
      console.error(error.response)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='hero-content'>
        <div className="chat-icon-wrapper">
          <CommentOutlined className="chat-icon" />
        </div>
        <h1>Hi there!<br />What would you like to know?</h1>
      </div>
      {loading && (<Skeleton paragraph={{ rows: 2 }} active />)}
      {response ?
        <div className='response'>
          <p>{response}</p>
        </div>
        : <br />
      }
      <InputBar onClick={sendMessage} />
    </>
  )
}

export default App
