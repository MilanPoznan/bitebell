import React, { useState, useEffect } from 'react'

export default function PostComments({ dbID }) {

  const [allComments, setAllComments] = useState()
  const [filteredComments, setFilteredComments] = useState()

  const getDataOnLoad = () => fetch('https://dev.bitebell.com/wp-json/bitebell/v1/getcomments')
    .then(response => {
      if (!response.ok === true) {
        throw new Error(`${response.statusText}`)
      }
      return response.json();
    })
    .then(jsonRes => {
      setAllComments(jsonRes.filter(comment => parseInt(comment.comment_post_ID) == dbID))
      // setAllComments(jsonRes)
    })
    .catch(error => console.error('Error', error))


  useEffect(() => {
    if (allComments === undefined) {
      getDataOnLoad()
    }

  }, [allComments])

  return (
    <div className="container all-comments">
      {allComments !== undefined && allComments.map((comment, index) => (<div key={index}>
        <h3>{comment.comment_author}</h3>
        <p>{comment.comment_content}</p>
      </div>))}

    </div>
  )
}
