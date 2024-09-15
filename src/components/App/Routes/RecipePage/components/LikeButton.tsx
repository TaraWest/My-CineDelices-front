import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLikesContext } from '../../../Context/Likes/useLikesContext';

// interface likeButtonProps {
//     handleLikeRecipeButton: () => void;
//     userLikedIt: boolean;
//     likesNumber: number;
// }

function LikeButton() {
    const { handleLikeRecipeButton, userLikedIt, likesNumber } =
        useLikesContext();

    return (
        <div className="flex items-center gap-1 my-1em">
            Vous aimez cette recette?
            {
                <button
                    onClick={handleLikeRecipeButton}
                    className="like-button font-body text-base mx-0.5em"
                >
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        style={{
                            color: '#bb7133',
                            marginRight: '0.5em',
                        }}
                    />
                    {!userLikedIt ? "J'aime" : "Je n'aime plus"}
                </button>
            }
            <p className="text-ld">{likesNumber}</p>
        </div>
    );
}

export default LikeButton;
