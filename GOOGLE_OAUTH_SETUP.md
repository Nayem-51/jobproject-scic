# Google OAuth Setup Guide

## Fixing "redirect_uri_mismatch" Error

This guide will help you fix the `Error 400: redirect_uri_mismatch` when signing in with Google.

## Step 1: Check Your Environment Variables

Make sure your `.env` file has the following:

```env
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
NEXTAUTH_SECRET=your-secret-key-here
```

**Important**: 
- `NEXTAUTH_URL` must match your application URL exactly
- For development: `http://localhost:3000`
- For production: `https://yourdomain.com` (no trailing slash)

## Step 2: Configure Google Cloud Console

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Select your project (or create a new one)

2. **Enable Required APIs**
   - Go to **APIs & Services** → **Library**
   - Search for and enable:
     - **Google+ API** (or **Google Identity API**)
     - **People API**

3. **Create OAuth 2.0 Credentials**
   - Go to **APIs & Services** → **Credentials**
   - Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client ID**
   - If prompted, configure the OAuth consent screen first

4. **Configure OAuth Consent Screen** (if not done)
   - User Type: **External** (for testing) or **Internal** (for Google Workspace)
   - Fill in required fields:
     - App name: Your app name
     - User support email: Your email
     - Developer contact: Your email
   - Click **Save and Continue**
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (if using External type)
   - Click **Save and Continue**

5. **Create OAuth 2.0 Client ID**
   - Application type: **Web application**
   - Name: Your app name (e.g., "ShopNow Dev")
   - **Authorized JavaScript origins**:
     ```
     http://localhost:3000
     ```
     (Add your production URL if applicable)

6. **Add Authorized Redirect URIs** ⚠️ **THIS IS CRITICAL**
   
   Add **EXACTLY** these URIs (case-sensitive, no trailing slashes):
   
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   
   If you have a production URL, also add:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

7. **Save and Copy Credentials**
   - Click **Create**
   - Copy the **Client ID** → paste into `.env` as `GOOGLE_CLIENT_ID`
   - Copy the **Client Secret** → paste into `.env` as `GOOGLE_CLIENT_SECRET`

## Step 3: Verify Your Setup

1. **Check your `.env` file**:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
   NEXTAUTH_SECRET=your-generated-secret-here
   ```

2. **Restart your development server**:
   ```bash
   npm run dev:all
   ```

3. **Test Google Sign-In**:
   - Go to http://localhost:3000/login
   - Click "Sign in with Google"
   - You should be redirected to Google's login page
   - After signing in, you should be redirected back to your app

## Common Issues and Solutions

### Issue 1: "redirect_uri_mismatch"
**Solution**: 
- Double-check the redirect URI in Google Cloud Console
- It must be **exactly**: `http://localhost:3000/api/auth/callback/google`
- No trailing slash, correct protocol (http vs https)
- Make sure `NEXTAUTH_URL` in `.env` matches

### Issue 2: "Access blocked: This app's request is invalid"
**Solution**:
- Make sure you've added your email as a test user in OAuth consent screen (if using External type)
- Check that the OAuth consent screen is published or in testing mode with your email added

### Issue 3: "Invalid client"
**Solution**:
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env` are correct
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env`

### Issue 4: Still not working?
**Solution**:
- Clear browser cookies for localhost
- Check browser console for errors
- Verify the redirect URI in Google Cloud Console matches exactly
- Make sure you're using the correct OAuth 2.0 Client ID (not a service account key)

## Production Deployment

When deploying to production:

1. Update `NEXTAUTH_URL` in your production `.env`:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

2. Add production redirect URI in Google Cloud Console:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

3. Update OAuth consent screen:
   - Add your production domain
   - Publish the app (if ready for production)

## Need Help?

If you're still experiencing issues:
1. Check the browser console for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure the redirect URI in Google Cloud Console matches exactly
4. Make sure your OAuth consent screen is properly configured
