import React from 'react'
import { Link } from 'react-router-dom'

const getTitle = note => {
    const title = note.body.split('\n')[0]
    if (title.length > 50) {
        return title.slice(0, 50)
    }
    return title
}

const getTime = note => {
    return new Date(note.updated).toLocaleDateString()
}

const getContent = note => {
    const title = getTitle(note)
    let content = note.body.replaceAll('\n', ' ')
    content = content.replaceAll(title, ' ')

    return content.length > 50 ? `${content.slice(0, 50)}...` : content
}

const ListItem = ({ note }) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className='notes-list-item'>
                <h3>{getTitle(note)}</h3>
                <p><span>{getTime(note)}</span></p>
                <p>{getContent(note)}</p>
            </div>
        </Link>
    )
}

export default ListItem
