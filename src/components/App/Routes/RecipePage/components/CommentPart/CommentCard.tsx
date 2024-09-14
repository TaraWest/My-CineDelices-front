import { ICommentCard } from './Model/type';
import './CommentComponent.scss';

interface ICommentCardProps {
    comment: ICommentCard;
}

function CommentCard({ comment }: ICommentCardProps) {
    console.log(comment);

    return (
        <div className="border border-dark border-solid bg-skin text-dark rounded-2xl mb-1em card-shadow">
            <header>
                <h3>Par {comment.commentUser.username} </h3>
            </header>
            <main>
                <div>
                    <p>{comment.content}</p>
                </div>
            </main>
            <footer>
                <div>
                    <p>Le {new Date(comment.createdAt).toLocaleString()}</p>
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </div>
            </footer>
        </div>
    );
}

export default CommentCard;
