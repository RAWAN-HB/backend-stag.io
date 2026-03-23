# Render Deployment Guide for Stag.io Backend

## Step 1: Prepare Your Repository
1. Ensure all code is committed to GitHub
2. Files created:
   - `render.yaml` - Render deployment configuration
   - `.env.example` - Environment variables template (for reference only)

## Step 2: Create a Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account (easier integration)
3. Authorize Render to access your GitHub repositories

## Step 3: Deploy on Render

### Option A: Using render.yaml (Recommended)
1. Push `render.yaml` to your GitHub repository
2. Go to [render.com/dashboard](https://render.com/dashboard)
3. Click **"New +"** → **"Blueprint"**
4. Connect your GitHub repository
5. Select the repository containing the backend
6. Click **"Create New Blueprint"**
7. Render will automatically read `render.yaml` and deploy

### Option B: Manual Deployment
1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository (`stag-backend`)
4. Fill in the details:
   - **Name:** `stag-backend` (or any name)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or Starter for production)

## Step 4: Configure Environment Variables

In Render Dashboard → Your Service → **Environment:**

Add these variables (get values from your local `.env`):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FRONTEND_URL=https://your-frontend.onrender.com
NODE_ENV=production
```

## Step 5: Set Up MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a Free cluster
3. Create a database user
4. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`
5. Add Render IP to MongoDB whitelist:
   - In MongoDB Atlas → Network Access → Add IP Address
   - Add `0.0.0.0/0` (allows all IPs) or Render's IP
   - **Better:** Use MongoDB's prompt to allow Render's IP when deployment fails

## Step 6: Verify Deployment

Once deployed, your API will be available at:
```
https://stag-backend.onrender.com/
```

Test your endpoints:
- **API Status:** https://stag-backend.onrender.com/ (should show "Stag.io backend running")
- **Swagger Docs:** https://stag-backend.onrender.com/api-docs/
- **Routes:**
  - POST https://stag-backend.onrender.com/api/auth/login
  - GET https://stag-backend.onrender.com/api/offers
  - etc.

## Step 7: Update Frontend

Update your frontend `.env` to use the new backend URL:
```
REACT_APP_API_URL=https://stag-backend.onrender.com/api
```

## Troubleshooting

### Server Won't Start
- Check logs in Render Dashboard
- Ensure all environment variables are set
- Verify MongoDB connection string is correct

### MongoDB Connection Fails
- Whitelist Render's IP in MongoDB Atlas
- Check MONGODB_URI format
- Ensure database user has correct permissions

### Module Not Found Errors
- All case-sensitivity fixes are already in place
- Run `git push` to ensure latest code is deployed
- Trigger rebuild in Render Dashboard

### Cold Starts
- Render's free tier puts services to sleep after 15 minutes
- Use paid plan for always-on service
- Add health check endpoint if needed

## Cost Notes
- **Free Tier:** Starts/stops after 15 minutes of inactivity
- **Starter Plan:** $7/month for always-on, high availability
- **MongoDB:** Free tier has limitations (512MB storage)

## Next Steps
1. Push `render.yaml` to GitHub
2. Create Render account
3. Deploy using blueprint or web service
4. Configure environment variables
5. Test API endpoints
6. Update frontend API URL
