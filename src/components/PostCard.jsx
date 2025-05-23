import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'


const PostCard = ({
    $id,
    title,
    featuredImage
}) => {
  return (
    //clickable card
    //jaha par ho wah say agay jana
    //in appwrite variable $id like _id in mongodb
    
    <Link to={`/post;${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} 
                className='rounded-xl' alt={title} />

            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard