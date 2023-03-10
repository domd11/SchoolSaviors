import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

const TopicForm = ({ topic, setTopics, topics }) => {
    const deleteTopic = () => {
        setTopics([
            ...topics.splice(0, topic)
          ]);

          console.log(topics)
    }
  return (
    <div>
        <span>{topic}</span>
        <AiFillDelete onClick={deleteTopic}/>
    </div>
  )
}

export default TopicForm