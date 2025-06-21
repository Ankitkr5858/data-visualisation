# Data Visualization Platform

A modern, responsive data visualization dashboard built with React, TypeScript, and Firebase Authentication.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Setup (Required)

**Step 1: Create Firebase Project**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or select existing project
3. Follow the setup wizard

**Step 2: Enable Authentication**
1. In your Firebase project, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Enable **Google** provider (optional)

**Step 3: Get Firebase Config**
1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Web app** icon (`</>`) to create a web app
4. Register your app with a name
5. Copy the Firebase configuration object

**Step 4: Configure Environment Variables**
1. Create a `.env` file in the project root
2. Add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Start Development Server
```bash
npm run dev
```

## 🔧 Firebase Configuration Details

Your Firebase config object looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

Copy each value to the corresponding environment variable in your `.env` file.

## 🚀 Features

### Core Functionality
- **Interactive Dashboard** - Primary data visualization with charts and KPI cards
- **Variable Editor** - Slide-over panel for adjusting visualization parameters
- **Data Point Details** - Hover interactions with detailed tooltips
- **Variable Management** - Select, activate/deactivate variables with contextual information

### Technical Features
- **Authentication** - Firebase Auth with Google OAuth and email/password
- **Responsive Design** - Desktop-first approach with mobile/tablet adaptations
- **State Management** - Zustand for efficient state handling
- **Error Handling** - Comprehensive error boundaries and loading states
- **Routing** - React Router for navigation
- **TypeScript** - Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Authentication**: Firebase Auth
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthGuard.tsx   # Route protection
│   ├── Chart.tsx       # Main data visualization
│   ├── Dashboard.tsx   # Dashboard layout
│   ├── ErrorBoundary.tsx # Error handling
│   ├── Header.tsx      # Navigation header
│   ├── KPICard.tsx     # Key performance indicators
│   ├── LoadingSpinner.tsx # Loading states
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── VariableEditor.tsx # Variable editing panel
│   └── VariableTag.tsx # Variable selection tags
├── firebase/           # Firebase configuration
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── store/              # Zustand state management
└── types/              # TypeScript type definitions
```

## 🎯 Key Features Implemented

### 1. Dashboard Screen ✅
- Primary data visualization (LineChart with interactive data points)
- Variables Panel with adjustable parameters
- Action buttons including "Edit Variables"
- Responsive KPI cards with hover effects

### 2. Variable Editor Slide-Over ✅
- Smooth slide-in animation from right
- Search functionality for variables
- Category-based organization
- Interactive variable selection with active/inactive states
- Contextual information display

### 3. Data Point Details ✅
- Hover interactions on chart data points
- Animated tooltip with detailed information
- Reference lines for better data visualization
- Fade-in animations for smooth UX

### 4. Authentication System ✅
- Firebase Authentication integration
- Email/password and Google OAuth
- Protected routes with AuthGuard
- Loading and error states

### 5. Responsive Design ✅
- Desktop-first approach
- Mobile and tablet adaptations
- Collapsible sidebar with hamburger menu
- Responsive breakpoints throughout

## 🔄 State Management

The application uses Zustand for state management with the following key states:

- **UI State**: Sidebar collapse, variable editor visibility
- **Data State**: Chart data points, selected variables
- **Search State**: Variable filtering and search queries
- **Auth State**: User authentication status
- **Loading/Error States**: Application-wide loading and error handling

## 🎨 Design System

### Colors
- **Primary Background**: `#161618`
- **Card Background**: `#3a3a3a`
- **Border**: `#404040`
- **Text Primary**: `#ffffff`
- **Text Secondary**: `#a3a3a3`
- **Accent Green**: `#a3e635`
- **Accent Lime**: `#84cc16`

### Typography
- **Primary Font**: Roobert TRIAL
- **Fallback**: Inter, system-ui, sans-serif
- **Weights**: 400, 500, 600, 700

## 🧪 Testing

The application includes comprehensive error handling:

- **Error Boundaries**: Catch and display React errors gracefully
- **Loading States**: Show spinners during async operations
- **Network Error Handling**: Graceful degradation for API failures
- **Form Validation**: Client-side validation for authentication forms

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`
- **Large Desktop**: `> 1280px`

## 🚀 Build & Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔒 Security Features

- **Route Protection**: AuthGuard component protects authenticated routes
- **Firebase Security**: Leverages Firebase's built-in security features
- **Input Validation**: Form validation and sanitization
- **Error Boundaries**: Prevent application crashes from propagating

## 📊 Performance Optimizations

- **Code Splitting**: React.lazy for route-based code splitting
- **Memoization**: React.memo for expensive components
- **Efficient Re-renders**: Zustand's selective subscriptions
- **Optimized Bundle**: Vite's efficient bundling and tree-shaking

## 🐛 Troubleshooting

### Firebase API Key Error
If you see "Firebase: Error (auth/api-key-not-valid)", follow these steps:
1. Ensure you've created a Firebase project
2. Enable Authentication in Firebase Console
3. Copy the correct Firebase config values
4. Update your `.env` file with real values
5. Restart the development server

### Environment Variables Not Loading
- Ensure `.env` file is in the project root
- Restart the development server after changing `.env`
- Check that variable names start with `VITE_`

## ⏱️ Development Time

**Total Development Time**: ~3hr

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
