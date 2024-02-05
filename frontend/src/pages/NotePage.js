import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg"

const NotePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState(null)

  useEffect(() => {
    getNote()
  }, [id])

  const getNote = async () => {
    if (id == 'new') return

    const response = await fetch(`/api/notes/${id}/`)
    const data = await response.json()
    setNote(data)
  }

  const createNote = async () => {
    fetch(`/api/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  const updateNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  const deleteNote = async () => {
    fetch(`/api/notes/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return navigate("/")
  }

  const handleSubmit = () => {
    if (id !== 'new' && note.body.length == 0) {
      deleteNote()
    } else if (id !== 'new') {
      updateNote()
    } else if (id == 'new' && note.body !== null) {
      createNote()
    }
    return navigate("/")
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (<button onClick={handleSubmit}>Done</button>)}
      </div>
      <textarea onChange={e => { setNote(note => ({ ...note, 'body': e.target.value })) }} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
