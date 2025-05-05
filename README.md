# Personal Portfolio - Product Engineer

Welcome to the source code for my personal portfolio website. This project showcases my skills, projects, and provides a way to get in touch.

Built with Next.js, React, Tailwind CSS, and TypeScript.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1.  Clone the repo:
    ```bash
    git clone https://github.com/gawdwnn/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```
2.  Install NPM packages:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

This project uses a booking widget from [Cal.com](https://cal.com/). To make the booking functionality work, you need to create a `.env.local` file in the root directory and add your Cal.com details:

```plaintext
NEXT_PUBLIC_CAL_USERNAME=YOUR_CAL_USERNAME
NEXT_PUBLIC_CAL_EVENT_SLUG=YOUR_CAL_EVENT_SLUG
```

Replace `YOUR_CAL_USERNAME` with your Cal.com username and `YOUR_CAL_EVENT_SLUG` with the specific event type slug you want the widget to use.

**Note:** Remember to add `.env.local` to your `.gitignore` file if it's not already there to avoid committing sensitive information. (It appears to be included in the standard Next.js `.gitignore` already).

## Built With

- [Next.js](https://nextjs.org/) - React Framework
- [React](https://reactjs.org/) - JavaScript Library
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript Superset
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [Cal.com](https://cal.com/) - Scheduling Infrastructure (@calcom/atoms, @calcom/embed-react)
- [Geist Font](https://vercel.com/font) - Font Family

## Deployment

This is a standard Next.js application. You can deploy it to platforms like [Vercel](https://vercel.com/) (recommended), Netlify, AWS Amplify, etc. Refer to the Next.js deployment documentation for details.

---

_Replace `gawdwnn/YOUR_REPOSITORY.git` with your actual GitHub repository details._
