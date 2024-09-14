import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CommentCard from './CommentCard';
import axios from 'axios';
import { useAuthContext } from '../../../../Context/Authentification/useAuthContext';
import { ICommentCard } from './Model/type';
import { fetchComments } from './services/APIcall';

interface CommentComponentProps {
    recipeId: number;
}

function CommentComponent({ recipeId }: CommentComponentProps) {
    const [commentContent, setCommentContent] = useState<string>('');
    const { userAuth, isAuth } = useAuthContext();

    function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('form soumis');
        console.log(commentContent);
        const dataToSend = {
            content: commentContent,
            user_id: userAuth?.id,
            recipe_id: recipeId,
        };
        console.log(dataToSend);
        if (dataToSend) {
            axios
                .post('http://localhost:3000/comment', dataToSend, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                })
                .then((response) => {
                    console.log(response);
                    setCommentContent('');
                    fetchComments(recipeId).then((data) => {
                        setCommentData(data);
                    });
                });
        }
    }
    console.log(userAuth);
    console.log(isAuth);

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setCommentContent(event.target.value);
    }
    const [commentData, setCommentData] = useState<ICommentCard[] | null>(null);
    useEffect(() => {
        fetchComments(recipeId).then((data) => {
            setCommentData(data);
        });
    }, [recipeId]);
    console.log(commentData);
    if (!commentData) return <div>Les commentaires chargent :D</div>;
    return (
        <section>
            <h2>Commentaires</h2>
            {/* card container */}
            <div>
                {/* map les commentaires et passer les données en props vers les cards */}
                {commentData &&
                    commentData.map((comment) => {
                        return (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                            ></CommentCard>
                        );
                    })}
            </div>
            <div>
                <form onSubmit={handleSubmitForm}>
                    <label>
                        <textarea
                            name="content"
                            value={commentContent}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                    {isAuth && userAuth && (
                        <div>
                            <button>Ajouter</button>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}

export default CommentComponent;
