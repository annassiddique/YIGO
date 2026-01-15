# YIGO - Next.js Website

A modern, responsive website for YIGO built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized with Next.js 15 and modern best practices
- **Accessibility**: Built with accessibility in mind
- **TypeScript**: Full type safety throughout the application
- **Animations**: Smooth transitions and interactions with Framer Motion

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Fonts**: ITC Avant Garde Gothic Pro (headings) + Inter (body)

## Project Structure

```
/app
  /about          # About page
  /contact        # Contact form
  /projects       # Projects listing
    /[slug]       # Dynamic project pages
  /news-media     # News and media
  /careers        # Careers page
  layout.tsx      # Root layout
  page.tsx        # Home page

/components
  /layout         # Header, Footer, BurgerMenu
  /ui             # Reusable UI components
  /navigation     # Navigation components

/lib
  /data           # Mock data for projects and news
  /utils          # Utility functions and validation

/public
  /images         # Static images
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

#### Email Configuration (Required)
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port (e.g., 587)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_SECURE` - Use secure connection (true/false)
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Recipient email address

#### Google Sheets Integration (Optional)
- `GOOGLE_SHEETS_WEBHOOK_URL` - Google Apps Script webhook URL for saving leads

### Setting Up Google Sheets Lead Tracking

To save contact form submissions to Google Sheets:

1. **Create a Google Sheet** with the following headers in row 1:
   - Timestamp | Name | Company | Email | Phone | Message

2. **Create a Google Apps Script**:
   - Open your Google Sheet
   - Go to `Extensions` → `Apps Script`
   - Replace the default code with:

   ```javascript
   function doPost(e) {
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       const data = JSON.parse(e.postData.contents);
       const timestamp = new Date();
       
       sheet.appendRow([
         timestamp,
         data.name,
         data.company,
         data.email,
         data.phone,
         data.message
       ]);
       
       return ContentService.createTextOutput(JSON.stringify({success: true}))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

3. **Deploy the Script**:
   - Click `Deploy` → `New deployment`
   - Click the gear icon ⚙️ next to "Select type" and choose `Web app`
   - Set:
     - **Execute as**: Me
     - **Who has access**: Anyone
   - Click `Deploy`
   - Copy the webhook URL

4. **Add the URL to Environment Variables**:
   - Add `GOOGLE_SHEETS_WEBHOOK_URL=<your-webhook-url>` to `.env.local`

Note: If the Google Sheets webhook fails, the contact form will still send the email successfully. The sheet write error will be logged but won't affect the user experience.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages

### Home (`/`)
- Hero section with background image
- Company introduction
- Featured projects showcase
- Call-to-action sections

### About (`/about`)
- Company mission and values
- Team member profiles
- Company culture information

### Projects (`/projects`)
- Project gallery with cover-style cards
- Dynamic project detail pages (`/projects/[slug]`)
- Related projects suggestions

### Contact (`/contact`)
- Contact form with validation
- Company contact information
- Form submission handling

### News & Media (`/news-media`)
- News articles and press releases
- Featured stories section
- Media resources

### Careers (`/careers`)
- Open positions listing
- Company benefits
- Culture information

## Navigation

- **Desktop**: Traditional navigation menu in header
- **Mobile**: Burger menu with fullscreen overlay
- **Animations**: Smooth transitions and hover effects

## Design System

### Colors
- Primary: Neutral grays (900, 800, 700, etc.)
- Accent: Blue tones (500, 600, 700, etc.)
- Background: White and neutral-50

### Typography
- Headings: ITC Avant Garde Gothic Pro
- Body: Inter
- Responsive font sizes

### Spacing
- Consistent spacing scale
- Mobile-first responsive design
- Custom breakpoints

## Customization

### Adding New Projects
Edit `/lib/data/projects.ts` to add new projects:

```typescript
{
  slug: 'new-project',
  title: 'Project Name',
  coverImage: '/images/project.jpg',
  description: 'Short description',
  fullDescription: 'Full project description',
  images: ['/images/project-1.jpg', '/images/project-2.jpg'],
  category: 'Category',
  year: 2024,
  client: 'Client Name',
  technologies: ['Tech 1', 'Tech 2']
}
```

### Adding News Articles
Edit `/lib/data/news.ts` to add news items:

```typescript
{
  slug: 'news-slug',
  title: 'News Title',
  excerpt: 'Short excerpt',
  content: 'Full article content',
  date: '2024-01-15',
  author: 'Author Name',
  image: '/images/news.jpg',
  category: 'news',
  featured: false
}
```

## Deployment

The project is ready for deployment on Vercel, Netlify, or any other platform that supports Next.js.

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy** to your preferred platform

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary to YIGO.