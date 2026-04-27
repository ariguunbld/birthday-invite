# Design Spec: Update Birthday Photos

Update the `PHOTOS` array in `components/BirthdayPage.tsx` to use the images available in the `public` folder.

## Requirements
- Replace existing placeholder photos with `image1.jpeg`, `image2.jpeg`, and `image3.jpeg`.
- Captions should be empty strings as per user request.

## Architecture Changes
### Frontend
- Modify `components/BirthdayPage.tsx`:
    - Update `PHOTOS` constant.
    - Update `ROTATIONS` constant to match the number of photos (though it currently has 3, which matches).

## Implementation Plan
1. Edit `components/BirthdayPage.tsx` to update the `PHOTOS` array.
2. Verify the changes by checking the file content.
