# Shop Application

## Live Website: [Peak Performance](http://peakperformance.wlodzimierrr.co.uk/)

## Overview

This project is just a bike shop. It provides users with a seamless experience to browse products, add to cart, pay as a guest or register account, change password or user details. The application is split into two main parts: the main user-facing application and an admin interface for product management and analytics.

## Architecture

### Front End

- **Technology**: Developed using React Vite.
- **Styling**: Uses Tailwind CSS for styling, Swiper for slider and react icons.
- **Form Validation**: Includes form validation for user inputs.
- **Payment Integration**: Utilizes Stripe for payment processing.

### Back End

- **Technology**: Developed using Express.js.
- **Database**: Uses MongoDB with Mongoose for data management.
- **Images**: Uses Multer for uploading Images.
- **Authentication**: Uses JWT for user authentication.

### Admin Interface

- **Technology**: Separate React application for admin functionalities.
- **Features**: Includes product management and analytics.

### Hosting

- **Platform**: Hosted on Google Cloud.

### Server

- **Web Server**: Caddy for serving the application.
