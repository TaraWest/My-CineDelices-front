import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Pour des assertions lisibles
import ProfilePage from './ProfilePage'; // Ton composant Profil

describe('Profile Page', () => {
    // Teste si le formulaire s'affiche correctement
    it('should render the email form', () => {
        render(<ProfilePage />);

        const emailInput = screen.getByLabelText(/nouvel email/i);
        const submitButton = screen.getByRole('button', {
            name: /sauvegarder/i,
        });

        // Vérifie que les éléments du formulaire sont bien affichés
        expect(emailInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    // Teste la validation de l'email
    it('should not submit if email is invalid', () => {
        const mockUpdateEmail = jest.fn(); // Mock de la fonction de mise à jour
        render(<ProfilePage updateEmail={mockUpdateEmail} />);

        const emailInput = screen.getByLabelText(/nouvel email/i);
        const submitButton = screen.getByRole('button', {
            name: /sauvegarder/i,
        });

        // Saisir un email invalide
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        // Vérifie que la fonction n'est pas appelée
        expect(mockUpdateEmail).not.toHaveBeenCalled();
    });

    // Teste si un email valide déclenche l'action
    it('should call updateEmail when valid email is submitted', () => {
        const mockUpdateEmail = jest.fn(); // Mock de la fonction de mise à jour
        render(<ProfilePage updateEmail={mockUpdateEmail} />);

        const emailInput = screen.getByLabelText(/nouvel email/i);
        const submitButton = screen.getByRole('button', {
            name: /sauvegarder/i,
        });

        // Saisir un email valide
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);

        // Vérifie que la fonction est appelée avec les bons arguments
        expect(mockUpdateEmail).toHaveBeenCalledWith('test@example.com');
    });
});
