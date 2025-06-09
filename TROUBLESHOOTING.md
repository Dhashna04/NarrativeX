# AI Story Generator - Troubleshooting Guide

If you encounter any issues with the AI Story Generator, here are some common problems and their solutions:

## Animation Issues

### Problem: Animation button shows an error or doesn't work

**Solutions:**

1. **Browser Compatibility**
   - Make sure you're using a modern browser like Chrome, Edge, or Firefox
   - Update your browser to the latest version
   - Try a different browser if the issue persists

2. **Canvas/MediaRecorder Support**
   - Some browsers have limited support for the Canvas API or MediaRecorder API
   - The application will automatically fall back to a simplified animation mode
   - If you see a static preview instead of a video, this is the fallback mode

3. **Refresh the Page**
   - Sometimes a simple page refresh can resolve animation issues
   - Close and reopen the application

4. **Check Console for Errors**
   - Right-click on the page and select "Inspect" or "Inspect Element"
   - Go to the "Console" tab to see if there are any specific error messages
   - If you see CORS errors, this is related to image loading restrictions

## Voice Input Issues

### Problem: Voice input button doesn't work

**Solutions:**

1. **Browser Permissions**
   - Make sure you've granted microphone permissions to the application
   - Look for a microphone icon in your browser's address bar
   - Click it and ensure permissions are set to "Allow"

2. **Browser Support**
   - Voice input requires the Web Speech API, which is not supported in all browsers
   - Chrome and Edge have the best support for this feature
   - The button will be disabled if your browser doesn't support voice input

## Story Generation Issues

### Problem: Story generation takes too long or fails

**Solutions:**

1. **Check Your Connection**
   - The application should work offline, but some features may require internet
   - Ensure you have a stable internet connection

2. **Refresh and Try Again**
   - If generation fails, try refreshing the page and generating again
   - Use a shorter story length setting if generation is slow

3. **Simplify Your Prompt**
   - Very complex prompts might cause issues
   - Try a simpler prompt with fewer specific requirements

## General Troubleshooting

1. **Clear Browser Cache**
   - Clear your browser's cache and cookies
   - Restart your browser and try again

2. **Check for Script Blocking**
   - If you use ad blockers or script blockers, they might interfere with the application
   - Try temporarily disabling them

3. **Local File Access**
   - Some browsers restrict access to local files
   - Try using a local web server to serve the files instead of opening them directly

If you continue to experience issues, please report them with specific details about:
- Which browser and version you're using
- What specific action triggered the error
- Any error messages you see in the console

## Contact Support

For additional help, please contact support at support@aistorygenerator.example.com