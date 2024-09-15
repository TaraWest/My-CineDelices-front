import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LikeButton.scss';
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from '../../../Context/Authentification/useAuthContext';
import { useState } from 'react';
import { Logger } from 'sass';

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
    const { isAuth } = useAuthContext();
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const handleClick = () => {
        handleLikeRecipeButton();
        clickOnButton();
    };
    function clickOnButton() {
        if (isAuth) {
            return;
        }
        setButtonClicked(true);
        setTimeout(() => {
            setButtonClicked(false);
        }, 3000);
    }

    return (
        <div className="relative w-full flex justify-center items-centrer">
            <div className="flex items-center gap-1 my-1em">
                {userLikedIt
                    ? 'Vous aimez cette recette!'
                    : 'Vous aimez cette recette?'}
                {
                    <button
                        onClick={handleClick}
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
            {!isAuth && buttonClicked && (
                <div className="error-message">
                    Veuillez vous connecter pour donner votre avis!
                </div>
            )}
        </div>
    );
}

export default LikeButton;
