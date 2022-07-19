# Welcome to Collab-Note-YJS !!!

Collab-Note-YJS is a multi-repo project which divided by two repositories (frontend and backend). This repository is the **_frontend_** part.

## Deployed app

[You can access deployed project from here!](https://collab-note-yjs.herokuapp.com/)

**⚠️ CAUTION!!!**

`*.herokuapp.com` domain is included in [Public Suffix List](https://publicsuffix.org/) and app in the domain are generally prevented from setting Cookies ([see here](https://devcenter.heroku.com/articles/cookies-and-herokuapp-com)). Now Collab-Note-YJS is deployed in the `*.herokuapp.com` domain and meets **lower security level** than when using Cookies.

So please do **NOT** write secure information in this app.

## Tech stack

- TypeScript
- React
- [Tailwind CSS](https://tailwindcss.com/) (styling)
  - partially using ordinary CSS
- [Yjs](https://docs.yjs.dev/)
  - implementation of CRDT(Conflict-free Replicated Data Type)
  - core technology of collaborative functionality
- [Tip Tap](https://tiptap.dev/)
  - text editor on JavaScript
  - wrapper of [ProseMirror](https://prosemirror.net/)

## Related repositories

- [collab-note-yjs-wsserver](https://github.com/tororosoba0534/collab-note-yjs-wsserver)
  - The backend of the entire project.
- [sample-dnd](https://github.com/tororosoba0534/sample-dnd)
  - If possible, I'd like to combine it to this frontend code.
