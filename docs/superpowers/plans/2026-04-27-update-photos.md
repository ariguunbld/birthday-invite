# Update Birthday Photos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the `PHOTOS` array in `components/BirthdayPage.tsx` with images from the `public` folder.

**Architecture:** This is a simple configuration update in the frontend component.

**Tech Stack:** React, Next.js (Image component).

---

### Task 1: Update PHOTOS constant

**Files:**
- Modify: `components/BirthdayPage.tsx`

- [ ] **Step 1: Replace PHOTOS array**

```typescript
// components/BirthdayPage.tsx

// Find:
const PHOTOS = [
  { src: "/images/photo1.jpg", caption: "Эхний өдөр" },
  { src: "/images/photo2.jpg", caption: "Тав дахь сар" },
  { src: "/images/photo3.jpg", caption: "Нэг нас" },
];

// Replace with:
const PHOTOS = [
  { src: "/image1.jpeg", caption: "" },
  { src: "/image2.jpeg", caption: "" },
  { src: "/image3.jpeg", caption: "" },
];
```

- [ ] **Step 2: Verify the change**

Check the file content to ensure the update was applied correctly.

- [ ] **Step 3: Commit**

```bash
git add components/BirthdayPage.tsx
git commit -m "feat: update birthday photos to image1-3.jpeg"
```
