import React, { useState } from 'react'
import { Button, Input, Typography, } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;
const { Title } = Typography;

function Comment(props) {
    const user = useSelector(state => state.user) //REDUX의 STATE에 있는 USER정보를 가져오기
    
    const [Comment, setComment] = useState("")
    //타이핑가능하도록
    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }
        
        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('댓글을 저장하지 못했습니다.')
                }
            })
    }
  return (
    <div>
        <br />
        <Title level={3} > Share your opinions about {props.movieTitle} </Title>
        <hr />

        {props.CommentLists && props.CommentLists.map((comment, index) => (
            (!comment.responseTo &&
                <React.Fragment>
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                </React.Fragment>
            )
        ))}
        
        {/* Root Comment Form */}
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
            <TextArea
                style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleChange}
                value={Comment}
                placeholder="write some comments"
            />
            <br />
            <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
        </form>
    </div>
  )
}

export default Comment