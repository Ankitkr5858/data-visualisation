import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Handle different Firebase errors with specific instructions
  if (error) {
    let errorTitle = "Firebase Setup Required";
    let errorDescription = "Please configure Firebase to enable authentication";
    let instructions = [];

    if (error.includes('auth/api-key-not-valid') || error.includes('auth/invalid-api-key')) {
      errorTitle = "Invalid Firebase API Key";
      errorDescription = "Your Firebase API key is not valid";
      instructions = [
        "Go to Firebase Console → Project Settings",
        "Copy the correct API key from your Firebase config",
        "Update VITE_FIREBASE_API_KEY in your .env file",
        "Restart the development server"
      ];
    } else if (error.includes('auth/operation-not-allowed')) {
      errorTitle = "Authentication Method Not Enabled";
      errorDescription = "Email/Password authentication is not enabled in Firebase";
      instructions = [
        "Go to Firebase Console → Authentication",
        "Click 'Get started' if you haven't set up Authentication",
        "Go to 'Sign-in method' tab",
        "Click on 'Email/Password' provider",
        "Enable 'Email/Password' authentication",
        "Save the changes",
        "Optionally enable 'Google' provider for Google sign-in"
      ];
    } else {
      instructions = [
        "Go to Firebase Console (https://console.firebase.google.com)",
        "Create a new project or select existing one",
        "Enable Authentication → Sign-in method → Email/Password & Google",
        "Go to Project Settings → General → Your apps",
        "Copy your Firebase config values",
        "Update the .env file with your Firebase credentials",
        "Restart the development server"
      ];
    }

    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <div className="bg-card-bg border border-border-gray rounded-lg p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔥</span>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              {errorTitle}
            </h2>
            <p className="text-text-secondary">
              {errorDescription}
            </p>
          </div>
          
          <div className="space-y-4 text-sm">
            <div className="bg-dark-bg rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-2">Setup Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                {instructions.map((instruction, index) => (
                  <li key={index}>
                    {instruction.includes('Firebase Console') ? (
                      <>
                        Go to{' '}
                        <a 
                          href="https://console.firebase.google.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-accent-green hover:underline"
                        >
                          Firebase Console
                        </a>
                        {instruction.replace('Go to Firebase Console', '')}
                      </>
                    ) : (
                      instruction
                    )}
                  </li>
                ))}
              </ol>
            </div>
            
            {error.includes('auth/operation-not-allowed') && (
              <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg p-4">
                <h3 className="font-medium text-yellow-400 mb-2">⚠️ Important:</h3>
                <p className="text-yellow-300 text-sm">
                  The "operation-not-allowed" error specifically means that Email/Password authentication 
                  is not enabled in your Firebase project. You must enable it in the Firebase Console 
                  before you can sign in or create accounts.
                </p>
              </div>
            )}
            
            <div className="bg-dark-bg rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-2">Required Environment Variables:</h3>
              <pre className="text-xs text-text-secondary bg-border-gray p-2 rounded overflow-x-auto">
{`VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id`}
              </pre>
            </div>

            <div className="bg-dark-bg rounded-lg p-4">
              <h3 className="font-medium text-text-primary mb-2">Current Error:</h3>
              <p className="text-red-400 text-sm font-mono bg-border-gray p-2 rounded">
                {error}
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-accent-green hover:bg-accent-lime rounded-lg transition-colors text-dark-bg font-medium"
            >
              Reload After Setup
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;