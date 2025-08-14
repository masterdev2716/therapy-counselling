# Therapy Pathfinder - Website Integration Guide

This guide explains how to integrate the Therapy Pathfinder app on the OLIP Therapy website.

## Problem Solved

The app now properly handles navigation when embedded in an iframe on the OLIP Therapy website. Previously, the "Contact Us" and "Visit Website" buttons would only work when the app was running standalone, not when embedded.

## Solution Implemented

1. **Iframe Detection**: The app now detects if it's running in an iframe using `window.self !== window.top`
2. **PostMessage Communication**: When in an iframe, the app sends navigation messages to the parent window
3. **Fallback Navigation**: If postMessage fails, it falls back to `window.top.location.href`
4. **Standalone Support**: When not in an iframe, it uses normal `window.open()` navigation

## Files Modified

- `src/components/TherapyPathfinder.tsx` - Updated navigation handlers
- `src/components/therapy/utils.ts` - Added `navigateToUrl()` utility function
- `public/iframe-navigation.js` - Parent website navigation handler

## Integration Steps for OLIP Therapy Website

### Option 1: Include the Navigation Handler Script

Add this script to the OLIP Therapy website's HTML (in the `<head>` or before closing `</body>`):

```html
<script src="https://your-app-domain.com/iframe-navigation.js"></script>
```

### Option 2: Add the Handler Code Directly

Add this JavaScript code to the OLIP Therapy website:

```javascript
// Listen for messages from the therapy pathfinder iframe
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'NAVIGATE') {
        const url = event.data.url;
        if (url && typeof url === 'string') {
            window.location.href = url;
        }
    }
});
```

### Option 3: Embed the App

Embed the app using an iframe:

```html
<iframe 
    src="https://your-app-domain.com" 
    width="100%" 
    height="800px" 
    frameborder="0"
    allowfullscreen>
</iframe>
```

## How It Works

1. **User clicks "Contact Us" or "Visit Website"** in the embedded app
2. **App detects it's in an iframe** and sends a postMessage to the parent window
3. **Parent website receives the message** and navigates to the specified URL
4. **If postMessage fails**, the app falls back to direct top-level navigation
5. **If not in an iframe**, the app uses normal window.open() navigation

## Testing

- **Standalone**: Test the app directly at its URL - buttons should work normally
- **Embedded**: Test the app embedded in an iframe - buttons should navigate the parent website
- **Cross-origin**: Test with different domains to ensure security policies are respected

## Security Notes

- The postMessage handler accepts messages from any origin (`'*'`) for simplicity
- For production, consider adding origin verification in the parent website handler
- The app uses `window.top.location.href` as a fallback, which may be blocked by some browsers

## URLs Generated

The app generates these URLs based on therapy recommendations:

- **Counselling**: `https://www.oliptherapy.co.uk/counselling`
- **Couples Counselling**: `https://www.oliptherapy.co.uk/couples-counselling`
- **EMDR**: `https://www.oliptherapy.co.uk/emdr`
- **Hypnotherapy**: `https://www.oliptherapy.co.uk/hypnotherapy`
- **CBT**: `https://www.oliptherapy.co.uk/cbtpage`
- **Contact Us**: `https://www.oliptherapy.co.uk/contact`

## Support

If you encounter any issues with the integration, check:

1. Browser console for JavaScript errors
2. Network tab for failed requests
3. Iframe permissions and security policies
4. Cross-origin resource sharing (CORS) settings 