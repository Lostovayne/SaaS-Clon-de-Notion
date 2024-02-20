### Notion Clone

The development of the Notion application mentioned earlier showcases the implementation of cutting-edge technologies. Built on Next 14, the application seamlessly integrates Clerk for secure authentication and leverages Convex as a robust cloud backend. To enhance the user experience, the application utilizes a combination of Shadcn components and Tailwind for stylish and responsive designs. This combination of powerful tools and frameworks ensures a seamless and visually appealing experience for users.

![screencapture-localhost-3000-2023-11-16-16_22_56](https://github.com/Lostovayne/Clon-de-Notion-con-Next14-Tailwind-Typescript/assets/92962731/9fff6f52-88ff-4798-b59e-f1a8d19e84d1)

**Key Features:**

-   Real-time database 🔗
-   Notion-style editor 📝
-   Light and Dark mode 🌓
-   Infinite children documents 🌲
-   Trash can & soft delete 🗑️
-   Authentication 🔐
-   File upload
-   File deletion
-   File replacement
-   Icons for each document (changes in real-time) 🌠
-   Expandable sidebar ➡️🔀⬅️
-   Full mobile responsiveness 📱
-   Publish your note to the web 🌐
-   Fully collapsable sidebar ↕️
-   Landing page 🛬
-   Cover image of each document 🖼️
-   Recover deleted files 🔄📄

### Prerequisites

**Node version 18.x.x**

### Install packages

```shell
npm i
```

**Copy .env.example to .env.local**

### Setup .env.local file

```js
# Deployment used by `npx convex dev`

# Variables de entorno de convex se agregan automaticamente si se ejecuta el comando npx.... de la web de convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Variables de entorno de Clerk => Tomarlas de la web de clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

```

### Start server convex

```shell
npx convex dev

```

### Start the app

```shell
npm run dev
```
