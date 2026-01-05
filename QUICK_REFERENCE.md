# LibraryHub - Quick Reference Guide

## 🚀 Quick Start

### Starting the Application
```bash
cd /home/harsh/.gemini/antigravity/playground/sparse-singularity
npm run dev
```
Then open: http://localhost:5173/

---

## 📖 Common Tasks

### Books Management

#### Add a New Book
1. Navigate to **Books** page
2. Click **+ Add Book**
3. Fill in:
   - Title (required)
   - Author (required)
   - ISBN (required)
   - Category (required, with autocomplete)
   - Publication Year (required, 1000-current year)
   - Quantity (required, minimum 1)
4. Click **Add Book**

#### Edit a Book
1. Find the book in the table
2. Click the ✏️ (edit) button
3. Modify details
4. Click **Update Book**

#### Delete a Book
1. Find the book in the table
2. Click the 🗑️ (delete) button
3. Confirm deletion in modal
4. Click **Delete Book**

#### Search Books
- Use the search box to find by title, author, or ISBN
- Use the category dropdown to filter by category
- Combine search and filter for precise results

---

### Members Management

#### Register a New Member
1. Navigate to **Members** page
2. Click **+ Add Member**
3. Fill in:
   - Full Name (required)
   - Member ID (auto-generated, can be modified)
   - Email Address (required, validated)
   - Phone Number (required)
4. Click **Add Member**

#### Edit a Member
1. Find the member in the table
2. Click the ✏️ (edit) button
3. Modify details (Member ID cannot be changed)
4. Click **Update Member**

#### Delete a Member
1. Find the member in the table
2. Click the 🗑️ (delete) button
3. Confirm deletion
4. Click **Delete Member**

#### Search Members
- Search by name, member ID, email, or phone
- Results update in real-time

---

### Issue & Return Books

#### Issue a Book to a Member
1. Navigate to **Issued Books** page
2. Click **+ Issue Book**
3. Select:
   - Book (from available books only)
   - Member (from registered members)
   - Due Date (defaults to 14 days from today)
4. Click **Issue Book**
5. Book availability automatically decreases

#### Return a Book
1. Navigate to **Issued Books** page
2. Find the issued book record
3. Click **✓ Return** button
4. Return date is set to today
5. Book availability automatically increases

#### Check Overdue Books
1. Navigate to **Issued Books** page
2. Use the status filter dropdown
3. Select **Overdue**
4. View all overdue books (highlighted in red)

#### Filter Issued Books
- **All Status**: Show all records
- **Active**: Currently issued, not overdue
- **Overdue**: Past due date, not returned
- **Returned**: Already returned books

---

### Dashboard Usage

#### View Statistics
The dashboard automatically shows:
- **Total Books**: Sum of all book quantities
- **Available Books**: Currently available for issuing
- **Issued Books**: Currently checked out
- **Overdue Returns**: Books past due date

#### Monitor Recent Activity
- View last 5 issued books
- See issue dates and due dates
- Check status (Active/Overdue)

#### Check Popular Categories
- See top 5 book categories
- View book count per category

---

### Settings Management

#### Update Your Profile
1. Navigate to **Settings** page
2. Edit your name
3. Select your role (Admin or Librarian)
4. Click **Save Changes**
5. Avatar in sidebar updates automatically

#### Clear All Data
1. Navigate to **Settings** page
2. Scroll to **Data Management**
3. Click **🗑️ Clear All Data**
4. Confirm the action
5. Page will reload with fresh data

⚠️ **Warning**: This action cannot be undone!

---

## 💡 Pro Tips

### Efficient Book Management
- Use categories consistently for better filtering
- Keep ISBN numbers accurate for identification
- Update quantity when receiving new copies

### Member Management
- Use standard email format for consistency
- Keep phone numbers in a consistent format
- Member IDs are auto-generated sequentially

### Issuing Books
- Check book availability before issuing
- Set realistic due dates (14 days is default)
- Monitor overdue books regularly from Dashboard

### Search & Filter
- Search is case-insensitive
- Combine search with filters for precise results
- Search works across multiple fields simultaneously

### Data Management
- Data saves automatically to localStorage
- No manual save needed
- Backup by exporting localStorage if needed

---

## ⌨️ Keyboard Shortcuts

- **Escape**: Close modal dialogs
- **Click outside modal**: Close modal
- **Tab**: Navigate through form fields
- **Enter**: Submit forms

---

## 🎯 Best Practices

### For Books
1. Enter complete information
2. Use consistent category naming
3. Keep ISBNs accurate
4. Update quantities when books arrive/retire

### For Members
1. Verify email addresses
2. Keep contact information current
3. Use unique member IDs
4. Track join dates for statistics

### For Issuing
1. Confirm member identity before issuing
2. Set appropriate due dates
3. Process returns promptly
4. Follow up on overdue books

### For System Maintenance
1. Regularly check dashboard statistics
2. Monitor overdue books
3. Keep member information updated
4. Retire old/damaged books from inventory

---

## 🔍 Troubleshooting

### Book Won't Issue
- ✅ Check if book is available (Available > 0)
- ✅ Verify member is registered
- ✅ Ensure due date is in the future

### Can't Delete Book
- ✅ Click delete button
- ✅ Confirm in modal dialog
- ℹ️ Note: Can delete even if book is issued

### Search Not Working
- ✅ Check spelling
- ✅ Try different search terms
- ✅ Clear filters and try again

### Data Disappeared
- ✅ Check if localStorage was cleared
- ✅ Try refreshing the page
- ⚠️ Data is browser-specific (won't sync across devices)

### Mobile Menu Not Showing
- ✅ Look for floating button in bottom-right
- ✅ On mobile, sidebar is hidden by default
- ✅ Tap menu button to show sidebar

---

## 📱 Mobile Usage

### Navigation
- Tap **☰** button (bottom-right) to open menu
- Select page from sidebar
- Tap **✕** to close menu

### Tables
- Scroll horizontally to see all columns
- Tap edit/delete buttons for actions
- Use search to reduce results

### Forms
- Fields stack vertically on mobile
- All inputs are touch-optimized
- Modals are full-width

---

## 🎨 Status Badges

### Book Status
- 🟢 **Available**: Can be issued
- 🟠 **Unavailable**: All copies issued

### Issue Status
- 🔵 **Active**: Currently issued, on time
- 🔴 **Overdue**: Past due date, needs return
- 🟢 **Returned**: Successfully returned

---

## 📊 Understanding Statistics

### Total Books
Sum of all book quantities across all titles

### Available Books
Books currently on shelf (not issued)

### Issued Books
Books currently checked out to members

### Overdue Returns
Issued books where current date > due date and not returned

### Availability Rate
(Available Books / Total Books) × 100%

---

## 🔄 Update & Refresh

### When to Refresh
- Data updates automatically
- No manual refresh needed
- Page refresh keeps all data (stored in localStorage)

### Clearing Cache
If you encounter issues:
1. Go to Settings
2. Clear all data
3. Page will reload

---

## ✅ Feature Checklist

Use this to explore all features:

**Dashboard**
- [ ] View total books stat
- [ ] Check available books
- [ ] Monitor issued books
- [ ] Track overdue returns
- [ ] Review recent activity
- [ ] See popular categories

**Books**
- [ ] Add a new book
- [ ] Edit book details
- [ ] Delete a book
- [ ] Search books
- [ ] Filter by category

**Members**
- [ ] Register new member
- [ ] Edit member info
- [ ] Delete member
- [ ] Search members

**Issued Books**
- [ ] Issue a book
- [ ] Return a book
- [ ] Filter by status
- [ ] Search issued books

**Settings**
- [ ] Update profile
- [ ] Change role
- [ ] View app info
- [ ] Clear data

---

## 🎉 You're All Set!

This quick reference covers all major features. For more details, see the README.md file.

Happy library managing! 📚✨
