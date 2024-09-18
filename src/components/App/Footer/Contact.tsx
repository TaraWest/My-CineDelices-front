// ContactForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Définir les types pour les champs du formulaire
interface FormValues {
    name: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    // Fonction appelée lors de la soumission du formulaire
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        // Ici, tu pourrais faire une requête HTTP pour envoyer les données du formulaire
    };

    return (
        <section className="py-8">
            <h1 className="text-3xl font-semibold text-center mb-4">
                Contactez-nous
            </h1>
            <p className="text-center mb-4">
                Nous sommes là pour vous aider. Veuillez remplir le formulaire
                ci-dessous.
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-6"
            >
                <div className="flex flex-col items-start w-full max-w-md">
                    <label htmlFor="name" className="text-lg font-medium mb-1">
                        Nom
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Votre nom"
                        {...register('name', { required: 'Nom requis' })}
                        className="bg-gray-100 border border-gray-300 rounded-xl py-2 px-4 w-full"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col items-start w-full max-w-md">
                    <label htmlFor="email" className="text-lg font-medium mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Votre email"
                        {...register('email', {
                            required: 'Email requis',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Email invalide',
                            },
                        })}
                        className="bg-gray-100 border border-gray-300 rounded-xl py-2 px-4 w-full"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col items-start w-full max-w-md">
                    <label
                        htmlFor="message"
                        className="text-lg font-medium mb-1"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        placeholder="Votre message"
                        {...register('message', { required: 'Message requis' })}
                        className="bg-gray-100 border border-gray-300 rounded-xl py-2 px-4 w-full h-32"
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm">
                            {errors.message.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-xl py-2 px-6 mt-4 hover:bg-blue-600"
                >
                    Envoyer
                </button>
            </form>
        </section>
    );
};

export default ContactForm;
