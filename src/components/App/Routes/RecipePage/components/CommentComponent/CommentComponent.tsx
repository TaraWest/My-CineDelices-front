import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CommentCard from '../CommentPart/CommentCard';
import { useAuthContext } from '../../../../Context/Authentification/useAuthContext';
import { ICommentCard } from './Model/type';
import { fetchComments, postNewComment } from './services/APIcall';
import StarRatings from 'react-star-ratings';

interface CommentComponentProps {
    recipeId: number;
}

function CommentComponent({ recipeId }: CommentComponentProps) {
    const [commentContent, setCommentContent] = useState<string>('');
    const { userAuth, isAuth } = useAuthContext();
    const [commentData, setCommentData] = useState<ICommentCard[] | null>(null);
    const [commentNote, setCommentNote] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [starsClicked, setStarsClicked] = useState<boolean>(false);
    // const [liked, setLiked] = useState<boolean>(false)

    function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!userAuth || !userAuth.id) {
            return;
        }

        if (commentNote === 0 || commentContent === '') {
            setError('Attribuez une note et écrivez votre commentaire');
            return;
        } else {
            setError(null);
        }

        const dataToSend = {
            content: commentContent,
            note: commentNote,
            user_id: userAuth.id,
            recipe_id: recipeId,
        };
        // console.log(dataToSend);
        if (dataToSend) {
            postNewComment(dataToSend).then((response) => {
                console.log(response);

                setCommentContent('');
                fetchComments(recipeId).then((data) => {
                    setCommentData(data);
                });
            });
        }
    }

    function handleTextChange(event: ChangeEvent<HTMLTextAreaElement | null>) {
        setCommentContent(event.target.value);
    }
    function handleRatingChange(note: number) {
        setCommentNote(note);
    }
    function handleClickOnStars() {
        console.log('click');
        if (isAuth) {
            return;
        }
        setStarsClicked(true);

        setTimeout(() => {
            setStarsClicked(false);
        }, 3000);
    }
    console.log(starsClicked);

    useEffect(() => {
        fetchComments(recipeId).then((data) => {
            setCommentData(data);
        });
    }, [recipeId]);
    if (!commentData) return <div>Les commentaires chargent :D</div>;
    return (
        <section className="w-full">
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
            <div className="relative">
                <h3 className="mt-2em">Envie de laisser un commentaire?</h3>
                <form onSubmit={handleSubmitForm}>
                    <div
                        className="flex flex-col items-center justify-center gap-2 "
                        onClick={handleClickOnStars}
                    >
                        <StarRatings
                            name="note"
                            rating={commentNote}
                            starRatedColor="golf"
                            numberOfStars={5}
                            starDimension="40px"
                            starSpacing="2px"
                            starHoverColor="gold"
                            changeRating={
                                isAuth && userAuth
                                    ? handleRatingChange
                                    : undefined
                            }
                        />
                        {!isAuth && starsClicked && (
                            <div className="error-message-stars">
                                Veuillez vous connecter pour donner votre avis!
                            </div>
                        )}

                        <label className="text-label">
                            <textarea
                                className="w-full h-40 rounded-2xl bg-skin text-dark p-2em"
                                placeholder={
                                    isAuth && userAuth
                                        ? 'Entrez votre commentaire'
                                        : 'Veuillez vous connecter pour laisser une note et un commentaire à cette recette!'
                                }
                                name="content"
                                value={commentContent}
                                onChange={handleTextChange}
                                disabled={isAuth && userAuth ? false : true}
                            ></textarea>
                        </label>
                    </div>
                    {isAuth && userAuth && (
                        <div>
                            <button>Ajouter</button>
                        </div>
                    )}
                    {error && <p>{error}</p>}
                </form>
            </div>
        </section>
    );
}

export default CommentComponent;
