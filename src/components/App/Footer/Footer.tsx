import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
    return (
        <div className="pb-6">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{
                    width: '100%',
                    height: 'auto',
                    fillOpacity: 1,
                }}
            >
                {/* Bordure en haut uniquement */}
                <path
                    fill="none"
                    stroke="#d9c7b8" // Bordure blanche
                    strokeWidth="3" // Épaisseur de la bordure
                    d="M0,224L40,240C80,256,160,288,240,282.7C320,277,400,235,480,202.7C560,171,640,149,720,144C800,139,880,149,960,160C1040,171,1120,181,1200,176C1280,171,1360,149,1400,138.7L1440,128"
                />
                {/* Vague principale */}
                <path
                    fill="#59041B"
                    fillOpacity="1"
                    d="M0,224L40,240C80,256,160,288,240,282.7C320,277,400,235,480,202.7C560,171,640,149,720,144C800,139,880,149,960,160C1040,171,1120,181,1200,176C1280,171,1360,149,1400,138.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                />
            </svg>
            <div className="grid gap-4 grid-cols-3 justify-center items-center text-center">
                <Link className="no-underline" to="/mentions-legales">
                    Mentions légales
                </Link>
                <Link className="no-underline" to="/copyrigth">
                    Copyright
                </Link>
                <Link className="no-underline" to="/contact">
                    Contact
                </Link>
            </div>
        </div>
    );
}

export default Footer;
