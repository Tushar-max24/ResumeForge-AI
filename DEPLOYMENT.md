# ResumeForge AI - Deployment Guide

This guide will help you deploy ResumeForge AI to production using Vercel (frontend) and Render (backend).

## 📋 Prerequisites

- GitHub account with the code pushed to a repository
- Vercel account (free tier is sufficient)
- Render account (free tier is sufficient)
- OpenAI API key

## 🚀 Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - Recommended

#### Step 1: Deploy Backend to Render

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Service**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the "Backend" folder as root directory
   - Use these settings:
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Configure Environment Variables**
   In Render dashboard → Service → Environment:
   ```
   NODE_ENV=production
   PORT=10000
   CLIENT_URL=https://your-frontend-domain.vercel.app
   OPENAI_API_KEY=your_actual_openai_key
   ```

4. **Wait for Deployment**
   - Render will automatically deploy on push
   - Note your backend URL: `https://your-service-name.onrender.com`

#### Step 2: Deploy Frontend to Vercel

1. **Create Vercel Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the "Frontend" folder as root directory

2. **Configure Vercel Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Set Environment Variables**
   In Vercel dashboard → Project → Settings → Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

4. **Deploy**
   - Vercel will automatically deploy
   - Note your frontend URL: `https://your-project-name.vercel.app`

#### Step 3: Update CORS Settings

In your Render backend, make sure the `CLIENT_URL` environment variable is set to your Vercel frontend URL.

### Option 2: Vercel Only (Backend as Serverless Functions)

If you prefer everything on Vercel:

1. **Restructure for Vercel**
   - Move backend code to `Frontend/api/` directory
   - Convert Express routes to Vercel serverless functions

2. **Update API calls** in frontend to use relative URLs

## 🔧 Configuration Files Created

### Frontend Configuration
- `Frontend/vercel.json` - Vercel deployment settings
- `Frontend/.env.example` - Environment variables template

### Backend Configuration  
- `Backend/render.yaml` - Render deployment configuration
- `Backend/.env.example` - Updated with production settings

## 🌐 Testing Your Deployment

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.onrender.com/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Frontend Access**
   - Visit your Vercel URL
   - Try uploading a resume
   - Check if all features work

## 📝 Important Notes

### File Uploads
- Render's free tier has ephemeral storage
- For production, consider using cloud storage (AWS S3, Cloudinary)

### OpenAI Usage
- Monitor your OpenAI API usage
- Set up usage alerts in OpenAI dashboard

### Environment Variables
- Never commit `.env` files to Git
- Always use environment variable management in deployment platforms

### CORS Issues
- Make sure `CLIENT_URL` in backend matches your frontend domain
- Test cross-origin requests in browser dev tools

## 🔄 Continuous Deployment

Both platforms support automatic deployments:

- **Vercel**: Auto-deploys on push to main branch
- **Render**: Auto-deploys on push to main branch

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `CLIENT_URL` environment variable
   - Verify frontend URL is whitelisted

2. **API Connection Failed**
   - Check `VITE_API_URL` in frontend
   - Verify backend is running and accessible

3. **Build Failures**
   - Check `package.json` scripts
   - Verify all dependencies are installed

4. **Upload Issues**
   - Check file size limits
   - Verify backend has write permissions

### Debug Commands

```bash
# Check backend logs (Render)
# In Render dashboard → Service → Logs

# Check frontend deployment (Vercel)
# In Vercel dashboard → Project → Functions → Logs

# Test API locally
curl -X POST http://localhost:5000/api/resume/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test-resume.pdf"
```

## 📊 Monitoring

Set up monitoring for production:

1. **Render**: Built-in metrics and logs
2. **Vercel**: Analytics and function logs
3. **OpenAI**: Usage dashboard and alerts

## 🎉 Success!

Once deployed, your ResumeForge AI will be accessible at:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-service.onrender.com`

Users can upload resumes, get AI-powered analysis, and generate professional CVs!
