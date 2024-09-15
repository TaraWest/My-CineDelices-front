import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LikeButton.scss';
import { useMediaQuery } from 'react-responsive';

interface likeButtonProps {
    handleLikeRecipeButton: () => void;
    userLikedIt: boolean;
    likesNumber: number;
}

function LikeButton({
    handleLikeRecipeButton,
    userLikedIt,
    likesNumber,
}: likeButtonProps) {
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    return (
        <div className="flex items-center gap-1 my-1em">
            {userLikedIt
                ? 'Vous aimez cette recette!'
                : 'Vous aimez cette recette?'}
            {
                <button
                    onClick={handleLikeRecipeButton}
                    className={`font-body mx-0.5em text-center ${isDesktop ? 'text-base' : 'text-xs'}`}
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
