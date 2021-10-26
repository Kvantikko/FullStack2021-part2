import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({name, content}) => {
    return (         
        <div>                          
            <Header name = {name}/>
            <Content parts = {content}/>
        </div>
    )
}

export default Course