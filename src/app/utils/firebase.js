"use server"

import {db} from '@/config/firebase'
import {addDoc, collection} from 'firebase/firestore'

const addPost = async (formData)=>{
    const collectionRef = collection(db, 'posts')
    const userId = 'bayuDarmawan'
    // const userId = cookies().get('userId).value
    doc(db, 'users', userId)

    await addDoc(collectionRef, {
        title:formData.get('title'),
        content: formData.get('content'),
        tags:formData.get('tags').split(',').map(tag=>tag.trim()),
    })
}

 export { addPost}