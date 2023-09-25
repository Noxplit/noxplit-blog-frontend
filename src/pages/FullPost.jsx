import React, { useEffect } from "react";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFullPost } from "../components/redux/slices/post";
import ReactMarkdown from 'react-markdown'

export const FullPost = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
useEffect(() => {
  dispatch(fetchFullPost(id))
},[])
const {fullPost} = useSelector(state=>state.post)
const post = fullPost.items
const isLoadingFullPost = fullPost.status === 'loading'

if(isLoadingFullPost) {
  return <Post isLoading={true}/>
}

  return (
    <>
      <Post
        id={1}
        title={post.title}
        imageUrl={post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ''}
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={3}
        tags={post.tags}
        isFullPost
      >
       <ReactMarkdown children={post.text}/>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={isLoadingFullPost}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
