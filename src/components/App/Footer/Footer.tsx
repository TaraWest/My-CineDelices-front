import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                style={{
                    width: '100%',
                    height: 'auto',
                    fillOpacity: 1,
                }}
            >
                <path
                    fill="#59041B"
                    fill-opacity="1"
                    stroke="white" // Ajoute une bordure blanche
                    strokeWidth="2" // Épaisseur de la bordure
                    d="M0,224L40,240C80,256,160,288,240,282.7C320,277,400,235,480,202.7C560,171,640,149,720,144C800,139,880,149,960,160C1040,171,1120,181,1200,176C1280,171,1360,149,1400,138.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                ></path>
            </svg>
            <div className="grid gap-4 grid-cols-3 center">
                <Link to="/mentions-legales">Mentions légales</Link>
                <Link to="/copyrigth">Copyright</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </div>
    );
}

export default Footer;
