import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Layout from '../../components/Layout'
/**
* @author
* @function Home 
**/

const Home = (props) => {
  return(
    <Layout>
      <Jumbotron style = {{margin : '4rem' , background : '#fff' }} className = "text-center">  {/*text-center is a bootstrap class*/}   
        <h1> Welcome to Admin Dashboard </h1>
        <p1>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p1>
      </Jumbotron>
    </Layout>
  )
}

export default Home