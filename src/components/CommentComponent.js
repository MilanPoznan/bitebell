import React, { useState } from 'react'
import './CommentComponent.scss'
export default function CommentComponent({ isSrlanguage, setIsCommentPosted, id }) {

  const [nameValue, setNameValue] = useState('')
  const [commentVal, setCommentVal] = useState('')

  const onSubmitComment = (e) => {
    e.preventDefault();

    fetch('https://dev.bitebell.com/wp-json/bitebell/v1/comments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name: nameValue,
        comment: commentVal
      }),
    })
      .then((response) => {
        console.log(response)
        if (response.ok === true) {
          setIsCommentPosted(true)
        } else {
          throw new Error(`${response.statusText}`)
        }
        return response.json();
      })
      .then(response => { console.log(response) })
      .catch(error => console.error('Error:', error));

  }

  return (
    <div className="container comments">
      <input
        type='text'
        placeholder={isSrlanguage ? 'Ime' : 'Name'}
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        name="commentName" />
      <textarea
        placeholder="Text"
        style={{ maxHeight: '400px' }}
        value={commentVal}
        onChange={(e) => setCommentVal(e.target.value)}
      />
      <button
        onClick={(e) => onSubmitComment(e)}
        className={!!nameValue && !!commentVal ? 'active' : 'inactive'}
      >

        {isSrlanguage ? 'Posalji Komentar' : 'Send Comment'}
      </button>
    </div>
  )
}
