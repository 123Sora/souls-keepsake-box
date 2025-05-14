# Soul's Keepsake Box is a responsive web application where users can submit, view, edit, and delete messages. Messages are stored locally and persist even after page refresh. The application includes a dark/light mode toggle for user preference.

## Features

- **Message Management**
  - Create new messages
  - View all submitted messages
  - Edit existing messages
  - Delete messages

- **User Experience**
  - Responsive design for all device sizes
  - Dark/light mode toggle
  - Form validation and error handling
  - Success notifications
  - Character limit counter

- **Data Persistence**
  - Messages stored in browser's localStorage
  - Messages persist after page refresh

- **Error Handling**
  - Empty message validation
  - Character limit validation (500 characters maximum)
  - Visual feedback for validation errors
  
  
## Visual Feedback
  - Error messages appear in red below the text area
  - The character counter changes color when you exceed the limit
  - Success messages appear when operations complete successfully



## Technologies Used

  - Language: TypeScript
  - Framework: Next.js
  - Style: Tailwind CSS
  - Icons: Lucide React 
  - Date Formatting: date-fns
  - Theme Switching: next-themes


## Usage


- **Adding a Message**
  - Type your message in the text area
  - Click the "Submit" button
  - Your message will appear in the list below
  Noted: The application includes validation:
    - If you try to submit an empty message, you'll see an error: "Please enter a message
    - If your message exceeds 500 characters, you'll see an error: "Message is too long (maximum 500 characters)"

- **Editing a Message**
  - Click the "Edit" button on any message
  - Modify the text in the form
  - Click "Update" to save changes

- **Deleting a Message**
  - Click the "Delete" button on any message
  - The message will be removed from the list

- **Toggling Dark/Light Mode**
  - Click the sun/moon icon in the header to switch between dark and light themes.










  
  