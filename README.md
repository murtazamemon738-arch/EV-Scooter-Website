# EV Scooter Website

## Project Overview

Build a premium, modern and fully responsive electric scooter website for a fictional EV brand called **EVO**.

The website should feel like a real commercial EV company website, not a basic student project or template.

The design direction is:

**Modern Light + Premium + Clean + Futuristic + Product Focused**

The website must strongly focus on high-quality scooter imagery, visual storytelling, smooth animations and a polished user experience.

---

# 1. Technology

Use only:

* HTML5
* CSS3
* Vanilla JavaScript

Do NOT use:

* React
* Vue
* Angular
* Tailwind CSS
* Bootstrap
* jQuery
* Unnecessary frameworks

Keep the project lightweight and easy to maintain.

---

# 2. Project Structure

The final project should follow this structure:

```text
EV-Scooter-Website/

├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    │
    ├── images/
    │   ├── scooters/
    │   ├── lifestyle/
    │   ├── technology/
    │   ├── features/
    │   └── backgrounds/
    │
    └── icons/
```

Do not create unnecessary files or folders.

---

# 3. Brand

Brand name:

**EVO**

Brand category:

**Electric Scooter / Smart Electric Mobility**

Brand personality:

* Modern
* Premium
* Smart
* Sustainable
* Reliable
* Innovative
* Urban

Suggested tagline:

**Move Into The Future**

---

# 4. Design System

## Theme

Modern Light.

Primary visual direction:

* White
* Off-white
* Soft gray
* Charcoal
* Very subtle green/blue accents

Use generous whitespace.

Use:

* Large typography
* Rounded corners
* Soft shadows
* Clean cards
* Subtle borders
* Premium imagery
* Minimal glassmorphism
* Smooth transitions

Avoid:

* Excessive gradients
* Excessive glow effects
* Overly colorful UI
* Crowded layouts
* Generic template appearance

---

# 5. Main Website Sections

The website should contain:

1. Navbar
2. Hero
3. Performance Statistics
4. Scooter Models
5. Why Choose EVO
6. Smart Technology
7. Performance
8. Battery & Charging
9. Lifestyle Experience
10. Safety
11. Gallery
12. Mobile App
13. Testimonials
14. FAQ
15. Test Ride CTA
16. Footer

---

# 6. Image Requirements

Images are one of the most important parts of this project.

The website must NOT be mostly text and cards.

Use large, high-quality EV scooter images throughout the website.

Required image categories:

### Scooter Product Images

* Front view
* Side view
* Rear view
* Three-quarter view
* Multiple scooter models
* Different scooter colors

### Lifestyle Images

* Person riding scooter
* Urban city riding
* Modern streets
* Nature riding
* Commuting

### Technology Images

* Digital dashboard
* Smartphone application
* Smart display
* GPS
* Battery technology

### Feature Images

* Charging
* Battery
* Lighting
* Braking
* Security

### Gallery Images

Create a visually attractive gallery using multiple scooter-related images.

---

# 7. Image Folder Rules

Store images according to their purpose.

Example:

```text
assets/images/scooters/
```

for product scooter images.

```text
assets/images/lifestyle/
```

for rider and lifestyle images.

```text
assets/images/technology/
```

for technology-related images.

```text
assets/images/features/
```

for individual feature imagery.

Do not put every image into one folder.

---

# 8. Hero Section

The Hero section is the most important visual section.

Layout:

Left:

* Small category label
* Large headline
* Supporting description
* Primary CTA
* Secondary CTA

Right:

Large premium EV scooter image.

Add floating specifications:

```text
120 km
Range

70 km/h
Top Speed

4–5 hrs
Charging

0%
Emissions
```

The scooter should visually dominate the Hero section.

---

# 9. Scooter Models

Create three fictional models:

## EVO Lite

City Commuter

* 120 km range
* 60 km/h top speed
* Starting at $1,999

## EVO Pro

Long Range

* 150 km range
* 70 km/h top speed
* Starting at $2,499

## EVO Max

High Performance

* 180 km range
* 85 km/h top speed
* Starting at $3,199

Every model must have a large scooter image.

---

# 10. Smart Technology

Include:

* Smart Display
* GPS Tracking
* Mobile App
* Battery Monitoring
* Ride Statistics
* Anti-Theft Protection

Every feature should have:

* Icon
* Title
* Short explanation
* Relevant image where appropriate

---

# 11. Battery & Charging

Include:

* Range information
* Charging time
* Battery monitoring
* Charging process
* Battery health

Use a large charging/battery image.

Create a visual charging indicator:

```text
0% → 25% → 50% → 75% → 100%
```

Animate it when the section becomes visible.

---

# 12. Safety

Include:

* Anti-lock braking
* LED lighting
* Anti-theft alarm
* Smart lock
* Tire monitoring
* High visibility

Use relevant imagery instead of only text.

---

# 13. Gallery

Create a premium image gallery.

Images should include:

* Scooter front
* Scooter side
* Scooter rear
* Rider
* City
* Nature
* Dashboard
* Charging

Implement:

* Hover animation
* Image zoom
* Lightbox
* Previous button
* Next button
* Close button

Keyboard support:

```text
ESC
Arrow Left
Arrow Right
```

---

# 14. Responsive Design

The website must work properly on:

* 320px
* 375px
* 425px
* 768px
* 1024px
* 1280px
* 1440px
* 1920px

Mobile must have:

* Hamburger menu
* Vertical hero
* Responsive images
* Touch-friendly buttons
* Proper spacing
* No horizontal overflow

---

# 15. JavaScript Features

Implement functional interactions:

* Sticky navbar
* Navbar scroll effect
* Mobile menu
* Smooth scrolling
* Active navigation
* Scroll reveal
* Counter animation
* FAQ accordion
* Testimonial slider
* Gallery lightbox
* Gallery navigation
* Test ride modal
* Form validation
* Success message
* Back-to-top button

Buttons should not be fake.

---

# 16. Test Ride Form

Fields:

* Full Name
* Email
* Phone
* Preferred Scooter
* Preferred Date
* Message

Add client-side validation.

After successful submission, show a professional success message.

No backend is required at this stage.

Structure the JavaScript so a backend/API can be connected later.

---

# 17. Animation Guidelines

Animations should be:

* Smooth
* Professional
* Subtle
* Fast
* Purposeful

Use:

* Fade-up
* Fade-in
* Image reveal
* Scale
* Slide
* Hover
* Counter animations

Do NOT over-animate the website.

Support:

```css
prefers-reduced-motion
```

---

# 18. Accessibility

Use:

* Semantic HTML
* Proper heading hierarchy
* Alt text
* Keyboard accessibility
* Accessible buttons
* Form labels
* ARIA where appropriate

Every meaningful image must have descriptive alt text.

---

# 19. Performance

Optimize the website for fast loading.

Use:

* Lazy loading for images
* Efficient CSS
* Minimal JavaScript
* Optimized image dimensions
* No unnecessary dependencies

Avoid large unnecessary libraries.

---

# 20. Code Quality

HTML should be:

* Semantic
* Clean
* Organized

CSS should use:

* CSS variables
* Reusable classes
* Organized sections
* Responsive media queries

JavaScript should use:

* Clear function names
* Modular functions
* Event listeners
* No unnecessary global variables

Do not leave:

* Console errors
* Broken links
* Broken images
* Unused code
* Duplicate code

---

# 21. Development Rule

Before implementing the website:

1. Read this README completely.
2. Understand the complete design direction.
3. Inspect the project directory.
4. Do not create unnecessary files.
5. Build the structure first.
6. Then implement styling.
7. Then implement JavaScript functionality.
8. Then test responsiveness.
9. Then perform a visual polish pass.
10. Fix all errors before finishing.

---

# 22. Final Goal

The final website should look like a premium real-world EV scooter company website.

It should communicate:

**Technology + Performance + Sustainability + Premium Design + Smart Mobility**

The most important priorities are:

1. High-quality scooter imagery
2. Strong visual hierarchy
3. Modern light theme
4. Premium UI
5. Smooth animations
6. Responsive design
7. Functional interactions
8. Clean code
9. Excellent mobile experience
10. Professional overall presentation

Do not stop at a basic working website.

Continue refining the design until it feels production-ready.
