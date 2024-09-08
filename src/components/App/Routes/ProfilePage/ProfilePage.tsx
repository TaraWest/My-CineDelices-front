import { useEffect, useState } from 'react';
import './ProfilPage.css';
import { fetchUser } from './services';
import { IUser } from './models';

function ProfilePage() {
    // State de données de notre utilisateur
    const [userData, setUserData] = useState<IUser | null>(null);

    // On déclanche la fonction au chargelent de la page
    useEffect(() => {
        fetchUser()
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                return error;
            });
    });
    console.log(userData);

    return <div></div>;
}

export default ProfilePage;
