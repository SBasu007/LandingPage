import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, contactNumber, location, businessName, teamSize } = body;

    // Validate required fields
    if (!fullName || !email || !contactNumber || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Setup Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Prepare data row
    const timestamp = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    
    const row = [
      timestamp,
      fullName,
      email,
      contactNumber,
      location,
      businessName || 'N/A',
      teamSize || 'N/A',
    ];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:G', // Change 'Sheet1' if your sheet has a different name
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
