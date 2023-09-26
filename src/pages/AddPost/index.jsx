import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'

import 'easymde/dist/easymde.min.css'
import styles from './AddPost.module.scss'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, Link, useParams } from 'react-router-dom'
import axios from '../../axios.js'

export const AddPost = () => {
  const {id} = useParams()
  const isEditing =Boolean(id)
	const navigate = useNavigate()
	const { data } = useSelector(state => state.auth)
	const inputRef = useRef()
	const [imageUrl, setImageUrl] = useState(null)
	const [title, setTitle] = useState()
	const [tags, setTags] = useState()
	const [text, setText] = useState()
	const [loading, setLoading] = useState(false)
	const post = { title, tags, text, imageUrl }

console.log(isEditing);

	const handleChangeFile = async event => {
		try {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('image', file)
			const { data: imageData } = await axios.post('/upload', formData)
			setImageUrl(imageData.url)
		} catch (error) {
			console.warn(error)
			alert('Ошибка при загрузке файла')
		}
	}

	const onClickRemoveImage = () => {
		setImageUrl('')
	}

	const onSubmit = React.useCallback(e => {
		setText(e)
	}, [])

	const handleCreatePost = async () => {
      try {
        setLoading(true)
        const { data } = isEditing ? await axios.patch(`/posts/${id}`, post) : await axios.post(`/posts`, post)
        setLoading(false)
        const navId = isEditing ? id : data._id
        navigate(`/posts/${navId}`)
      } catch (error) {
        console.log(error)
      }
    
	
	}

  useEffect(() => {
    if(id) {
      try {
   axios.get(`/posts/${id}`).then(({data}) => {
          setTitle(data.title)
          setText(data.text)
          setTags(data.tags.join(','))
          setImageUrl(data.imageUrl)
        })
        
      } catch (error) {
        alert('Произошла ошибка');
      }

    }
  },[])

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: '400px',
			autofocus: true,
			placeholder: 'Введите текст...',
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[],
	)

	if (!data) {
		return <Navigate to='/' />
	}

	return (
		<Paper style={{ padding: 30 }}>
			{loading ? (
				<div>Loading...</div>
			) : (
				<>
					<Button onClick={() => inputRef.current.click()} variant='outlined' size='large'>
						Загрузить превью
					</Button>
					<input type='file' onChange={handleChangeFile} ref={inputRef} hidden />
					{imageUrl && (
						<>
							<Button variant='contained' color='error' onClick={onClickRemoveImage}>
								Удалить
							</Button>
							<img
								className={styles.image}
								src={`${process.env.REACT_API_BACKEND_URL}/${imageUrl}`}
								alt='Uploaded'
							/>
						</>
					)}
					<br />
					<br />
					<TextField
						value={title}
						onChange={e => setTitle(e.target.value)}
						classes={{ root: styles.title }}
						variant='standard'
						placeholder='Заголовок статьи...'
						fullWidth
					/>
					<TextField
						value={tags}
						onChange={e => setTags(e.target.value)}
						classes={{ root: styles.tags }}
						variant='standard'
						placeholder='Тэги'
						fullWidth
					/>
					<SimpleMDE className={styles.editor} value={text} onChange={onSubmit} options={options} />
					<div className={styles.buttons}>
						<Button onClick={handleCreatePost} size='large' variant='contained'>
							{isEditing ? 'Сохранить' : 'Опубликовать'}
						</Button>
						<Link to='/'>
							<Button size='large'>Отмена</Button>
						</Link>
					</div>
				</>
			)}
		</Paper>
	)
}
