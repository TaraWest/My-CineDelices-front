import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { ICommentCard } from '../CommentComponent/Model/type';
import '../CommentComponent/CommentComponent.scss';
import { useAuthContext } from '../../../../Context/Authentification/useAuthContext';

interface ICommentCardProps {
    comment: ICommentCard;
}

function CommentCard({ comment }: ICommentCardProps) {
    // console.log(comment);
    const { userAuth, isAuth } = useAuthContext();
    const [isCommentOwner, setIsCommentOwner] = useState<boolean>(false);

    useEffect(() => {
        if (isAuth && userAuth) {
            const userId = userAuth.id;
            const recipeId = comment.user_id;
            setIsCommentOwner(userId === recipeId);
        }
    }, [isAuth, userAuth, comment.user_id]);

    return (
        <div className="border border-dark border-solid text-skin rounded-2xl mb-1em card-shadow">
            <header className="mb-2em flex justify-center items-center gap-5">
                <h3>Par {comment.commentUser.username} </h3>
                <div>
                    <StarRatings
                        rating={comment.note} // La note à afficher
                        starRatedColor="gold" // Couleur des étoiles pleines
                        numberOfStars={5} // Nombre total d'étoiles
                        starDimension="30px" // Dimension des étoiles
                        starSpacing="2px" // Espacement entre les étoiles
                    />
                </div>
                {/* <LikeButton></LikeButton> */}
            </header>
            <main className="mb-2em text-xl">
                <div>
                    <p>{comment.content}</p>
                </div>
            </main>
            <footer>
                <div>
                    <p className="mb-1em">
                        Le {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    {isCommentOwner && (
                        <div>
                            <button className="mr-1em">Modifier</button>
                            <button>Supprimer</button>
                        </div>
                    )}
                </div>
            </footer>
        </div>
    );
}

export default CommentCard;
