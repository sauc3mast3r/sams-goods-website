# Sam's Goods, LLC - Website Documentation

## Overview

This is a complete, professional website/store for Sam's Goods, LLC featuring:

- **Homepage** with hero section, about info, and service previews
- **Services Page** with detailed pricing and service descriptions
- **Store Page** with product catalog and shopping cart functionality
- **Booking Page** with comprehensive service booking form
- **About Page** with business and founder information
- **Contact Page** with contact form and business information
- **Terms Page** with service agreements and policies

## Features

### ✅ Fully Responsive Design
- Mobile-first approach with responsive breakpoints
- Touch-friendly interface for mobile devices
- Professional dark theme with gold accents

### ✅ E-commerce Functionality
- Shopping cart with local storage persistence
- Product catalog with images and pricing
- Beat preview and purchase system
- Email-based checkout process

### ✅ Service Booking System
- Comprehensive booking form with Formspree integration
- Service selection with detailed options
- Availability calendar display
- Automated email notifications

### ✅ Professional Branding
- Custom logo integration (SG ICON.ico as favicon)
- Consistent brand colors and typography
- High-quality product images and assets

### ✅ SEO Optimized
- Semantic HTML structure
- Meta descriptions and proper titles
- Accessible design with focus states
- Fast loading times

## File Structure

```
sams-goods-website/
├── index.html              # Homepage
├── services.html           # Services page
├── store.html             # Store/shop page
├── booking.html           # Service booking page
├── about.html             # About page
├── contact.html           # Contact page
├── terms.html             # Terms and contracts page
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── main.js            # General functionality
│   └── store.js           # Shopping cart functionality
├── images/                # Logo files
│   ├── SG ICON.ico        # Favicon
│   ├── SG ICON.png        # Logo icon
│   ├── samo.png           # Main logo
│   ├── sams goods.png     # Alternative logo
│   └── sams-goods2.png    # Secondary logo
├── assets/
│   └── Product_Catalog/   # Product images organized by category
└── audio/
    └── Beats_for_sale/    # Audio files for beat previews
```

## Local Development Setup

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local server) OR any other local server solution

### Running Locally

1. **Download and Extract**
   ```bash
   # Extract the website files to your desired location
   cd /path/to/sams-goods-website
   ```

2. **Start Local Server**
   ```bash
   # Using Python (recommended)
   python3 -m http.server 8000
   
   # OR using Python 2
   python -m SimpleHTTPServer 8000
   
   # OR using Node.js (if you have it installed)
   npx http-server -p 8000
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:8000`
   - The website should load with full functionality

### Testing Checklist

- [ ] Homepage loads with hero section and navigation
- [ ] All navigation links work correctly
- [ ] Store page displays products with images
- [ ] Shopping cart functionality works (add/remove items)
- [ ] Booking form displays all service options
- [ ] Audio players work in beats section
- [ ] Contact forms are properly configured
- [ ] Website is responsive on mobile devices

## Deployment Options

### Option 1: GitHub Pages (Recommended)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sam's Goods website"
   git branch -M main
   git remote add origin https://github.com/yourusername/sams-goods-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

3. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/sams-goods-website`
   - Updates automatically when you push changes

### Option 2: Netlify

1. **Drag and Drop Deployment**
   - Go to [netlify.com](https://netlify.com)
   - Drag the entire website folder to the deploy area
   - Your site will be live immediately with a random URL

2. **Custom Domain (Optional)**
   - In Netlify dashboard, go to Domain settings
   - Add your custom domain
   - Follow DNS configuration instructions

### Option 3: Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd sams-goods-website
   vercel
   ```

3. **Follow Prompts**
   - Choose project settings
   - Your site will be deployed automatically

## Configuration

### Form Setup (Important!)

The website uses Formspree for form handling. To set up your own forms:

1. **Create Formspree Account**
   - Go to [formspree.io](https://formspree.io)
   - Create a free account

2. **Update Form Actions**
   - Replace `https://formspree.io/f/xpwagvkr` in the following files:
     - `booking.html` (line ~47)
     - `contact.html` (line ~47)
   - Use your own Formspree endpoint

3. **Test Forms**
   - Submit test forms to ensure emails are received
   - Configure email notifications in Formspree dashboard

### Email Configuration

Update email addresses throughout the site:

- **Primary Email**: `Samosupreme@samsgoods.company`
- **Instagram**: `@samsgoods`

Search and replace these in all HTML files if different.

## Content Management

### Adding New Products

1. **Add Product Images**
   - Place product images in `assets/Product_Catalog/[Category]/`
   - Use consistent naming: `Product_Name.png`
   - Recommended size: 500x500px minimum

2. **Update Store Page**
   - Edit `store.html`
   - Copy existing product card structure
   - Update image path, name, and price
   - Add to appropriate section (apparel, stickers, mugs)

3. **Example Product Card**
   ```html
   <div class="product-card">
       <img src="assets/Product_Catalog/Category/Product_Name.png" alt="Product Name" class="product-image">
       <div class="product-info">
           <h3 class="product-title">Product Name</h3>
           <p class="product-price">$XX.XX</p>
           <button class="btn btn-primary" onclick="addToCart('Product Name', XX.XX)">Add to Cart</button>
       </div>
   </div>
   ```

### Adding New Beats

1. **Add Audio Files**
   - Place MP3 files in `audio/Beats_for_sale/`
   - Use format: `Beat Name - XXX BPM.mp3`

2. **Update Store Page**
   - Edit the beats section in `store.html`
   - Copy existing beat card structure
   - Update audio source, name, BPM, genre, and pricing

### Updating Services and Pricing

1. **Services Page**
   - Edit `services.html`
   - Update pricing in service cards
   - Add new services by copying existing card structure

2. **Booking Form**
   - Edit `booking.html`
   - Update service options in the dropdown (line ~65-85)
   - Add new services to maintain consistency

### Customizing Design

1. **Colors and Branding**
   - Edit CSS variables in `css/style.css` (lines 8-20)
   - Update primary, secondary, and accent colors
   - Modify fonts and spacing as needed

2. **Logo Updates**
   - Replace files in `images/` directory
   - Update favicon by replacing `SG ICON.ico`
   - Ensure consistent sizing across pages

## Maintenance

### Regular Updates

1. **Content Updates**
   - Update pricing regularly
   - Add new products seasonally
   - Refresh featured products on homepage

2. **Form Monitoring**
   - Check Formspree submissions regularly
   - Respond to inquiries within 24 hours
   - Monitor spam and adjust settings if needed

3. **Performance**
   - Optimize images before uploading
   - Test website speed regularly
   - Monitor mobile responsiveness

### Backup Strategy

1. **Version Control**
   - Use Git for all changes
   - Create branches for major updates
   - Tag releases for easy rollback

2. **Asset Backup**
   - Keep original high-resolution images
   - Backup audio files separately
   - Document all customizations

## Troubleshooting

### Common Issues

1. **Images Not Loading**
   - Check file paths are correct
   - Ensure images are in proper directories
   - Verify file extensions match HTML references

2. **Forms Not Working**
   - Verify Formspree endpoint is correct
   - Check internet connection
   - Test with different browsers

3. **Audio Not Playing**
   - Ensure MP3 files are properly encoded
   - Check file paths in HTML
   - Test with different browsers

4. **Mobile Issues**
   - Test on actual devices, not just browser dev tools
   - Check touch targets are large enough
   - Verify text is readable on small screens

### Browser Compatibility

- **Supported**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Features**: CSS Grid, Flexbox, ES6 JavaScript
- **Fallbacks**: Graceful degradation for older browsers

## Support

For technical support or customization requests:

- **Email**: Samosupreme@samsgoods.company
- **Instagram**: @samsgoods

## License

This website is custom-built for Sam's Goods, LLC. All rights reserved.

---

**Built with ❤️ for Sam's Goods, LLC**
*Professional creative services in Sacramento, CA*

