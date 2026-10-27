const mongoose = require("mongoose");

const storeSettingSchema = new mongoose.Schema(
  {
    navbar: {
      storeName: { type: String, default: "" },
      logoUrl: { type: String, default: "/nt-logo.png" },
      announcementText: {
        type: String,
        default: "",
      },
      links: {
        type: [
          {
            name: { type: String, required: true },
            path: { type: String, required: true },
          },
        ],
        default: [
          { name: "MEN", path: "/men" },
          { name: "WOMEN", path: "/women" },
          { name: "KIDS", path: "/kids" },
          { name: "ABOUT US", path: "/about" },
        ],
      },
    },
    hero: {
      heading: { type: String, default: "FOREVER" },
      highlightText: { type: String, default: "FASTER." },
      subtitle: {
        type: String,
        default:
          "Step into the future of style. Premium footwear crafted for those who move with purpose.",
      },
      heroImage: { type: String, default: "/men1.png" },
      badgeText: { type: String, default: "Premium Quality" },
      btnPrimaryText: { type: String, default: "Shop Now" },
      btnPrimaryLink: { type: String, default: "/men" },
      btnSecondaryText: { type: String, default: "Our Story" },
      btnSecondaryLink: { type: String, default: "/about" },
      // Right side features & stats
      feature1Title: { type: String, default: "Premium Quality" },
      feature1Desc: {
        type: String,
        default: "Handpicked materials sourced from the world's finest tanneries and textile mills.",
      },
      feature2Title: { type: String, default: "New Arrivals" },
      feature2Desc: {
        type: String,
        default: "Fresh drops every week. Stay ahead of the curve with our latest collections.",
      },
      feature3Title: { type: String, default: "Free Delivery" },
      feature3Desc: {
        type: String,
        default: "Complimentary shipping on all orders above ₹999. Fast & secure delivery nationwide.",
      },
      stat1Value: { type: String, default: "500+" },
      stat1Label: { type: String, default: "Styles" },
      stat2Value: { type: String, default: "50K+" },
      stat2Label: { type: String, default: "Customers" },
    },
    seasonDrop: {
      badge: { type: String, default: "New Season Drop" },
      heading: { type: String, default: "BUILT FOR" },
      highlightText: { type: String, default: "THE BOLD." },
      subtitle: {
        type: String,
        default:
          "Every pair tells a story. Engineered for performance, designed for the streets — our latest collection pushes boundaries.",
      },
      shoeImage: { type: String, default: "/men2.png" },
      stat1Value: { type: String, default: "200+" },
      stat1Label: { type: String, default: "New Styles" },
      stat2Value: { type: String, default: "100%" },
      stat2Label: { type: String, default: "Original" },
      stat3Value: { type: String, default: "Free" },
      stat3Label: { type: String, default: "Shipping" },
      btn1Text: { type: String, default: "Explore Collection" },
      btn1Link: { type: String, default: "/kids" },
      btn2Text: { type: String, default: "View items" },
      btn2Link: { type: String, default: "/men" },
      tagTitle: { type: String, default: "Limited Edition" },
      tagSubtitle: { type: String, default: "Only 50 pairs left" },
      bottomTagTitle: { type: String, default: "Premium Comfort" },
      bottomTagSubtitle: { type: String, default: "Ortho-flex sole technology" },
    },
    about: {
      subtitle: { type: String, default: "Our Story" },
      title: { type: String, default: "About Next Trend" },
      story: {
        type: String,
        default:
          "Next Trend was born from a simple idea — footwear should feel as good as it looks. We curate premium sneakers from the world's best brands, delivering comfort, quality, and style straight to your doorstep.",
      },
      // Core Pillars / Values
      pillar1Title: { type: String, default: "Our Mission" },
      pillar1Desc: {
        type: String,
        default:
          "To bring premium, comfortable footwear to every step you take, without compromising on style.",
      },
      pillar2Title: { type: String, default: "Crafted with Care" },
      pillar2Desc: {
        type: String,
        default:
          "Every pair is carefully selected from trusted brands known for quality and durability.",
      },
      pillar3Title: { type: String, default: "Trusted Quality" },
      pillar3Desc: {
        type: String,
        default:
          "We partner only with authentic, verified brands so you always get what you pay for.",
      },
      // Journey
      journeySubtitle: { type: String, default: "Our Journey" },
      journeyTitle: { type: String, default: "How We Started" },
      milestones: {
        type: [
          {
            year: { type: String, default: "" },
            title: { type: String, default: "" },
            desc: { type: String, default: "" },
          },
        ],
        default: [
          { year: "2020", title: "The Beginning", desc: "Started as a small sneaker resale operation from a single storefront." },
          { year: "2022", title: "Going Digital", desc: "Launched our online store, bringing premium sneakers to customers nationwide." },
          { year: "2024", title: "Expanding Brands", desc: "Partnered with 8+ top global brands to offer an even wider curated collection." },
          { year: "2026", title: "Today", desc: "Serving 50,000+ happy customers with fast delivery and secure checkout." },
        ],
      },
      // Stats
      stat1Value: { type: String, default: "2020" },
      stat1Label: { type: String, default: "Founded" },
      stat2Value: { type: String, default: "500+" },
      stat2Label: { type: String, default: "Products" },
      stat3Value: { type: String, default: "50K+" },
      stat3Label: { type: String, default: "Customers" },
      stat4Value: { type: String, default: "8" },
      stat4Label: { type: String, default: "Top Brands" },
      image: { type: String, default: "" },
    },
    footer: {
      description: {
        type: String,
        default:
          "Your ultimate destination for curated sneakers, running icons, and everyday performance footwear.",
      },
      email: { type: String, default: "support@nexttrend.com" },
      phone: { type: String, default: "+91 98765 43210" },
      address: {
        type: String,
        default: "123 Sneaker Boulevard, Fashion District, New Delhi, India",
      },
      copyright: {
        type: String,
        default: "© 2026 Next Trend Inc. All rights reserved.",
      },
      instagram: { type: String, default: "https://instagram.com" },
      twitter: { type: String, default: "https://twitter.com" },
      facebook: { type: String, default: "https://facebook.com" },
    },
  },
  { timestamps: true }
);

const StoreSetting = mongoose.model("StoreSetting", storeSettingSchema);

module.exports = StoreSetting;
