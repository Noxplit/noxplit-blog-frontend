import React, { useEffect } from 'react'
import { Post } from '../components/Post'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFullPost } from '../components/redux/slices/post'
import ReactMarkdown from 'react-markdown'
import { REACT_APP_BACKEND_URL } from '../utils/constanst'

export const FullPost = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchFullPost(id))
	}, [])
	const { fullPost } = useSelector(state => state.post)
	const post = fullPost.items
	const isLoadingFullPost = fullPost.status === 'loading'

	if (isLoadingFullPost) {
		return <Post isLoading={true} />
	}

	return (
		<>
			<Post
				id={1}
				title={post.title}
				imageUrl={post.imageUrl ? `${REACT_APP_BACKEND_URL}${post.imageUrl}` : ''}
				user={post.user}
				createdAt={post.createdAt}
				viewsCount={post.viewsCount}
				commentsCount={3}
				tags={post.tags}
				isFullPost>
				<ReactMarkdown children={post.text} />
			</Post>
		</>
	)
}
