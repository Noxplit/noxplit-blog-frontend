import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { fetchPosts, fetchTags } from '../components/redux/slices/post.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { REACT_APP_BACKEND_URL } from '../utils/constanst';

export const Home = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const [populate, setPopulate] = useState(false)
  const {posts,tags} = useSelector(state=>state.post)
  const filter = posts.items.filter(post => post.tags.map(tag => console.log(tag === id)))
  const  sortedArr = posts.items.slice().sort();
  const sortedPosts = sortedArr.sort(( (a, b) =>  {
if(a.viewsCount < b.viewsCount) {
  return 1
}
if(a.viewsCount > b.viewsCount) {
  return -1
}
return 0
  }))


  const {data} = useSelector(state=>state.auth)
  const isPostLoading = posts.status === 'loading'
  const isTagLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  },[])
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={populate ? 1 : 0} aria-label="basic tabs example">
        <Tab label="Новые" onClick={() => setPopulate(false)} />
        <Tab label="Популярные" onClick={() => setPopulate(true)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid width={'100%'}  item>
      
       {(isPostLoading ?[...Array(5)] : populate ? sortedPosts : id ? filter : posts.items).map((item,index) => isPostLoading ? (<Post isLoading={true} key={index}/>) : (<Post
              id={item._id}
              title={item.title}
              imageUrl={item.imageUrl ? `${REACT_APP_BACKEND_URL}${item.imageUrl}` : ''}
              user={item.user}
              createdAt={item.createdAt}
              viewsCount={item.viewsCount}
              commentsCount={3}
              tags={item.tags}
              isEditable={data?._id === item.user._id}
            />  ) 
        ) }
         
        </Grid>
        <Grid width={'100%'}  item>
          <TagsBlock items={tags.items} isLoading={isTagLoading} />
          
        </Grid>
      </Grid>
    </>
  );
};
