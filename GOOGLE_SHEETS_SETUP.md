# Google Sheets Integration Setup Guide

## Step 1: Install Required Package

Run this command in your terminal:

```bash
npm install googleapis
```

## Step 2: Create Google Cloud Project & Enable API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `landing-page-form` (or any name you prefer)
   - Click "Create and Continue"
4. Skip the optional steps and click "Done"

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose "JSON" format
5. Click "Create" - this will download a JSON file

## Step 5: Extract Credentials from JSON File

Open the downloaded JSON file and find these values:

```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "landing-page-form@your-project.iam.gserviceaccount.com",
  ...
}
```

Copy the `client_email` and `private_key` values.

## Step 6: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it something like "Landing Page Form Submissions"
4. Add headers in the first row (Row 1):
   - A1: Timestamp
   - B1: Full Name
   - C1: Email
   - D1: Contact Number
   - E1: Location
   - F1: Business Name
   - G1: Team Size

5. Copy the Spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part

## Step 7: Share Spreadsheet with Service Account

1. Click the "Share" button in your spreadsheet
2. Paste the service account email (from Step 5)
3. Give it "Editor" permissions
4. Uncheck "Notify people"
5. Click "Share"

## Step 8: Update .env.local File

Update your `.env.local` file with the actual values:

```env
GOOGLE_SHEET_ID=your_actual_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=landing-page-form@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_actual_private_key_here\n-----END PRIVATE KEY-----\n"
```

**Important Notes:**
- Keep the quotes around the GOOGLE_PRIVATE_KEY value
- Keep the `\n` characters in the private key - they are important
- Never commit the `.env.local` file to Git (it's already in .gitignore)

## Step 9: Restart Development Server

After updating the `.env.local` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 10: Test the Form

1. Fill out the form on your landing page
2. Click "Get a FREE Quote"
3. Check your Google Spreadsheet - a new row should appear with the form data

## Troubleshooting

### Error: "Failed to submit form"
- Check that all environment variables are set correctly
- Make sure the spreadsheet is shared with the service account email
- Verify the GOOGLE_SHEET_ID is correct

### Error: "Missing required fields"
- Ensure all required fields (Full Name, Email, Contact Number, Location) are filled

### Private Key Issues
- Make sure the private key includes the BEGIN and END markers
- Keep all `\n` characters in the key
- The key should be wrapped in double quotes in the .env.local file

### Sheet Name Issues
- If your sheet tab is not named "Sheet1", update the range in `route.ts`:
  ```typescript
  range: 'YourSheetName!A:G',
  ```

## Security Notes

- Never share your `.env.local` file
- Never commit service account credentials to Git
- The `.env.local` file is already in `.gitignore` to prevent accidental commits
- For production, use environment variables in your hosting platform (Vercel, Netlify, etc.)
